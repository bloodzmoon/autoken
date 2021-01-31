import { Router } from 'express'
import { verifyToken } from '../middlewares'

const router = Router()

router.get('/profile', verifyToken, (req, res) => {
  const data = {
    name: 'Thanyathon Pornsawatchai',
    github: '@bloodzmoon',
  }
  res.json(data)
})

export default router
