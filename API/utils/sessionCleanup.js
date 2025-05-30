import db from '../config/db.js';

export const startSessionCleanup = () => {
  setInterval(async () => {
    await db.query('UPDATE users SET is_online = FALSE WHERE last_activity < NOW() - INTERVAL 5 MINUTE');
  }, 300000);
};