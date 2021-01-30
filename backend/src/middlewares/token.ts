import { Request, Response, NextFunction } from 'express'
import JWT from 'jsonwebtoken'

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err) => {
    if (err) return res.sendStatus(403)
    next()
  })
}
