import * as jwt from 'jsonwebtoken';
export async function authMiddleware(request, reply) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return reply.status(401).send({
            error: 'Token não enviado'
        });
    }
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return reply.status(401).send({
            error: 'Token mal formatado'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded;
    }
    catch {
        return reply.status(401).send({
            error: 'Token inválido'
        });
    }
}
//# sourceMappingURL=authMiddleware.js.map