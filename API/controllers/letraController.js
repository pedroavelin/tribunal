const db = require('../models')

exports.findAll = async (req, res) => {
  try {
    const letra = await Letra.findAll()
    res.json(letra)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}