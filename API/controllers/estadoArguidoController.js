const db = require('../models');
const EstadoArguido = db.EstadoArguido;

exports.findAll = async (req, res) => {
  try {
    const estadosDosAguidos = await EstadoArguido.findAll();
    res.json(estadosDosAguidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
