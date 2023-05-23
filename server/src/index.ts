import { config as dotEnvConfig } from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';

import { initialize } from '@/db';
import rest from '@/rest';

dotEnvConfig({ path: '../.env' });

const dataDir = process.env.RESUME_DATA_DIR;
const nodePort = process.env.API_PORT || 3000;

initialize(dataDir);

const app: Application = express();

app.use('/icons', express.static(`${dataDir}/icons`));
app.use('/images', express.static(`${dataDir}/images`));
app.use('/thumbnails', express.static(`${dataDir}/thumbnails`));
app.use('/react_client', express.static(process.env.REACT_CLIENT_DIR));
app.use('/svelte_client', express.static(process.env.SVELTE_CLIENT_DIR));
app.use('/vue3_client', express.static(process.env.VUE3_CLIENT_DIR));
app.use('/api/rest', rest);
app.use('/', express.static(`${dataDir}/redirect`));

app.use((error: Error, _request: Request, response: Response, next: NextFunction) => {
	console.log('error = ', error)
	if (response.headersSent) {
		return next(error);
	}
	if (error) {
		console.error(error.stack)
		response.status(500).json({
			error: JSON.stringify(error)
		})
	}
});

app.use((request, response) => {
	console.error('Invalid URL: ', request.url);
	response.status(404).json({
		url: request.url,
		originalURL : request.originalUrl
	})
})

const testDB = async() => {
	console.log('testDB');
}

testDB();

app.listen(nodePort, () => {
	console.info(`Server listening on port ${nodePort}`);
});
