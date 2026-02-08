import prisma from "../../prismaClient.js"

async function getTarefas(req, res) {
  try {
    const id_usuario_logado = req.user.id
    
    const { page = 1, limit = 15, responsavelId, ordem = 'asc' } = req.query;

    const usuarioRepublica = await prisma.usuarioRepublica.findFirst({
      where: { id_usuario: id_usuario_logado }
    })

    if (!usuarioRepublica) return res.json([])

    const where = {
        id_republica: usuarioRepublica.id_republica,
    };

    if (responsavelId) {
        where.id_responsavel = Number(responsavelId);
    }

    const tarefas = await prisma.tarefa.findMany({
      where,
      include: {
        responsavel: { select: { nome: true } }
      },
      orderBy: {
        prazo: ordem === 'desc' ? 'desc' : 'asc' // Ordenar por data
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit)
    })

    const total = await prisma.tarefa.count({ where });

    return res.json({ 
        data: tarefas, 
        total, 
        paginaAtual: Number(page), 
        totalPaginas: Math.ceil(total / Number(limit)) 
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar tarefas" })
  }
}

export { getTarefas }