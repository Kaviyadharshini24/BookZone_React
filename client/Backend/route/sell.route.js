
import express from 'express';

import { sell } from '../controller/sell.controller.js';

const router = express.Router();

router.post("/",sell)

export default router;
