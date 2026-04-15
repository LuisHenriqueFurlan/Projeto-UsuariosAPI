import Fastify from 'fastify'
import { authRoutes } from './routes/auth.js'
import cors from '@fastify/cors'

const app = Fastify()

app.register(authRoutes)
app.register(cors)

app.listen({ port: 3333 }).then(() => {
  console.log('Servidor rodando em http://localhost:3333')
})