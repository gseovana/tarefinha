import prisma from "../../prismaClient.js"

async function deleteUsuario(req, res) {
  try {
    const { id } = req.params
    const idNum = Number(id)

    await prisma.$transaction(async (tx) => {
      
      const associacao = await tx.usuarioRepublica.findFirst({
        where: { id_usuario: idNum }
      })

      if (associacao) {
        const idRepublica = associacao.id_republica

        const republica = await tx.republica.findUnique({
          where: { id_republica: idRepublica }
        })

        if (republica && republica.id_lider === idNum) {
          
          const herdeiros = await tx.usuarioRepublica.findMany({
            where: {
              id_republica: idRepublica,
              id_usuario: { not: idNum }
            },
            orderBy: {
              data_entrada: 'asc' 
            },
            take: 1
          })

          if (herdeiros.length > 0) {
            const novoLider = herdeiros[0]

            await tx.republica.update({
              where: { id_republica: idRepublica },
              data: { id_lider: novoLider.id_usuario }
            })

            await tx.usuarioRepublica.update({
              where: { id_usuario_republica: novoLider.id_usuario_republica },
              data: { papel: 'LIDER' }
            })

          } else {
         
            await tx.tarefa.deleteMany({
              where: { id_republica: idRepublica }
            })

            await tx.usuarioRepublica.deleteMany({
              where: { id_republica: idRepublica }
            })

            await tx.republica.delete({
              where: { id_republica: idRepublica }
            })
          }
        }
        
    
        await tx.usuarioRepublica.deleteMany({
          where: { id_usuario: idNum }
        })
      }

     
      await tx.tarefa.updateMany({
        where: { id_responsavel: idNum },
        data: { id_responsavel: null }
      })

      await tx.usuario.delete({
        where: { id_usuario: idNum }
      })
    })

    return res.status(204).send()

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao deletar usuário." })
  }
}

export default deleteUsuario