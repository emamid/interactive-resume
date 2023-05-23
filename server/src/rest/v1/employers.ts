import { Router } from 'express';
import type { NextFunction, Request, Response } from 'express';

import { getAll, getByID } from '@/db/queries/Employer'

const getEmployer = async(request: Request, response: Response, next: NextFunction) => {
	const employer = await getByID(request.params.id);
	console.log('employer = ', employer);
	if (employer) {
		return response.json(employer);
	}
	next?.();
}

const getEmployers = async(_request: Request, response: Response) => {
	const employers = await getAll();
	return response.json(employers);
}

const router = Router();
router.get('/', getEmployers);
router.get('/:id', getEmployer);

export default router;
