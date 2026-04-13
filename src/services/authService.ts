import { prisma } from '../database/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
})

const loginSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
})

export async function registerService(body: unknown) {
  const { name, email, password } = registerSchema.parse(body)

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  }
}

export async function loginService(body: unknown) {
  const { email, password } = loginSchema.parse(body)

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error('USER_NOT_FOUND')
  }

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    throw new Error('INVALID_PASSWORD')
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1d'
    }
  )

  return {
    message: 'Login realizado com sucesso',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}

export async function profileService(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw new Error('USER_NOT_FOUND')
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  }
}