import { Router } from 'express';

import myself from './myself';

const router = Router();
router.use('/myself', myself);

export default router;
