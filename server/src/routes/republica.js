import { Router } from "express"
import authMiddleware from "../middlewares/auth.js"

import { createRepublica } from "../controllers/republica/create.js"
import { getRepublicas, getRepublicaById, getRepublicaUsuario } from "../controllers/republica/read.js"
import { entrarRepublica } from "../controllers/republica/entrar.js"
import { getMembros, removerMembro, promoverMembro, alterarPapel, sairDaRepublica } from "../controllers/republica/membros.js"
import { trocarCodigo, excluirRepublica, atualizarRepublica } from "../controllers/republica/gestao.js"

const routerRepublica = Router()

routerRepublica.use(authMiddleware)

// --- Rotas Básicas ---
routerRepublica.post("/", createRepublica)
routerRepublica.get("/", getRepublicas)
routerRepublica.get("/me", getRepublicaUsuario)
routerRepublica.get("/:id", getRepublicaById)
routerRepublica.post("/entrar", entrarRepublica)

routerRepublica.get("/:id/membros", getMembros)
routerRepublica.patch("/:id_republica/membros/:id_membro/promover", promoverMembro)
routerRepublica.patch("/:id_republica/membros/:id_membro/papel", alterarPapel)
routerRepublica.delete("/:id_republica/membros/:id_membro", removerMembro)

routerRepublica.put("/:id_republica", atualizarRepublica) 
routerRepublica.patch("/:id_republica/codigo", trocarCodigo)
routerRepublica.delete("/:id_republica", excluirRepublica) 
routerRepublica.delete("/:id_republica/sair", sairDaRepublica) // <--- 2. Crie a rota

export default routerRepublica