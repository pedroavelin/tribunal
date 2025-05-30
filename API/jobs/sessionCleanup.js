// script para marcar usuários inativos como offline
const { User } = require('../models');

const cleanupInactiveUsers = async () => {
  try {
    const inactiveThreshold = new Date(Date.now() - 5 * 60 * 1000); // 5 minutos atrás

    await User.update(
        { isOnline: false },
        { 
            where: { 
                lastActivity: { [Op.lt]: inactiveThreshold },
                isOnline: true 
            } 
        }
    );
    console.log('Usuários inativos marcados como offline');
  } catch (error) {
    console.error('Erro na limpeza de sessões:', error);
  }
};

// Executa a cada 5 minutos
setInterval(cleanupInactiveUsers, 5 * 60 * 1000);