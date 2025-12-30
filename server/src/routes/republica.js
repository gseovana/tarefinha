import { Router } from "express"

import createRepublica from "../controllers/republica/create.js"
import { getRepublicas, getRepublicaById } from "../controllers/republica/read.js"
import updateRepublica from "../controllers/republica/update.js"
import deleteRepublica from "../controllers/republica/delete.js"

// import authMiddleware from "../middlewares/auth.js"

const routerRepublica = Router()

// routerRepublica.use(authMiddleware)

// CREATE
routerRepublica.post("/", createRepublica)

// READ
routerRepublica.get("/", getRepublicas)
routerRepublica.get("/:id", getRepublicaById)

// UPDATE
routerRepublica.put("/:id", updateRepublica)

// DELETE
routerRepublica.delete("/:id", deleteRepublica)

export default routerRepublica
