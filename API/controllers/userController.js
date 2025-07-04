const db = require('../models');
const bcrypt = require('bcryptjs');
const logAudit = require('../utils/auditLogger');
const { User, Role } = db;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: {
        exclude: ['password']
      },
     include: [{ model: db.Role, as: 'roles' }]
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id, {
      attributes: {
        exclude: ['password']
      },
     include: [{ model: db.Role, as: 'roles' }]
    });

    if (!user) {
      return res.status(404).send({
        message: 'User not found'
      });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      roles
    } = req.body;

    function getPasswordStrength(password) {
      if (typeof password !== 'string') return 'invalid';

      const weakRegex = /^.{0,5}$/;
      const mediumRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
      const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

      if (weakRegex.test(password)) return 'weak';
      if (strongRegex.test(password)) return 'strong';
      if (mediumRegex.test(password)) return 'medium';
      return 'invalid';
    }

    if (!username || typeof username !== 'string' || username.trim().length < 3) {
      return res.status(400).send({
        message: "O nome de usuário deve ter pelo menos 3 caracteres."
      });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).send({
        message: "É necessário um e-mail válido."
      });
    }

    const strength = getPasswordStrength(password);
    if (strength === 'weak') {
      return res.status(400).send({
        message: "A senha é muito fraca. Deve ter pelo menos 6 caracteres."
      });
    } else if (strength === 'medium') {
      return res.status(400).send({
        message: "A senha tem força média. Considere adicionar letras maiúsculas e caracteres especiais para fortalecê-la."
      });
    } else if (strength !== 'strong') {
      return res.status(400).send({
        message: "Formato de senha inválido."
      });
    }
    const existingUser = await db.User.findOne({
      where: {
        email
      }
    });
    if (existingUser) {
      return res.status(400).send({
        message: "E-mail já em uso."
      });
    }

    const user = await db.User.create({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: bcrypt.hashSync(password, 8)
    });

    if (roles && Array.isArray(roles)) {
      const roleRecords = await db.Role.findAll({
        where: {
          name: {
            [db.Sequelize.Op.or]: roles
          }
        },
        include: [{ model: Permission, as: 'permissions' }]
      });

      if (roleRecords.length === 0) {
        return res.status(400).send({
          message: "Nenhuma função válida encontrada."
        });
      }

      await user.setRoles(roleRecords);
    } else {
      await user.setRoles([1]);
    }
    const newUser = await db.User.findByPk(user.id, {
      attributes: {
        exclude: ['password']
      },
     include: [{ model: db.Role, as: 'roles' }]
    });
    await logAudit({
      userId: req.userId,
      action: 'CREATE',
      resource: 'User',
      recordId: user.id,
      description: `Usuário ${user.email} registado com sucesso`,
      req
    });
    res.status(201).send(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).send({
      message: "Ocorreu um erro ao criar o usuário."
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send({
        message: 'User not found'
      });
    }

    await user.update({
      username: req.body.username || user.username,
      email: req.body.email || user.email,
      isActive: req.body.isActive !== undefined ? req.body.isActive : user.isActive
    });

    if (req.body.password) {
      await user.update({
        password: bcrypt.hashSync(req.body.password, 8)
      });
    }

    if (req.body.roles) {
      const roles = await db.Role.findAll({
        where: {
          name: {
            [db.Sequelize.Op.or]: req.body.roles
          }
        },
        include: [{ model: Permission, as: 'permissions' }]
      });

      await user.setRoles(roles);
    }

    const updatedUser = await db.User.findByPk(user.id, {
      attributes: {
        exclude: ['password']
      },
     include: [{ model: db.Role, as: 'roles' }]
    });

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send({
        message: 'User not found'
      });
    }

    await user.destroy();
    res.status(200).send({
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.assignRole = async (req, res) => {
  const { userId } = req.params;
  const { roleId } = req.body;

  try {
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      return res.status(404).json({
        message: 'Usuário ou papel não encontrado'
      });
    }

    await user.addRole(role);

    res.status(200).json({
      message: 'Papel atribuído com sucesso'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erro ao atribuir papel'
    });
  }
};

exports.removeRole = async (req, res) => {
  const {
    userId
  } = req.params;
  const {
    roleId
  } = req.body;

  try {
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      return res.status(404).json({
        message: 'Usuário ou papel não encontrado'
      });
    }

    await user.removeRole(role);

    res.status(200).json({
      message: 'Papel removido com sucesso'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erro ao remover papel'
    });
  }
};

exports.getOnlineUsers = async (req, res) => {
  try {
    const onlineUsers = await User.findAll({
      where: { 
        isOnline: true // Filtro correto para usuários online
      },
      attributes: ['id', 'username', 'email', 'lastActivity'],
      include: [{
        model: Role, as: 'roles', 
        attributes: ['name'],
        through: { attributes: [] } // Oculta a tabela junction
      }],
      order: [['lastActivity', 'DESC']]
    });

    res.status(200).json(onlineUsers);
  } catch (error) {
    console.error('Erro ao buscar usuários online:', error);
    res.status(500).json({ 
      error: 'Erro interno no servidor',
      details: error.message 
    });
  }
};

exports.getUsersByLetter = async (req, res) => {
  try {
    const { letra } = req.params;

    // Verifica se a letra tem exatamente 1 caractere
    if (!letra || typeof letra !== 'string' || letra.length !== 2) {
      return res.status(400).send({
        message: 'Por favor, forneça uma letra válida (um único caractere)'
      });
    }

    // Busca a letra no banco de dados (case insensitive)
    const letraRecord = await db.Letra.findOne({
      where: db.Sequelize.where(
        db.Sequelize.fn('lower', db.Sequelize.col('letra')),
        db.Sequelize.Op.eq,
        letra.toLowerCase()
      )
    });

    if (!letraRecord) {
      return res.status(404).send({
        message: `Letra ${letra.toUpperCase()} não encontrada no sistema`
      });
    }

    // Busca todos os usuários associados a essa letra
    const users = await db.User.findAll({
      where: { idLetra: letraRecord.id },
      attributes: {
        exclude: ['password']
      },
      include: [
        { 
          model: db.Role, 
          as: 'roles',
          attributes: ['id', 'name'],
          through: { attributes: [] }
        },
        {
          model: db.Letra,
          as: 'letra',
          attributes: ['id', 'letra']
        }
      ],
      order: [['username', 'ASC']]
    });

    // Formata a resposta
    const response = {
      letra: letraRecord.letra.toUpperCase(),
      count: users.length,
      users: users.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        isOnline: user.isOnline,
        roles: user.roles.map(role => role.name),
        createdAt: user.createdAt
      }))
    };
    res.status(200).send(response);
  } catch (error) {
    console.error(`Erro ao buscar usuários da letra ${req.params.letra}:`, error);
    res.status(500).send({
      message: 'Ocorreu um erro ao buscar os usuários',
      error: error.message
    });
  }
};