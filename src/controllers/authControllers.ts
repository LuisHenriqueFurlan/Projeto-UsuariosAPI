import type { FastifyReply, FastifyRequest } from 'fastify'
import { registerService, loginService, profileService } from '../services/authService.js'

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const user = await registerService(request.body)
    return reply.status(201).send(user)
  } catch (error: any) {
    return reply.status(400).send({
      error: error.message || 'Erro ao registrar usuário'
    })
  }
}

export async function loginController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const result = await loginService(request.body)
    return reply.send(result)
  } catch (error: any) {
    return reply.status(400).send({
      error: error.message || 'Erro no login'
    })
  }
}

export async function profileController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = Number((request as any).user.sub)

    const user = await profileService(userId)

    return reply.send(user)
  } catch (error: any) {
    return reply.status(400).send({
      error: error.message || 'Erro ao buscar perfil'
    })
  }
}