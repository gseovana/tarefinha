import prisma from "../../prismaClient.js"

async function createRepublica(req, res) {
  try {
    const { nome, codigo_acesso, id_lider } = req.body

    const republica = await prisma.republica.create({
      data: {
        nome,
        codigo_acesso,
        id_lider
      }
    })

    return res.status(201).json(republica)
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar república" })
  }
}

export default createRepublica