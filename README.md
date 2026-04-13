#  Auth API

API de autenticação desenvolvida com Fastify, TypeScript, Prisma e JWT.

---

## Funcionalidades

- Cadastro de usuário
- Login com autenticação
- Senha criptografada com bcrypt
- Geração de token JWT
- Rota protegida com middleware
- Validação de dados com Zod

---

## Tecnologias

- Node.js
- TypeScript
- Fastify
- Prisma
- MariaDB
- bcrypt
- jsonwebtoken
- Zod

---

## Rotas

### POST /register

Cria um novo usuário.

```json
{
  "name": "Luis",
  "email": "luis@email.com",
  "password": "123456"
}