const db = require('../models');

async function logAudit({ userId, action, resource, recordId, description, req }) {
  try {
    await db.AuditLog.create({
      userId,
      action,
      resource,
      recordId,
      description,
      ip: req?.ip || null,
      userAgent: req?.headers['user-agent'] || null
    });
  } catch (err) {
    console.error('[AuditLog] Erro ao registrar auditoria:', err.message);
  }
}

module.exports = logAudit;
