import jwt from "jsonwebtoken"

function authMiddleware(req, res, next) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: "Token não fornecido" })
  }

  const [, token] = authorization.split(" ")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = { id: decoded.id }

    return next()
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado" })
  }
}

export default authMiddleware