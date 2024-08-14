// routes/cart.route.js
import express from 'express';
import { fetchCartItems, removeFromCart } from '../controller/cart.controller.js';

const router = express.Router();

router.get('/:email/items', fetchCartItems);
router.delete('/:id', removeFromCart);

export default router;
