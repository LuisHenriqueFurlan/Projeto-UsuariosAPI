import { prisma } from '../database/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function loginController(request: any, reply: any) {
  const { email, password } = request.body

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return reply.status(400).send({
      error: 'Usuário não encontrado'
    })
  }

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    return reply.status(400).send({
      error: 'Senha inválida'
    })
  }

  return {
    message: 'Login realizado com sucesso',
    user
  }
}

export async function registerController(request: any, reply: any) {
  const { name, email, password } = request.body

  const hashedPassword = await bcrypt.hash(password, 10)

try {   
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  return user
} catch (error: any) {
  if (error.code === 'P2002') {
    return reply.status(400).send({ error: 'Email já cadastrado' })
  } 

  throw error
}           
}