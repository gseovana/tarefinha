import { Router } from "express"
import usuarioRoutes from "./usuario.js"
import republicaRoutes from "./republica.js"
import tarefaRoutes from "./tarefa.js"

const router = Router()

router.use("/usuarios", usuarioRoutes)
router.use("/republicas", republicaRoutes)
router.use("/tarefas", tarefaRoutes)

export default router
