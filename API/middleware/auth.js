const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const db = require('../models');

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  console.log('🔍 Headers recebidos:', req.headers);

  if (!token) {
    const message = 'No token provided!';
    console.log('❌', message);

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

  console.log('🔐 Token extraído:', token);

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      const message = 'Unauthorized! Token inválido.';
      console.log('🚫', message, err.message);

      return res.status(401).json({
        error: true,
        message,
        debug: {
          token,
          jwtError: err.message
        }
      });
    }

    console.log('✅ Token verificado. Usuário ID:', decoded.id);
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.userId, {
      include: [{
        model: db.Role,
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

module.exports = {
  verifyToken,
  isAdmin
};