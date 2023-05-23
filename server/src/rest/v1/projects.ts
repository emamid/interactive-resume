import { Router } from 'express';
import type { NextFunction, Request, Response } from 'express';

import { getAll, getByID } from '@/db/queries/Project';

const getProject = async(request: Request, response: Response, next: NextFunction) => {
	const project = await getByID(request.params.id);
	console.log('project = ', project);
	if (project) {
		return response.json(project);
	}
	next?.();
}

const getProjects = async(_request: Request, response: Response) => {
	const projects = await getAll();
	return response.json(projects);
}

const router = Router();
router.get('/', getProjects);
router.get('/:id', getProject);

export default router;
