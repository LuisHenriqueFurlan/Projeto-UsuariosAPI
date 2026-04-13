import type { FastifyInstance } from 'fastify'
import {
  loginController,
  profileController,
  registerController
} from '../controllers/authControllers.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', registerController)
  app.post('/login', loginController)
  app.get('/profile', { preHandler: authMiddleware }, profileController)
}


