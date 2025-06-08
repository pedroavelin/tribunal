'use strict'
const db = require('../models');
const User = db.User;

exports.listar = async (req, res) => {
  try {
    const processos = await db.Processo.findAll({
      include: [{
          model: db.Tribunal,
          as: 'tribunal'
        },
        {
          model: db.Seccao,
          as: 'seccao'
        },
        {
          model: db.EstadoProcesso,
          as: 'estado'
        },
        {
          model: db.Letra,
          as: 'letra'
        },
        // {
        //   model: db.Arguido,
        //   as: 'arguido',
        //   through: { attributes: [] }, // para não retornar dados da tabela intermediária
        //   include: [db.Endereco]
        // },
        // {
        //   model: db.Declarante,
        //   as: 'declarantes',
        //   through: { attributes: [] } // se tiver belongsToMany corretamente
        // }
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
exports.listarPorLetraDoUsuario = async (req, res) => {
  try {
    // 1. Buscar o usuário logado (assumindo que o ID está no token decodificado)
    const userId = req.userId; // ← do token JWT
    const user = await db.User.findByPk(userId);

    if (!user || !user.idLetra) {
      return res.status(404).json({ message: 'Usuário ou letra não encontrada.' });
    }

    // 2. Buscar processos com a mesma letra
    const processos = await db.Processo.findAll({
    include: [
      { model: db.Tribunal, as: 'tribunal' },
      { model: db.Seccao, as: 'seccao' },
      { model: db.EstadoProcesso, as: 'estado' },
      { model: db.Letra, as: 'letra' }, 
      {
        model: db.ProcessoArguido,
        as: 'arguidos',
        include: [
          {
            model: db.Arguido,
            as: 'arguido',
            attributes: ['id', 'nome', 'idade', 'sexo', 'profissao', 'dataDeNascimento', 'idEndereco'],
            include: [
              {
                model: db.EstadoArguido,
                as: 'estado',
                attributes: ['descricao']
              },
              {
                model: db.Endereco,
                as: 'endereco',
                include: [
                  {
                    model: db.Municipio,
                    as: 'municipio',
                    attributes: ['nome'],
                    include: [
                      {
                        model: db.Provincia,
                        as: 'provincia',
                        attributes: ['nome']
                      }
                    ]
                  }
                ],
                attributes: ['bairro', 'rua', 'casa']
              }
            ]
          }
        ]
      },
    {
      model: db.ProcessoDeclarante,
      as: 'declarantes',
      include: [
        {
          model: db.Declarante,
          as: 'declarante',
          attributes: ['id', 'nome', 'idade', 'sexo', 'profissao', 'email', 'telf1', 'telf2', 'idEndereco'],
          include: [
            {
              model: db.Endereco,
              as: 'endereco',
              attributes: ['bairro', 'rua', 'casa'],
              include: [
                {
                  model: db.Municipio,
                  as: 'municipio',
                  attributes: ['nome'],
                  include: [
                    {
                      model: db.Provincia,
                      as: 'provincia',
                      attributes: ['nome']
                    }
                  ]
                }
              ]
            }
          ]
        },
        
      ]
    }
  ]
});


    return res.status(200).json(processos);
  } catch (error) {
    console.error('Erro ao listar por letra:', error);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
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
      where: {
        id: id
      }
    });

    if (updated === 1) {
      const processoAtualizado = await Processo.findByPk(id, {
        include: [{
            association: 'tribunal'
          },
          {
            association: 'seccao'
          },
          {
            association: 'estado'
          },
          {
            association: 'letra'
          },
          {
            association: 'arguidos'
          },
          {
            association: 'declarantes'
          }
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