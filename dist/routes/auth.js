import { loginController, profileController, registerController } from '../controllers/authControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
export async function authRoutes(app) {
    app.post('/register', registerController);
    app.post('/login', loginController);
    app.get('/profile', { preHandler: authMiddleware }, profileController);
}
//# sourceMappingURL=auth.js.map