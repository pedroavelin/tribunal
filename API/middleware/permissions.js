const db = require('../models');

const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const user = await db.User.findByPk(req.userId, {
        include: [{
          model: db.Role, as: 'roles',
          include: [{
            model: db.Permission,
            where: { name: permissionName }
          }]
        }]
      });
      
      if (!user || user.Roles.length === 0) {
        return res.status(403).send({
          message: `Require ${permissionName} Permission!`
        });
      }
      next();
    } catch (error) {
      return res.status(500).send({
        message: error.message
      });
    }
  };
};

module.exports = checkPermission;