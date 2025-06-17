const db = require('../models');
const { Role, Permission, Sequelize } = db;

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await db.Role.findAll({
      include: [{ model: Permission, as: 'permissions' }]
    });
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getRole = async (req, res) => {
  try {
    const role = await db.Role.findByPk(req.params.id, {
      include: [{ model: Permission, as: 'permissions' }]
    });

    if (!role) {
      return res.status(404).send({ message: 'Role not found' });
    }

    res.status(200).send(role);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.createRole = async (req, res) => {
  try {
    const role = await db.Role.create({
      name: req.body.name,
      description: req.body.description
    });

    if (req.body.permissions) {
      const permissions = await db.Permission.findAll({
        where: {
          name: {
            [db.Sequelize.Op.or]: req.body.permissions
          }
        }
      });

      await role.setPermissions(permissions);
    }

    const newRole = await db.Role.findByPk(role.id, {
      include: [{ model: Permission, as: 'permissions' }]
    });

    res.status(201).send(newRole);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await db.Role.findByPk(req.params.id);

    if (!role) {
      return res.status(404).send({ message: 'Role not found' });
    }

    await role.update({
      name: req.body.name || role.name,
      description: req.body.description || role.description
    });

    if (req.body.permissions) {
      const permissions = await db.Permission.findAll({
        where: {
          name: {
            [db.Sequelize.Op.or]: req.body.permissions
          }
        }
      });

      await role.setPermissions(permissions);
    }

    const updatedRole = await db.Role.findByPk(role.id, {
      include: [{ model: Permission, as: 'permissions' }]
    });

    res.status(200).send(updatedRole);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await db.Role.findByPk(req.params.id);

    if (!role) {
      return res.status(404).send({ message: 'Role not found' });
    }

    await role.destroy();
    res.status(200).send({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.assignPermissions = async (req, res) => {
  const { id } = req.params;
  const { permissionIds } = req.body;

  if (!Array.isArray(permissionIds)) {
    return res.status(400).json({ message: 'permissionIds deve ser um array de IDs' });
  }

  try {
    // Buscar o papel (role) pelo ID
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Papel não encontrado' });
    }

    // Buscar permissões válidas com base nos IDs fornecidos
    const permissions = await Permission.findAll({
      where: { id: permissionIds }
    });

    // Associar permissões ao papel (substitui as anteriores)
    await role.setPermissions(permissions);

    return res.status(200).json({
      message: 'Permissões atribuídas com sucesso',
      assignedPermissions: permissions.map(p => ({ id: p.id, name: p.name }))
    });
  } catch (error) {
    console.error('Erro ao atribuir permissões:', error);
    return res.status(500).json({ message: 'Erro interno no servidor', error: error.message });
  }
};