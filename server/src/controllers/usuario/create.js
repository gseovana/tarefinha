import prisma from "../../prismaClient.js"
import bcrypt from "bcryptjs"

async function createUsuario(req, res) {
  try {
    const { nome, email, senha } = req.body

    const senhaHash = await bcrypt.hash(senha, 8)

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
      }
    })

    const { senha: _, ...usuarioSemSenha } = usuario

    return res.status(201).json(usuarioSemSenha)
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar usuário" })
  }
}

export default createUsuario