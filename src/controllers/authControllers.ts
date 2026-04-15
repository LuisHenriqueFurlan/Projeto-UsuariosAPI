import type { FastifyReply, FastifyRequest } from 'fastify'
import { registerService, loginService, profileService } from '../services/authService.js'
import { AppError } from '../errors/AppError.js'

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const user = await registerService(request.body)
    return reply.status(201).send(user)
  } catch (error: any) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        success: false,
        error: {
          code: error.code,
          message: error.message
        }
      })
    }

    return reply.status(500).send({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Erro interno do servidor'
      }
    })
  }
}

export async function loginController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const result = await loginService(request.body)
    return reply.send({
      success: true,
      data: result
    })
  } catch (error: any) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        success: false,
        error: {
          code: error.code,
          message: error.message
        }
      })
    }

    return reply.status(500).send({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Erro interno do servidor'
      }
    })
  }
}

export async function profileController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = Number((request as any).user.sub)

    const user = await profileService(userId)

    return reply.send({
      success: true,
      data: user
    })
  } catch (error: any) {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        success: false,
        error: {
          code: error.code,
          message: error.message
        }
      })
    }

    return reply.status(500).send({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Erro interno do servidor'
      }
    })
  }
}