import { Router } from 'express';

import employers from './employers';
import myself from './myself';
import projects from './projects';

const router = Router();
router.use('/employers', employers);
router.use('/myself', myself);
router.use('/projects', projects);

export default router;
