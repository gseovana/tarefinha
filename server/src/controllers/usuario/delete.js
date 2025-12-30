import prisma from "../../prismaClient.js"

async function deleteUsuario(req, res) {
  try {
    const { id } = req.params

    await prisma.usuario.delete({
      where: { id_usuario: Number(id) }
    })

    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao deletar usuário" })
  }
}

export default deleteUsuario
