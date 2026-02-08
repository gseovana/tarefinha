import prisma from "../../prismaClient.js"
import { addDays, addWeeks, addMonths } from 'date-fns';

export async function concluirTarefa(req, res) {
  const { id } = req.params

  try {
    const tarefaOriginal = await prisma.tarefa.findUnique({
      where: { id_tarefa: Number(id) }
    })

    if (!tarefaOriginal) {
      return res.status(404).json({ erro: "Tarefa não encontrada" })
    }

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id_tarefa: Number(id) },
      data: { status: true } // Lembre-se: no banco é status (bool)
    })

    if (tarefaOriginal.frequencia && tarefaOriginal.frequencia !== 'NENHUMA') {
      
      let novaData = new Date(tarefaOriginal.prazo)

      if (tarefaOriginal.frequencia === 'DIARIA') {
        novaData.setDate(novaData.getDate() + 1)
      } else if (tarefaOriginal.frequencia === 'SEMANAL') {
        novaData.setDate(novaData.getDate() + 7)
      } else if (tarefaOriginal.frequencia === 'MENSAL') {
        novaData.setMonth(novaData.getMonth() + 1)
      }

      await prisma.tarefa.create({
        data: {
          titulo: tarefaOriginal.titulo,
          descricao: tarefaOriginal.descricao,
          prazo: novaData,
          id_republica: tarefaOriginal.id_republica,
          id_responsavel: tarefaOriginal.id_responsavel,
          status: false,

          frequencia: tarefaOriginal.frequencia 
        }
      })
    }

    return res.json(tarefaAtualizada)

  } catch (error) {
    console.error(error)
    return res.status(500).json({ erro: "Erro ao concluir tarefa" })
  }
}