const db = require('../models')
const Provincia = db.Provincia
const Municipio = db.Municipio

exports.findAll = async (req, res) => {
  try {
    const provincias = await Provincia.findAll()
    res.json(provincias)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.findMunicipiosByProvincia = async (req, res) => {
  try {
    const idProvincia = req.params.id
    const municipios = await Municipio.findAll({
      where: { idProvincia },
      order: [['nome', 'ASC']],
      include: [
        {
          model: db.Provincia,
          as: 'provincia', // <-- alias correto
          attributes: ['nome'] // traz apenas o nome da província
        }
      ]
    })
    res.json(municipios)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
