import express from 'express';
import { getAllUsers, addUser, claimPoints } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', addUser);
router.post('/claim', claimPoints);

export default router;