import { Router } from 'express'
import JWT from 'jsonwebtoken'
import {
  refreshTokens,
  generateToken,
  generateRefreshToken,
} from '../controllers'

const router = Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username !== 'autoken') return res.sendStatus(401)
  if (password !== 'autoken') return res.sendStatus(401)

  const accessToken = generateToken(username)
  const refreshToken = generateRefreshToken(username)
  refreshTokens.push(refreshToken)
  res.json({ accessToken, refreshToken })
})

router.post('/token', (req, res) => {
  const { refreshToken } = req.body
  if (!refreshToken) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

  JWT.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: any, { username }: any) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateToken(username)
      return res.json({ accessToken })
    }
  )
})

router.delete('/logout', (req, res) => {
  const { refreshToken } = req.body
  const index = refreshTokens.findIndex((token) => token === refreshToken)
  if (index === -1) return res.sendStatus(204)

  refreshTokens.splice(index, 1)
  return res.sendStatus(204)
})

export default router
