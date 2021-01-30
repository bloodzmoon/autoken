import JWT from 'jsonwebtoken'

export const refreshTokens: string[] = []

export function generateToken(username: string) {
  return JWT.sign({ username }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '15s',
  })
}

export function generateRefreshToken(username: string) {
  return JWT.sign({ username }, process.env.REFRESH_TOKEN_SECRET as string)
}
