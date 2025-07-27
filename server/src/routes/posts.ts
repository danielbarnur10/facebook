import express from 'express';
import { authenticateToken } from '../middleware/auth';
import PostsController from '../controllers/posts.controller';

const router = express.Router();
console.log("in posts")
router.use(authenticateToken);

router.post('/', PostsController.create);
router.patch('/', PostsController.update);
router.get('/', PostsController.getAll);
router.get('/:id', PostsController.get);
router.delete('/:id', PostsController.delete);

export default router; 