import prisma from "../../prismaClient.js"

async function getTarefas(req, res) {
  try {
    const id_usuario = req.user.id

    const usuarioRepublica = await prisma.usuarioRepublica.findFirst({
      where: { id_usuario }
    })

    if (!usuarioRepublica) {
      return res.status(400).json({ erro: "Você não faz parte de nenhuma república." })
    }

    const tarefas = await prisma.tarefa.findMany({
      where: {
        id_republica: usuarioRepublica.id_republica
      },
      include: {
        responsavel: {
          select: { nome: true, email: true }
        }
      }
    })

    return res.json(tarefas)
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar tarefas" })
  }
}

export { getTarefas }