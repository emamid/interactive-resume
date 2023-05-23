import { Router } from 'express';

import employers from './employers';
import myself from './myself';

const router = Router();
router.use('/employers', employers);
router.use('/myself', myself);

export default router;
