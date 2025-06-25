const db = require('../models');
const EstadoProcesso = db.EstadoProcesso;

exports.findAll = async (req, res) => {
  try {
    const estadosDosProcessos = await EstadoProcesso.findAll();
    res.json(estadosDosProcessos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
