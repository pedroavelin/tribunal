const cron = require('node-cron');
const db = require('../models');
const logger = require('../utils/logger');

cron.schedule('*/10 * * * *', async () => {
  try {
    const expiredCount = await db.RefreshToken.destroy({
      where: {
        expiryDate: {
          [db.Sequelize.Op.lt]: new Date()
        }
      }
    });
    logger.info(`Job executado com sucesso. Tokens expirados removidos: ${expiredCount}`);
  } catch (error) {
    logger.error(`Erro ao remover tokens expirados: ${error.message}`);
  }
});

// | Cron           | Frequência            |
// | -------------- | --------------------- |
// | `0 0 * * *`    | Diariamente às 00:00  |
// | `0 * * * *`    | De hora em hora       |
// | `*/10 * * * *` | A cada 10 minutos     |
// | `0 3 * * 0`    | Todo domingo às 03:00 |