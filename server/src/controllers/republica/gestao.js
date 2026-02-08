import prisma from "../../prismaClient.js"
import { v4 as uuidv4 } from 'uuid'; 

async function atualizarRepublica(req, res) {
  try {
    const { id_republica } = req.params
    const { nome } = req.body
    const id_lider_logado = req.user.id

    const republica = await prisma.republica.findUnique({ where: { id_republica: Number(id_republica) } })
    if (!republica || republica.id_lider !== id_lider_logado) {
      return res.status(403).json({ error: "Apenas o líder pode editar a república." })
    }

    const republicaAtualizada = await prisma.republica.update({
      where: { id_republica: Number(id_republica) },
      data: { nome }
    })

    return res.json(republicaAtualizada)
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar república." })
  }
}

async function trocarCodigo(req, res) {
  try {
    const { id_republica } = req.params
    const id_lider_logado = req.user.id

    const republica = await prisma.republica.findUnique({ where: { id_republica: Number(id_republica) } })
    if (!republica || republica.id_lider !== id_lider_logado) {
      return res.status(403).json({ error: "Apenas o líder pode trocar o código." })
    }

    const novoCodigo = uuidv4().split('-')[0].toUpperCase();

    const republicaAtualizada = await prisma.republica.update({
      where: { id_republica: Number(id_republica) },
      data: { codigo_acesso: novoCodigo }
    })

    return res.json({ novoCodigo: republicaAtualizada.codigo_acesso })
  } catch (error) {
    return res.status(500).json({ error: "Erro ao trocar código." })
  }
}

async function excluirRepublica(req, res) {
  try {
    const { id_republica } = req.params
    const id_lider_logado = req.user.id

    const republica = await prisma.republica.findUnique({ where: { id_republica: Number(id_republica) } })
    if (!republica || republica.id_lider !== id_lider_logado) {
      return res.status(403).json({ error: "Apenas o líder pode excluir a república." })
    }

    await prisma.$transaction(async (tx) => {
        await tx.tarefa.deleteMany({ where: { id_republica: Number(id_republica) } })
        await tx.usuarioRepublica.deleteMany({ where: { id_republica: Number(id_republica) } })
        await tx.republica.delete({ where: { id_republica: Number(id_republica) } })
    })

    return res.status(204).send()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Erro ao excluir república." })
  }
}

export { atualizarRepublica, trocarCodigo, excluirRepublica }