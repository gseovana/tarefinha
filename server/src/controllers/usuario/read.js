import prisma from "../../prismaClient.js"

async function getUsuarios(req, res) {
  try {
    const usuarios = await prisma.usuario.findMany()
    return res.json(usuarios)
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar usuários" })
  }
}

export default getUsuarios