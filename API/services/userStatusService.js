// services/userStatusService.js
const { User, UserSession } = require('../models');
const { Op } = require('sequelize');

class UserStatusService {
  constructor(io) {
    this.io = io;
    this.setupSocketListeners();
    this.startSessionCleanup();
  }

  /**
   * Configura listeners do Socket.io
   */
  setupSocketListeners() {
    this.io.on('connection', (socket) => {
      // Usuário conectado (frontend emite 'user-connected' após login)
      socket.on('user-connected', async (userId) => {
        await this.markUserOnline(userId);
        await this.recordLoginSession(userId);
        socket.userId = userId; // Armazena para desconexão
      });

      // Desconexão do socket
      socket.on('disconnect', async () => {
        if (socket.userId) {
          await this.markUserOffline(socket.userId);
          await this.recordLogoutSession(socket.userId);
        }
      });
    });
  }

  /**
   * Marca usuário como online
   */
  async markUserOnline(userId) {
    try {
      await User.update(
        { 
          isOnline: true,
          lastActivity: new Date() 
        },
        { where: { id: userId } }
      );
      this.io.emit('user-status-changed', { userId, isOnline: true });
    } catch (error) {
      console.error(`Erro ao marcar usuário ${userId} como online:`, error);
    }
  }

  /**
   * Marca usuário como offline
   */
  async markUserOffline(userId) {
    try {
      await User.update(
        { isOnline: false },
        { where: { id: userId } }
      );
      this.io.emit('user-status-changed', { userId, isOnline: false });
    } catch (error) {
      console.error(`Erro ao marcar usuário ${userId} como offline:`, error);
    }
  }

  /**
   * Registra nova sessão de login
   */
  async recordLoginSession(userId) {
    try {
      await UserSession.create({
        userId,
        loginTime: new Date()
      });
    } catch (error) {
      console.error(`Erro ao registrar login do usuário ${userId}:`, error);
    }
  }

  /**
   * Atualiza sessão com horário de logout
   */
  async recordLogoutSession(userId) {
    try {
      // Atualiza a sessão mais recente sem logout
      const session = await UserSession.findOne({
        where: { 
          userId,
          logoutTime: null 
        },
        order: [['loginTime', 'DESC']]
      });

      if (session) {
        await session.update({ logoutTime: new Date() });
      }
    } catch (error) {
      console.error(`Erro ao registrar logout do usuário ${userId}:`, error);
    }
  }

  /**
   * Limpeza periódica de usuários inativos
   */
  startSessionCleanup() {
    setInterval(async () => {
      try {
        const inactiveThreshold = new Date(Date.now() - 5 * 60 * 1000); // 5 minutos
        
        const inactiveUsers = await User.findAll({
          where: {
            lastActivity: { [Op.lt]: inactiveThreshold },
            isOnline: true
          }
        });

        if (inactiveUsers.length > 0) {
          await User.update(
            { isOnline: false },
            { 
              where: { 
                id: inactiveUsers.map(user => user.id) 
              } 
            }
          );

          // Notifica todos os clientes sobre mudanças
          inactiveUsers.forEach(user => {
            this.io.emit('user-status-changed', { 
              userId: user.id, 
              isOnline: false 
            });
          });
        }
      } catch (error) {
        console.error('Erro na limpeza de sessões inativas:', error);
      }
    }, 5 * 60 * 1000); // Executa a cada 5 minutos
  }

  /**
   * Método para buscar usuários online
   */
  async getOnlineUsers() {
    return await User.findAll({
      where: { isOnline: true },
      attributes: ['id', 'username', 'email', 'lastActivity'],
      order: [['lastActivity', 'DESC']]
    });
  }
  // Adicione no UserStatusService.js
async testSessionSave() {
  try {
    const testSession = await UserSession.create({
      userId: 1, // Substitua por um ID existente
      loginTime: new Date()
    });
    console.log('Sessão teste criada:', testSession.toJSON());
  } catch (error) {
    console.error('Erro ao criar sessão teste:', error);
  }
}

}
// Chame no constructor
this.testSessionSave();

module.exports = UserStatusService;