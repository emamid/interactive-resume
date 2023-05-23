import { Router } from 'express';
import type { Request, Response } from 'express';

import { getAll } from '@/db/queries/ProjectTag';

const getProjectTags = async(_request: Request, response: Response) => {
	const projectTags = await getAll();
	return response.json(projectTags);
}

const router = Router();
router.get('/', getProjectTags);

export default router;
