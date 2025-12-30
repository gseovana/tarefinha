import prisma from "../../prismaClient.js"
import crypto from "crypto"

async function createRepublica(req, res) {
  try {
    const { nome } = req.body
    const id_usuario = req.user.id

    const jaMoraEmAlgumLugar = await prisma.usuarioRepublica.findFirst({
      where: { id_usuario }
    })

    if (jaMoraEmAlgumLugar) {
      return res.status(400).json({ error: "Você já faz parte de uma república. Saia dela antes de criar uma nova." })
    }

    // Gera um código de acesso
    const codigo_acesso = crypto.randomBytes(3).toString("hex").toUpperCase()

    // Cria a república E adiciona o líder como membro automaticamente
    const result = await prisma.$transaction(async (tx) => {
      const republica = await tx.republica.create({
        data: {
          nome,
          codigo_acesso,
          id_lider: id_usuario
        }
      })

      // Adiciona o líder na tabela
      await tx.usuarioRepublica.create({
        data: {
          id_usuario,
          id_republica: republica.id_republica,
          papel: "LIDER"
        }
      })

      return republica
    })

    return res.status(201).json(result)

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao criar república" })
  }
}

export { createRepublica }