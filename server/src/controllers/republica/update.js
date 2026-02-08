import prisma from "../../prismaClient.js"

async function updateRepublica(req, res) {
  try {
    const { id } = req.params
    const { nome } = req.body

    const republica = await prisma.republica.findUnique({
      where: { id_republica: Number(id) }
    })

    if (!republica) {
      return res.status(404).json({ error: "República não encontrada" })
    }

    const atualizada = await prisma.republica.update({
      where: { id_republica: Number(id) },
      data: { nome }
    })

    return res.status(200).json(atualizada)
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: "Erro ao atualizar república" })
  }
}


export { updateRepublica }