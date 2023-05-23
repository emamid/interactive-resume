import { Router } from 'express';

import employers from './employers';
import myself from './myself';
import projects from './projects';
import projectTags from './projectTags';
import tags from './tags';

const router = Router();
router.use('/employers', employers);
router.use('/myself', myself);
router.use('/projects', projects);
router.use('/project-tags', projectTags);
router.use('/tags', tags);

export default router;
