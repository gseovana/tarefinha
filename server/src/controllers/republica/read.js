import prisma from "../../prismaClient.js"

async function getRepublicas(req, res) {
  try {
    const republicas = await prisma.republica.findMany({
      include: {
        usuarios: {
          include: {
            usuario: true
          }
        },
        tarefas: true
      }
    })

    return res.json(republicas)
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar repúblicas" })
  }
}

async function getRepublicaById(req, res) {
  try {
    const { id } = req.params

    const republica = await prisma.republica.findUnique({
      where: {
        id_republica: Number(id)
      },
      include: {
        usuarios: {
          include: {
            usuario: {
              select: {
                id_usuario: true,
                nome: true,
                email: true
              }
            }
          }
        }
      }
    })

    if (!republica) {
      return res.status(404).json({ error: "República não encontrada" })
    }

    return res.status(200).json(republica)
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: "Erro ao buscar república" })
  }
}

async function getRepublicaUsuario(req, res) {
  try {
    const id_usuario = req.user.id

    const associacao = await prisma.usuarioRepublica.findFirst({
      where: { id_usuario },
      include: {
        republica: true
      }
    })

    if (!associacao) {
      return res.status(404).json({ error: "Usuário não possui república" })
    }

    return res.json(associacao.republica)

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao buscar minha república" })
  }
}

export { getRepublicas, getRepublicaById, getRepublicaUsuario } 

