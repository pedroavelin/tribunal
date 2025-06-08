'use strict'
const db = require('../models');

exports.listar = async (req, res) => {
  try {
    const processos = await db.Processo.findAll({
      include: [
        { model: db.Tribunal, as: 'tribunal' },
        { model: db.Seccao, as: 'seccao' },
        { model: db.EstadoProcesso, as: 'estado' },
        { model: db.Letra, as: 'letra' },
        { model: db.ProcessoArguido, as: 'arguidos',
          include: [{ model: db.Arguido, 
          include: [db.EstadoArguido, db.Endereco]}]
        },
        { 
          model: db.ProcessoDeclarante, as: 'declarantes',
          include: [db.Declarante]
        }
      ]
    });
    
    res.status(200).json(processos);
  } catch (error) {
    console.error('Erro detalhado:', error);
    res.status(500).json({
      message: 'Erro ao listar processos',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.adicionar = async (req, res) => {
  try {
    // Validação simples dos campos obrigatórios
    if (!req.body.numero || !req.body.ano || !req.body.crime || 
        !req.body.idTribunal || !req.body.idSeccao || 
        !req.body.idEstadoProcesso || !req.body.idLetra) {
      return res.status(400).send({
        message: "Todos os campos são obrigatórios."
      });
    }

    const processo = {
      numero: req.body.numero,
      ano: req.body.ano,
      crime: req.body.crime,
      idTribunal: req.body.idTribunal,
      idSeccao: req.body.idSeccao,
      idEstadoProcesso: req.body.idEstadoProcesso,
      idLetra: req.body.idLetra
    };

    const processoCriado = await Processo.create(processo);
    res.send(processoCriado);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Erro ao criar processo."
    });
  }
};

exports.atualizar = async (req, res) => {
  const id = req.params.id;

  try {
    const [updated] = await Processo.update(req.body, {
      where: { id: id }
    });

    if (updated === 1) {
      const processoAtualizado = await Processo.findByPk(id, {
        include: [
          { association: 'tribunal' },
          { association: 'seccao' },
          { association: 'estado' },
          { association: 'letra' },
          { association: 'arguidos' },
          { association: 'declarantes' }
        ]
      });
      res.send(processoAtualizado);
    } else {
      res.status(404).send({
        message: `Não foi possível encontrar o processo com id=${id}.`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || `Erro ao atualizar o processo com id=${id}.`
    });
  }
};