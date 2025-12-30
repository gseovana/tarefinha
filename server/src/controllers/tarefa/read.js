import e from "express"
import prisma from "../../prismaClient.js"

async function getTarefas(req, res) {
  try {
    const tarefas = await prisma.tarefa.findMany({
      include: {
        responsavel: true,
        republica: true
      }
    })

    return res.json(tarefas)
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar tarefas" })
  }
}

export { getTarefas }