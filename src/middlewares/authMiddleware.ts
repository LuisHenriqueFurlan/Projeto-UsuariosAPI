import type { FastifyReply, FastifyRequest } from 'fastify'
import * as jwt from 'jsonwebtoken'

type JwtPayload = {
  sub: number
  email: string
}

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return reply.status(401).send({
      error: 'Token não enviado'
    })
  }

  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return reply.status(401).send({
      error: 'Token mal formatado'
    })
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as unknown as JwtPayload

    ;(request as any).user = decoded
  } catch {
    return reply.status(401).send({
      error: 'Token inválido'
    })
  }
}