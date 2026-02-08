import prisma from "../../prismaClient.js"

async function getMembros(req, res) {
  try {
    const { id } = req.params

    const membros = await prisma.usuarioRepublica.findMany({
      where: { id_republica: Number(id) },
      include: {
        usuario: {
          select: {
            id_usuario: true,
            nome: true,
            email: true
          }
        }
      }
    })

    const listaFormatada = membros.map(item => ({
      ...item.usuario,
      papel: item.papel
    }))

    return res.json(listaFormatada)
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar membros" })
  }
}

async function removerMembro(req, res) {
  try {
    const { id_republica, id_membro } = req.params
    const id_lider_logado = req.user.id

    const republica = await prisma.republica.findUnique({
      where: { id_republica: Number(id_republica) }
    })

    if (!republica || republica.id_lider !== id_lider_logado) {
      return res.status(403).json({ error: "Apenas o líder pode remover membros." })
    }

    if (Number(id_membro) === id_lider_logado) {
      return res.status(400).json({ error: "O líder não pode se expulsar." })
    }

    await prisma.usuarioRepublica.deleteMany({
      where: {
        id_republica: Number(id_republica),
        id_usuario: Number(id_membro)
      }
    })

    await prisma.tarefa.updateMany({
        where: { 
            id_republica: Number(id_republica),
            id_responsavel: Number(id_membro)
        },
        data: { id_responsavel: null }
    })

    return res.status(204).send()

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao remover membro." })
  }
}

async function promoverMembro(req, res) {
    try {
      const { id_republica, id_membro } = req.params
      const id_lider_atual = req.user.id
  
      const republica = await prisma.republica.findUnique({
        where: { id_republica: Number(id_republica) }
      })
  
      if (!republica || republica.id_lider !== id_lider_atual) {
        return res.status(403).json({ error: "Apenas o líder pode promover alguém." })
      }
  
      await prisma.$transaction(async (tx) => {
        
        await tx.usuarioRepublica.updateMany({
            where: { id_republica: Number(id_republica), id_usuario: id_lider_atual },
            data: { papel: "MEMBRO" }
        })

        await tx.usuarioRepublica.updateMany({
            where: { id_republica: Number(id_republica), id_usuario: Number(id_membro) },
            data: { papel: "LIDER" }
        })

        await tx.republica.update({
            where: { id_republica: Number(id_republica) },
            data: { id_lider: Number(id_membro) }
        })
      })
  
      return res.status(200).json({ message: "Liderança transferida com sucesso!" })
  
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao promover membro." })
    }
  }

async function alterarPapel(req, res) {
  try {
    const { id_republica, id_membro } = req.params
    const { novoPapel } = req.body 
    const id_lider_logado = req.user.id

    const PAPEIS_PERMITIDOS = ["DECANO", "MEMBRO", "AGREGADO", "CALOURO"];

    if (!PAPEIS_PERMITIDOS.includes(novoPapel)) {
        return res.status(400).json({ 
            error: `Papel inválido. Valores permitidos: ${PAPEIS_PERMITIDOS.join(", ")}` 
        });
    }

    const republica = await prisma.republica.findUnique({
      where: { id_republica: Number(id_republica) }
    })

    if (!republica || republica.id_lider !== id_lider_logado) {
      return res.status(403).json({ error: "Apenas o líder pode alterar papéis." })
    }

    if (Number(id_membro) === id_lider_logado) {
      return res.status(400).json({ error: "O líder não pode alterar seu próprio papel por aqui." })
    }

    await prisma.usuarioRepublica.updateMany({
      where: {
        id_republica: Number(id_republica),
        id_usuario: Number(id_membro)
      },
      data: {
        papel: novoPapel
      }
    })

    return res.status(200).json({ message: `Papel atualizado para ${novoPapel}!` })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao alterar papel." })
  }
}

async function sairDaRepublica(req, res) {
  try {
    const { id_republica } = req.params
    const id_usuario_logado = req.user.id

    const associacao = await prisma.usuarioRepublica.findFirst({
      where: {
        id_republica: Number(id_republica),
        id_usuario: id_usuario_logado
      }
    })

    if (!associacao) {
      return res.status(404).json({ error: "Você não faz parte desta república." })
    }

    if (associacao.papel === 'LIDER') {
      return res.status(400).json({ error: "O líder não pode sair. Transfira a liderança ou exclua a república nas configurações." })
    }

    await prisma.$transaction(async (tx) => {
        await tx.tarefa.updateMany({
            where: { 
                id_republica: Number(id_republica),
                id_responsavel: id_usuario_logado 
            },
            data: { id_responsavel: null }
        })

        await tx.usuarioRepublica.deleteMany({
            where: {
                id_republica: Number(id_republica),
                id_usuario: id_usuario_logado
            }
        })
    })

    return res.status(204).send()

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao sair da república." })
  }
}

export { getMembros, removerMembro, promoverMembro, alterarPapel, sairDaRepublica }