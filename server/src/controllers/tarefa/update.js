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

    const id_usuario_logado = req.user.id 

    const usuarioRepublica = await prisma.usuarioRepublica.findFirst({
      where: { id_usuario: id_usuario_logado }
    })

    if (!usuarioRepublica) {
      return res.status(403).json({ error: "Você precisa estar em uma república para editar tarefas." })
    }

    const id_republica_atual = usuarioRepublica.id_republica

    const tarefaExiste = await prisma.tarefa.findFirst({
      where: {
        id_tarefa: Number(id),
        id_republica: id_republica_atual
      }
    })

    if (!tarefaExiste) {
      return res.status(404).json({ error: "Tarefa não encontrada ou não pertence à sua república." })
    }

    if (id_responsavel) {
      const responsavelEhDaCasa = await prisma.usuarioRepublica.findFirst({
        where: {
          id_usuario: id_responsavel,
          id_republica: id_republica_atual
        }
      })

      if (!responsavelEhDaCasa) {
        return res.status(400).json({ error: "O responsável indicado não mora nesta república." })
      }
    }

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id_tarefa: Number(id) },
      data: {
        titulo,
        descricao,
        frequencia,
        status,
        id_responsavel
      }
    })

    return res.json(tarefaAtualizada)

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao atualizar tarefa" })
  }
}

export { updateTarefa }