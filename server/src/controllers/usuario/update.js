import prisma from "../../prismaClient.js"

async function updateUsuario(req, res) {
  try {
    const { id } = req.params
    const dadosAtualizados = req.body

    const usuario = await prisma.usuario.update({
      where: {
        id_usuario: Number(id)
      },
      data: dadosAtualizados
    })

    return res.status(200).json(usuario)
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      error: "Erro ao atualizar usuário"
    })
  }
}

export default updateUsuario
