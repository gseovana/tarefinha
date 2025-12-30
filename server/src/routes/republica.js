import { Router } from "express"
import authMiddleware from "../middlewares/auth.js"

// Imports dos Controllers
import { createRepublica } from "../controllers/republica/create.js"
import { getRepublicas, getRepublicaById } from "../controllers/republica/read.js"
import { updateRepublica } from "../controllers/republica/update.js"
import { deleteRepublica } from "../controllers/republica/delete.js"
import { entrarRepublica } from "../controllers/republica/entrar.js"
import { getMembros } from "../controllers/republica/membros.js"

const routerRepublica = Router()

routerRepublica.use(authMiddleware)

routerRepublica.post("/", createRepublica)
routerRepublica.get("/", getRepublicas)
routerRepublica.get("/:id", getRepublicaById)
routerRepublica.put("/:id", updateRepublica)
routerRepublica.delete("/:id", deleteRepublica)

routerRepublica.post("/entrar", entrarRepublica)
routerRepublica.get("/:id/usuarios", getMembros)

export default routerRepublica