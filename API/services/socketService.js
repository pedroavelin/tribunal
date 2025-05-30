// services/socketService.js
const { User, UserSession } = require('../models');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    // Evento quando um usuário loga
    socket.on('user-connected', async (userId) => {
      try {
        await User.update(
          { isOnline: true, lastActivity: new Date() },
          { where: { id: userId } }
        );

        // Registrar a sessão
        await UserSession.create({
          userId,
          loginTime: new Date(),
        });

        socket.userId = userId; // Guarda o ID para usar no disconnect

      } catch (error) {
        console.error('Erro ao atualizar status do usuário:', error);
      }
    });

    // Evento quando o cliente desconecta
    socket.on('disconnect', async () => {
      if (socket.userId) {
        try {
          await User.update(
              { isOnline: false },
              { where: { id: socket.userId } }
          );

          // Atualizar o logout na sessão mais recente
          await UserSession.update(
              { logoutTime: new Date() },
              { 
                  where: { 
                      userId: socket.userId,
                      logoutTime: null 
                  },
                  order: [['loginTime', 'DESC']],
                  limit: 1
              }
          );
        } catch (error) {
          console.error('Erro ao atualizar status offline:', error);
        }
      }
    });
  });
};