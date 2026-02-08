import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  // 1. Busca o token no cabeçalho (Header: Authorization -> Bearer <token>)
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = {
      id: decoded.id,
      email: decoded.email
    }

    return next()

  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' })
  }
}

export default authMiddleware