import prisma from "../../prismaClient.js"

async function createTarefa(req, res) {
  try {
    const { titulo, descricao, frequencia, id_responsavel } = req.body
    const id_usuario_logado = req.user.id

    const usuarioRepublica = await prisma.usuarioRepublica.findFirst({
      where: { id_usuario: id_usuario_logado }
    })

    if (!usuarioRepublica) {
      return res.status(400).json({ erro: "Você precisa entrar em uma república para criar tarefas." })
    }

    const id_republica = usuarioRepublica.id_republica

    if (id_responsavel) {
      const responsavelEhDaCasa = await prisma.usuarioRepublica.findFirst({
        where: {
          id_usuario: id_responsavel,
          id_republica: id_republica // Tem que bater com a república atual
        }
      })

      if (!responsavelEhDaCasa) {
        return res.status(400).json({ erro: "O responsável selecionado não mora nesta república." })
      }
    }

    const tarefa = await prisma.tarefa.create({
      data: {
        titulo,
        descricao,
        frequencia,
        status: "PENDENTE", 
        id_responsavel: id_responsavel || null, 
        id_republica
      }
    })

    return res.status(201).json(tarefa)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ erro: "Erro ao criar tarefa" })
  }
}

export { createTarefa }