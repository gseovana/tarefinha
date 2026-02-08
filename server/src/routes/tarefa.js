import { Router } from "express"
import { createTarefa } from "../controllers/tarefa/create.js"
import { getTarefas } from "../controllers/tarefa/read.js"
import { updateTarefa } from "../controllers/tarefa/update.js"
import { deleteTarefa } from "../controllers/tarefa/delete.js"
import { concluirTarefa } from "../controllers/tarefa/concluir.js"

import authMiddleware from "../middlewares/auth.js"

const router = Router()
router.use(authMiddleware)
console.log("--> FUNÇÃO READ:", getTarefas.name) 
console.log("--> FUNÇÃO CREATE:", createTarefa.name)

router.post("/", createTarefa)
router.get("/", getTarefas)
router.put("/:id", updateTarefa)
router.delete("/:id", deleteTarefa)
router.patch("/:id/concluir", concluirTarefa)

export default router