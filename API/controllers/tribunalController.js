const db = require("../models");
const {Tribunal} = db;

exports.create = async (req, res) => {
  try {
    const { nome, idMunicipio } = req.body

    // Validação básica
    if (!nome || !idMunicipio) {
      return res.status(400).send({ message: "Nome e idMunicipio são obrigatórios." })
    }

    // Criação do tribunal
    const tribunal = await Tribunal.create({ nome, idMunicipio })

    // Opcional: incluir município e província na resposta
    const tribunalCompleto = await Tribunal.findByPk(tribunal.id, {
      include: {
        model: db.Municipio,
        as: 'municipio',
        include: {
          model: db.Provincia,
          as: 'provincia'
        }
      }
    })

    res.status(201).send(tribunalCompleto)
  } catch (error) {
    res.status(500).send({
      message: error.message || "Erro ao criar tribunal."
    })
  }
}


exports.findAll = async (req, res) => {
  try {
    const tribunais = await Tribunal.findAll();
    res.send(tribunais);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Erro ao buscar tribunais."
    });
  }
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Tribunal.findByPk(id, {
      include: ["Municipio"]
    })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message
    }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Tribunal.update(req.body, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tribunal atualizado com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível atualizar o tribunal com id=${id}.`
        });
      }
    })
    .catch(err => res.status(500).send({
      message: err.message
    }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Tribunal.destroy({
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tribunal deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível deletar o tribunal com id=${id}.`
        });
      }
    })
    .catch(err => res.status(500).send({
      message: err.message
    }));
};

exports.findAllWithMunicipio = async (req, res) => {
  try {
    const tribunais = await Tribunal.findAll({
      include: [
        { 
          model: db.Municipio, as: 'municipio' ,
          include:[
            {
              model: db.Provincia, as: 'provincia'
            }
          ]
        }
      ]
    });
    res.json(tribunais);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}