import express from 'express';
import { getAllUsers, addUser, claimPoints, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', addUser);
router.post('/claim', claimPoints);
router.delete('/:userId', deleteUser);

export default router;