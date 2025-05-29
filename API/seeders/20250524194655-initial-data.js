'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      { name: 'user', description: 'Regular user', createdAt: new Date(), updatedAt: new Date() },
      { name: 'admin', description: 'Administrator', createdAt: new Date(), updatedAt: new Date() },
      { name: 'moderator', description: 'Moderator', createdAt: new Date(), updatedAt: new Date() }
    ], {});
    
    await queryInterface.bulkInsert('Permissions', [
      { name: 'view_users', description: 'View users', createdAt: new Date(), updatedAt: new Date() },
      { name: 'edit_users', description: 'Edit users', createdAt: new Date(), updatedAt: new Date() },
      { name: 'delete_users', description: 'Delete users', createdAt: new Date(), updatedAt: new Date() },
      { name: 'view_roles', description: 'View roles', createdAt: new Date(), updatedAt: new Date() },
      { name: 'edit_roles', description: 'Edit roles', createdAt: new Date(), updatedAt: new Date() },
      { name: 'view_permissions', description: 'View permissions', createdAt: new Date(), updatedAt: new Date() }
    ], {});
    
    // Assign permissions to roles
    const roles = await queryInterface.sequelize.query('SELECT id from Roles;');
    const permissions = await queryInterface.sequelize.query('SELECT id from Permissions;');
    
    const rolePermissions = [
      // Admin gets all permissions
      { roleId: roles[0][1].id, permissionId: permissions[0][0].id, createdAt: new Date(), updatedAt: new Date() },
      { roleId: roles[0][1].id, permissionId: permissions[0][1].id, createdAt: new Date(), updatedAt: new Date() },
      { roleId: roles[0][1].id, permissionId: permissions[0][2].id, createdAt: new Date(), updatedAt: new Date() },
      { roleId: roles[0][1].id, permissionId: permissions[0][3].id, createdAt: new Date(), updatedAt: new Date() },
      { roleId: roles[0][1].id, permissionId: permissions[0][4].id, createdAt: new Date(), updatedAt: new Date() },
      { roleId: roles[0][1].id, permissionId: permissions[0][5].id, createdAt: new Date(), updatedAt: new Date() },
      // Moderator gets some permissions
      { roleId: roles[0][2].id, permissionId: permissions[0][0].id, createdAt: new Date(), updatedAt: new Date() },
      { roleId: roles[0][2].id, permissionId: permissions[0][3].id, createdAt: new Date(), updatedAt: new Date() },
      // User gets basic permissions
      { roleId: roles[0][0].id, permissionId: permissions[0][0].id, createdAt: new Date(), updatedAt: new Date() }
    ];
    
    await queryInterface.bulkInsert('RolePermissions', rolePermissions, {});
    
    // Create admin user
    const bcrypt = require('bcryptjs');
    const adminPassword = bcrypt.hashSync('admin123', 8);
    
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: adminPassword,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
    // Assign admin role to admin user
    const users = await queryInterface.sequelize.query('SELECT id from Users;');
    
    await queryInterface.bulkInsert('UserRoles', [
      { userId: users[0][0].id, roleId: roles[0][1].id, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserRoles', null, {});
    await queryInterface.bulkDelete('RolePermissions', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Permissions', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  }
};