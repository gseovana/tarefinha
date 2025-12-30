import "dotenv/config"
import express from "express"
import cors from "cors"
import mainRoutes from "./routes/main.js"
import authRouter from "./routes/login.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use(mainRoutes)
app.use("/auth", authRouter)

app.get("/", (req, res) => {
  res.send("API rodando 🚀")
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})
