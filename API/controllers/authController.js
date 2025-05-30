const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtConfig = require('../config/jwt');
const logAudit = require('../utils/auditLogger');

const AuthController = {
  signup: async (req, res) => {
    try {
      const user = await db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      });

      if (req.body.roles) {
        const roles = await db.Role.findAll({
          where: {
            name: {
              [db.Sequelize.Op.or]: req.body.roles
            }
          }
        });
        await user.setRoles(roles);
      } else {
        await user.setRoles([1]);
      }

      return res.status(201).json({
        message: 'User registered successfully!'
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
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
      const user = await db.User.findOne({
        where: {
          email: req.body.email
        },
        include: [db.Role]
      });

      if (!user) {
        return res.status(404).json({
          message: 'User not found.'
        });
      }
      if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            await logAudit({
              userId: null,
              action: 'LOGIN_FAILED',
              resource: 'Auth',
              description: `Tentativa de login falhou para o e-mail ${req.body.email}`,
              req
            });
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
          }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).json({
          accessToken: null,
          message: 'Invalid password!'
        });
      }

      // Gera access token
      const accessToken = jwt.sign({
          id: user.id
        },
        jwtConfig.secret, {
          expiresIn: jwtConfig.expiresIn
        }
      );
    await logAudit({
          userId: user.id,
          action: 'LOGIN_SUCCESS',
          resource: 'Auth',
          description: `Usuário ${user.email} fez login com sucesso`,
          req
        });
      // Gera refresh token + salva no banco
      const {
        token: refreshToken,
        expiry
      } = AuthController.generateRefreshToken(user.id);

      await db.RefreshToken.create({
        token: refreshToken,
        userId: user.id,
        expiryDate: expiry
      });

      const authorities = user.Roles.map(role => `ROLE_${role.name.toUpperCase()}`);

      return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: accessToken,
        refreshToken: refreshToken
      });

    } catch (error) {
      console.error('Erro no signin:', error);
      return res.status(500).json({
        message: 'Erro interno no servidor.'
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