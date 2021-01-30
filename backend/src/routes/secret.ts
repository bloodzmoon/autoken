import { Router } from 'express'
import { verifyToken } from '../middlewares'

const router = Router()

router.get('/secret', verifyToken, (req, res) => {
  res.send('This is Secret!')
})

export default router
