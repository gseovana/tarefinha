import { Router } from "express"
import createUsuario from "../controllers/usuario/create.js"
import getUsuarios from "../controllers/usuario/read.js"
import updateUsuario from "../controllers/usuario/update.js"
import deleteUsuario from "../controllers/usuario/delete.js"

const routerUsuario = Router()

routerUsuario.post("/", createUsuario)
routerUsuario.get("/", getUsuarios)
routerUsuario.put("/:id", updateUsuario)
routerUsuario.delete("/:id", deleteUsuario)

export default routerUsuario
