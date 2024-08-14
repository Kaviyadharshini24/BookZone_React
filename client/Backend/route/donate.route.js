import express from 'express';
import { donation } from '../controller/donate.controller.js';
const router = express.Router();

router.post('/', donation);

export default router;
