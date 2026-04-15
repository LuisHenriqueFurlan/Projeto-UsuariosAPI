import { prisma } from '../database/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { AppError } from '../errors/AppError.js';
const registerSchema = z.object({
    name: z.string().min(2, 'Nome muito curto'),
    email: z.email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
});
const loginSchema = z.object({
    email: z.email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
});
export async function registerService(body) {
    const { name, email, password } = registerSchema.parse(body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
    };
}
export async function loginService(body) {
    const { email, password } = loginSchema.parse(body);
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        throw new AppError('Usuário não encontrado', 404, 'USER_NOT_FOUND');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new AppError('Senha inválida', 400, 'INVALID_PASSWORD');
    }
    const token = jwt.sign({
        sub: user.id,
        email: user.email
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    return {
        message: 'USER_NOT_FOUND',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}
export async function profileService(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    if (!user) {
        throw new AppError('Usuário não encontrado', 404, 'USER_NOT_FOUND');
    }
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
    };
}
//# sourceMappingURL=authService.js.map