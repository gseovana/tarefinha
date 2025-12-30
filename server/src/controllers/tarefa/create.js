import prisma from "../../prismaClient.js"

async function createTarefa(req, res) {
  try {
    const {
      titulo,
      descricao,
      frequencia,
      status,
      id_responsavel,
      id_republica
    } = req.body

    const tarefa = await prisma.tarefa.create({
      data: {
        titulo,
        descricao,
        frequencia,
        status,
        id_responsavel,
        id_republica
      }
    })

    return res.status(201).json(tarefa)
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar tarefa" })
  }
}

export { createTarefa }
