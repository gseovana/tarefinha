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

export { getMembros }