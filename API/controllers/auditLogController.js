const db = require('../models');
const { Op } = require('sequelize');

module.exports = {
  async index(req, res) {
    const { userId, action, resource, startDate, endDate, page = 1, limit = 10  } = req.query;

    const where = {};

    if (userId) where.userId = userId;
    if (action) where.action = { [Op.iLike]: `%${action}%` };
    if (resource) where.resource = { [Op.iLike]: `%${resource}%` };

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt[Op.gte] = new Date(startDate);
      if (endDate) where.createdAt[Op.lte] = new Date(endDate);
    }

    const offset = (page - 1) * limit;

    try {
      const { rows, count } = await db.AuditLog.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']],
        include: [{ model: db.User, as: 'users', attributes: ['id', 'email', 'username'] }]
      });

      return res.status(200).json({
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        data: rows
      });
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao buscar logs.', error: err.message });
    }
  }
};
