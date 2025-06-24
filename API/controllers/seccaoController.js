const db = require('../models');

exports.create = async (req, res) => {
  try {
    const { numero, idTribunal, idMunicipio} = req.body;

    if (!numero || !idTribunal || !idMunicipio) {
      return res.status(400).json({
        message: 'Descrição, tribunal, município e província são obrigatórios.'
      });
    }

    const seccao = await db.Seccao.create({
      numero,
      idTribunal,
      idMunicipio,
    });

    res.status(201).json(seccao);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAllWithDetails = async (req, res) => {
  try {
    const seccoes = await db.Seccao.findAll({
      include: [
        { model: db.Tribunal, as: 'tribunal' },
        {
          model: db.Municipio, as: 'municipio',
          include: [
            { model: db.Provincia, as: 'provincia' }
          ]
        }
      ]
    })
    res.json(seccoes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
