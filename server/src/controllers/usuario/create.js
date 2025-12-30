import e from "express"
import prisma from "../../prismaClient.js"

async function createUsuario(req, res) {
  try {
    const { nome, email, senha } = req.body

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha
      }
    })

    return res.status(201).json(usuario)
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar usuário" })
  }
}

export default createUsuario