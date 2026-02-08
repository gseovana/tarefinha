import prisma from "../../prismaClient.js"

async function deleteRepublica(req, res) {
  try {
    const { id } = req.params
    const id_usuario = req.user.id

    const republica = await prisma.republica.findUnique({
      where: { id_republica: Number(id) }
    })

    if (!republica) {
      return res.status(404).json({ error: "República não encontrada" })
    }

    if (republica.id_lider !== id_usuario) {
      return res.status(403).json({ error: "Apenas o líder pode excluir a república" })
    }

    await prisma.republica.delete({
      where: { id_republica: Number(id) }
    })

    return res.status(204).send()
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: "Erro ao deletar república" })
  }
}

export { deleteRepublica }