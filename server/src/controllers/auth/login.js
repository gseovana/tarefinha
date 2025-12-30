import prisma from "../../prismaClient.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

async function login(req, res) {
  try {
    const { email, senha } = req.body

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    })

    if (!usuario) {
      return res.status(401).json({ error: "Email ou senha inválidos" })
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha)

    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha inválidos" })
    }

    const token = jwt.sign(
      { id: usuario.id_usuario }, 
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    const { senha: _, ...usuarioSemSenha } = usuario

    return res.json({
      usuario: usuarioSemSenha,
      token
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro no login" })
  }
}

export { login }