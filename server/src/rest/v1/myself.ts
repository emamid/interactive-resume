import { Router } from 'express';
import type { Request, Response } from 'express';

import { getOnly } from '@/db/queries/Myself';

const getMyself = async(_request: Request, response: Response) => {
	const myself = await getOnly();
	return response.json(myself);
}

const router = Router();
router.get('/', getMyself);

export default router;
