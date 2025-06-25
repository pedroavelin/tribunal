const db = require('../models');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtConfig = require('../config/jwt');
const logAudit = require('../utils/auditLogger');

const AuthController = {
  signup: async (req, res) => {
    try {
      const existingUser = await db.User.findOne({
        where: {
          email: req.body.email
        }
      });

      if (existingUser) {
        return res.status(400).json({
          message: 'Este e-mail já está em uso.'
        });
      }

      const user = await db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });

      if (req.body.roles && req.body.roles.length > 0) {
        const roles = await db.Role.findAll({
          where: {
            name: {
              [db.Sequelize.Op.or]: req.body.roles
            }
          },
          include: [{ model: Permission, as: 'permissions' }]
        });

        if (!roles || roles.length === 0) {
          return res.status(400).json({
            message: 'Funções informadas não encontradas.'
          });
        }

        await user.setRoles(roles);
      } else {
        const defaultRole = await db.Role.findOne({
          where: {
            name: 'user'
          }
        });

        if (!defaultRole) {
          return res.status(500).json({
            message: "Função padrão 'user' não encontrada."
          });
        }

        await user.setRoles([defaultRole]);
      }

      return res.status(201).json({
        message: 'Usuário registrado com sucesso!'
      });

    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return res.status(500).json({
        message: error.message || 'Erro interno.'
      });
    }
  },


  generateRefreshToken(userId) {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); // 7 dias

    const token = jwt.sign({
      id: userId
    }, jwtConfig.refreshSecret, {
      expiresIn: '7d'
    });

    return {
      token,
      expiry
    };
  },

signin: async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca o usuário com todos os relacionamentos
    const user = await db.User.findOne({
      where: { email },
      include: [
        { model: db.Role, as: 'roles' },
        { 
          model: db.Seccao, 
          as: 'seccao', 
          attributes: ['id', 'numero', 'idTribunal'],
          include: [{ 
            model: db.Tribunal, 
            as: 'tribunal', 
            attributes: ['id', 'nome'] 
          }]
        },
        { model: db.Letra, as: 'letra', attributes: ['id', 'letra'] }
      ]
    });

    // Verifica se o usuário existe
    if (!user) {
      await logAudit({
        userId: null,
        action: 'LOGIN_FAILED',
        resource: 'Auth',
        description: `Tentativa de login com e-mail não cadastrado: ${email}`,
        req
      });
      return res.status(404).json({
        message: 'Usuário não encontrado.'
      });
    }

    // Verifica a senha
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      await logAudit({
        userId: null,
        action: 'LOGIN_FAILED',
        resource: 'Auth',
        description: `Tentativa de login com senha inválida para o e-mail: ${email}`,
        req
      });
      return res.status(401).json({
        message: 'E-mail ou senha inválidos.'
      });
    }

    // Gera access token
    const accessToken = jwt.sign(
      { id: user.id },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    // Gera refresh token e salva no banco
    const { token: refreshToken, expiry } = AuthController.generateRefreshToken(user.id);
    await db.RefreshToken.create({
      token: refreshToken,
      userId: user.id,
      expiryDate: expiry
    });

    // Registra login bem-sucedido
    await logAudit({
      userId: user.id,
      action: 'LOGIN_SUCCESS',
      resource: 'Auth',
      description: `Usuário ${user.email} fez login com sucesso`,
      req
    });

    // Mapeia as roles do usuário
    const authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`);

    // Retorna os dados do usuário e tokens
    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      idLetra: user.letra?.id || null,
      idSeccao: user.seccao?.id || null,
      idTribunal: user.seccao?.tribunal?.id || null,
      tribunal: user.seccao?.tribunal?.nome,
      seccao: user.seccao?.numero,
      letra: user.letra?.letra,
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error('Erro no processo de login:', error);
    return res.status(500).json({
      message: 'Ocorreu um erro durante o processo de login. Por favor, tente novamente.'
    });
  }
},

  refreshToken: async (req, res) => {
    const {
      refreshToken
    } = req.body;

    if (!refreshToken) {
      return res.status(403).json({
        message: 'Nenhum token de atualização fornecido!'
      });
    }

    try {
      // Verifica se o token é válido (estrutura e assinatura JWT)
      const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret);

      // Busca o token no banco de dados
      const storedToken = await db.RefreshToken.findOne({
        where: {
          token: refreshToken
        }
      });

      if (!storedToken) {
        return res.status(403).json({
          message: 'Refresh token não reconhecido.'
        });
      }

      // Verifica se está expirado
      if (new Date() > storedToken.expiryDate) {
        await storedToken.destroy(); // Remove o token expirado
        return res.status(403).json({
          message: 'Refresh token expirado. Faça login novamente.'
        });
      }

      // Busca o usuário
      const user = await db.User.findByPk(decoded.id);
      if (!user) {
        return res.status(404).json({
          message: 'Usuário não encontrado.'
        });
      }

      // Deleta o refresh token antigo
      await storedToken.destroy();

      // Gera novo refresh token
      const {
        token: newRefreshToken,
        expiry: newExpiry
      } = AuthController.generateRefreshToken(user.id);
      await db.RefreshToken.create({
        token: newRefreshToken,
        userId: user.id,
        expiryDate: newExpiry
      });

      // Gera novo access token
      const newAccessToken = jwt.sign({
        id: user.id
      },
        jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn || '15m'
      }
      );

      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      });

    } catch (err) {
      let message = 'Unauthorized!';
      if (err.name === 'TokenExpiredError') {
        message = 'Refresh token expirado. Faça login novamente.';
      } else if (err.name === 'JsonWebTokenError') {
        message = 'Token de atualização inválido.';
      }
      return res.status(401).json({
        message
      });
    }
  },
  recoverPassWord: async (req, res) => {

  },

  logout: async (req, res) => {
    await db.RefreshToken.destroy({
      where: {
        token: req.body.refreshToken
      }
    });
    return res.status(200).json({
      message: 'Logout successful'
    });
  }
};

module.exports = AuthController;