import JWT from 'jsonwebtoken'

export const refreshTokens: string[] = []

export function generateToken(username: string) {
  const token = JWT.sign(
    { username },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: '15s',
    }
  )
  const decoded: any = JWT.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string
  )
  return { token, exp: decoded.exp }
}

export function generateRefreshToken(username: string) {
  const token = JWT.sign(
    { username },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '45s',
    }
  )
  const decoded: any = JWT.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET as string
  )
  return { token, exp: decoded.exp }
}
