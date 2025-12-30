import e from "express"
import prisma from "../../prismaClient.js"

async function updateTarefa(req, res) {
  try {
    const { id } = req.params
    const {
      titulo,
      descricao,
      frequencia,
      status,
      id_responsavel
    } = req.body

    const tarefa = await prisma.tarefa.update({
      where: { id_tarefa: Number(id) },
      data: {
        titulo,
        descricao,
        frequencia,
        status,
        id_responsavel
      }
    })

    return res.json(tarefa)
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao atualizar tarefa" })
  }
}

export { updateTarefa }