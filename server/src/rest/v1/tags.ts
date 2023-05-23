import { Router } from 'express';
import type { NextFunction, Request, Response } from 'express';

import { getAll, getByID } from '@/db/queries/Tag';

const getTag = async(request: Request, response: Response, next: NextFunction) => {
	const tag = await getByID(request.params.id);
	if (tag) {
		return response.json(tag);
	}
	next?.();
}

const getTags = async(_request: Request, response: Response) => {
	const tags = await getAll();
	return response.json(tags);
}

const router = Router();
router.get('/', getTags);
router.get('/:id', getTag);

export default router;
