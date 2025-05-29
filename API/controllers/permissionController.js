const db = require('../models');

exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await db.Permission.findAll();
    res.status(200).send(permissions);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getPermission = async (req, res) => {
  try {
    const permission = await db.Permission.findByPk(req.params.id);
    
    if (!permission) {
      return res.status(404).send({ message: 'Permission not found' });
    }
    
    res.status(200).send(permission);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.createPermission = async (req, res) => {
  try {
    const permission = await db.Permission.create({
      name: req.body.name,
      description: req.body.description
    });

    res.status(201).send(permission);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const permission = await db.Permission.findByPk(req.params.id);
    
    if (!permission) {
      return res.status(404).send({ message: 'Permission not found' });
    }

    await permission.update({
      name: req.body.name || permission.name,
      description: req.body.description || permission.description
    });

    res.status(200).send(permission);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const permission = await db.Permission.findByPk(req.params.id);
    
    if (!permission) {
      return res.status(404).send({ message: 'Permission not found' });
    }

    await permission.destroy();
    res.status(200).send({ message: 'Permission deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};