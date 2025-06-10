const db = require("../models");
const {Tribunal} = db;
// Criar tribunal
exports.create = async (req, res) => {
  try {
    const tribunal = await Tribunal.create(req.body);
    res.status(201).send(tribunal);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Erro ao criar tribunal."
    });
  }
};

// Buscar todos tribunais
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

// Buscar tribunal por ID
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

// Atualizar tribunal
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

// Deletar tribunal
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
      include: ["Municipio"]
    });
    res.json(tribunais);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}