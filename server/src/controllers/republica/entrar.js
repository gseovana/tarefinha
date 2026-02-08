import prisma from "../../prismaClient.js"

async function entrarRepublica(req, res) {
  try {
    const { codigo_acesso } = req.body
    const id_usuario = req.user.id

    const republica = await prisma.republica.findFirst({
      where: { codigo_acesso }
    })

    if (!republica) {
      return res.status(404).json({ error: "Código de acesso inválido ou república não encontrada" })
    }

    const jaTemRepublica = await prisma.usuarioRepublica.findFirst({
      where: { id_usuario }
    })

    if (jaTemRepublica) {
      return res.status(400).json({ error: "Você já faz parte de uma república!" })
    }

    await prisma.usuarioRepublica.create({
      data: {
        id_usuario,
        id_republica: republica.id_republica,
        papel: "MEMBRO"
      }
    })

    return res.json(republica) 

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao entrar na república" })
  }
}

export { entrarRepublica }