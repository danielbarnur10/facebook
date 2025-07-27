import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { validateRegisterInput, validateLoginInput } from '../middleware/validation';
import AuthController from '../controllers/Auth.Controller';

const router = express.Router();

// Authentication routes
router.post('/register', validateRegisterInput, AuthController.register);
router.post('/login', validateLoginInput, AuthController.login);
router.post('/logout', AuthController.logout);

// Protected routes
router.get('/me', authenticateToken, AuthController.getMe);

// Admin/Development routes (protected)
router.get('/users', authenticateToken, AuthController.getAllUsers);
router.delete('/users/:id', authenticateToken, AuthController.deleteUser);

export default router; 