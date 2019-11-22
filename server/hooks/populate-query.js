'use strict';

const PostGreSqlConnector = require('../db/PostGreSqlConnector');

module.exports = async function(context) {
	const { result } = context;
	console.log('calling runQuery');
	const queryResult = await PostGreSqlConnector.runQuery(result.database, result.sql, true);
	console.log(queryResult);
	context.result = {...result, ...queryResult};
	return context;
};

