// middlewares/activityTracker.js
const { User } = require('../models');

module.exports = async (req, res, next) => {
  if (req.user && req.user.id) {
    try {
      await User.update(
          { lastActivity: new Date() },
          { where: { id: req.user.id } }
      );
    } catch (error) {
      console.error('Erro ao atualizar lastActivity:', error);
    }
  }
  next();
};