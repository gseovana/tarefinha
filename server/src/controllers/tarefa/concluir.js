import prisma from "../../prismaClient.js"

async function concluirTarefa(req, res) {
  try {
    const { id } = req.params // ID da tarefa
    const id_usuario = req.user.id

    const usuarioRepublica = await prisma.usuarioRepublica.findFirst({
      where: { id_usuario }
    })

    if (!usuarioRepublica) return res.status(403).json({ erro: "Sem permissão" })

    const tarefa = await prisma.tarefa.findFirst({
      where: {
        id_tarefa: Number(id),
        id_republica: usuarioRepublica.id_republica // Trava de segurança
      }
    })

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada ou não pertence à sua república." })
    }

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id_tarefa: Number(id) },
      data: {
        status: "CONCLUIDA"
      }
    })

    return res.json(tarefaAtualizada)

  } catch (error) {
    return res.status(500).json({ erro: "Erro ao concluir tarefa" })
  }
}

export { concluirTarefa }