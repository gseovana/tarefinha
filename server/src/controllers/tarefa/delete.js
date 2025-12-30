import prisma from "../../prismaClient.js"

async function deleteTarefa(req, res) {
  try {
    const { id } = req.params

    await prisma.tarefa.delete({
      where: { id_tarefa: Number(id) }
    })

    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao deletar tarefa" })
  }
}

export { deleteTarefa }