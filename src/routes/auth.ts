import type { FastifyInstance } from 'fastify'
import { registerController } from '../controllers/authControllers.js'
import { loginController } from '../controllers/authControllers.js'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', registerController)
  app.post('/login', loginController)
}
