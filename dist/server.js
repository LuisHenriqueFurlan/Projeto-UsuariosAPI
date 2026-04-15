import Fastify from 'fastify';
import { authRoutes } from './routes/auth.js';
const app = Fastify();
app.register(authRoutes);
app.listen({ port: 3333 }).then(() => {
    console.log('Servidor rodando em http://localhost:3333');
});
//# sourceMappingURL=server.js.map