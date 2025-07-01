const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const db = require('../models');

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  console.log('req.userId:', req.userId);
  if (!token) {
    const message = 'No token provided!';

    return res.status(403).json({
      error: true,
      message,
      debug: {
        headers: req.headers
      }
    });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7).trim();
  }

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      const message = 'Unauthorized! Token inválido.';

      return res.status(401).json({
        error: true,
        message,
        debug: {
          token,
          jwtError: err.message
        }
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.userId, {
      include: [{
        model: db.Role, as: 'roles',
        where: { name: 'admin' }
      }]
    });
    
    if (!user) {
      return res.status(403).send({
        message: 'Require Admin Role!'
      });
    }
    
    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

// Função genérica para verificar uma role específica
const checkRole = (roleName) => {
  return async (req, res, next) => {
    try {
      const user = await db.User.findByPk(req.userId, {
        include: [{
          model: db.Role,
          as: 'roles',
          where: { name: roleName }
        }]
      });

      if (!user) {
        return res.status(403).json({
          error: true,
          message: `Require ${roleName} Role!`
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message
      });
    }
  };
};

// Verifica se usuário tem pelo menos uma das roles especificadas
const hasAnyRole = async (req, roleNames) => {
  const user = await db.User.findByPk(req.userId, {
    include: [{ model: db.Role, as: 'roles' }]
  });

  if (!user || !user.roles) return false;

  return user.roles.some(role => roleNames.includes(role.name));
};

// Middlewares específicos
const canView = async (req, res, next) => {
  console.log('req.userId (canView):', req.userId);
  try {
    const allowedRoles = [
      'oficial_de_diligencias',
      'ajudante_de_escrivao',
      'escrivao_de_direito',
      'secretario_judicial'
    ];
    
    if (await hasAnyRole(req, allowedRoles)) {
      return next();
    }

    res.status(403).json({
      error: true,
      message: 'Acesso negado: Visualização não permitida'
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
};

const canAdd = async (req, res, next) => {
  try {
    const allowedRoles = [
      'ajudante_de_escrivao',
      'escrivao_de_direito',
      'secretario_judicial'
    ];
    
    if (await hasAnyRole(req, allowedRoles)) {
      return next();
    }
    
    res.status(403).json({error: true, message: 'Acesso negado: Adição não permitida' });
  } catch (error) {
    res.status(500).json({error: true, message: error.message });
  }
};

const canUpdate = async (req, res, next) => {
  try {
    const allowedRoles = [
      'ajudante_de_escrivao',
      'escrivao_de_direito',
      'secretario_judicial'
    ];
    
    if (await hasAnyRole(req, allowedRoles)) {
      return next();
    }
    
    res.status(403).json({error: true, message: 'Acesso negado: Atualização não permitida' });
  } catch (error) {
    res.status(500).json({error: true, message: error.message });
  }
};

const allowAllRoles = async (req, res, next) => {
  try {
    const allowedRoles = 
    [
      'admin', 
      'oficial_de_diligencias', 
      'ajudante_de_escrivao',
      'escrivao_de_direito',
      'secretario_judicial'
    ];

    if (await hasAnyRole(req, allowedRoles)) {
      return next();
    }

    return res.status(403).json({ error: true, message: 'Acesso negado' });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

// Middlewares para roles específicas (opcional)
const isOficialDiligencias = checkRole('oficial_de_diligencias');
const isAjudanteEscrivao = checkRole('ajudante_de_escrivao');
const isEscritaoDireito = checkRole('escrivao_de_direito');
const isSecretarioJudicial = checkRole('secretario_judicial');

module.exports = {
  verifyToken,
  checkRole,
  hasAnyRole,
  isAdmin,
  canView,
  canAdd,
  canUpdate,
  isOficialDiligencias,
  isAjudanteEscrivao,
  isEscritaoDireito,
  isSecretarioJudicial,
  allowAllRoles
};