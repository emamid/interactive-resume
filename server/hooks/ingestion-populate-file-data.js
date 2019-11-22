'use strict';

const klaw = require('klaw');

const config = require('../config');

module.exports = function(context) {
	return new Promise(function(resolve, reject) {
		let ingestionID = context.result.id;
		const rootPath = config.paths.ingestionFiles;
		let path = `${rootPath}/${ingestionID}`;

		console.log('ingestion-populate-file-data ingestionID=', ingestionID);
		console.log('path=', path);
		context.result.fileErrors = false;
		let fileCount = 0;
		let folderCount = 0;
		let totalFileSize = 0;		

		klaw(path)
			.on('data', item => {
				if (item.stats.isDirectory()) {
					folderCount++;
				} else {
					fileCount++;
					totalFileSize += item.stats.size;	
				}
			})
			.on('end', () => {
				context.result.fileCount = fileCount;
				context.result.folderCount = folderCount;
				context.result.totalFileSize = totalFileSize;
				resolve(context);
			})
			.on('error', () => {
				context.result.fileCount = fileCount;
				context.result.folderCount = folderCount;
				context.result.totalFileSize = totalFileSize;
				context.result.fileErrors = true;
				resolve(context);
			});
	});
};

