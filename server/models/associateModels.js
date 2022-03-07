'use strict';

module.exports = function (app) {

	const modelNames = ['employers', 'projects', 'tags', 'projectTag', 'myself', 'images', 'references', 'employerReferences'];

	const modelDefs = modelNames.map(name => require(`./${name}.model.js`));

	modelDefs.forEach(modelDef => modelDef.getModel(app).sync());

	modelDefs.filter(modelDef => modelDef.associateModel).forEach(modelDef => modelDef.associateModel(app));

};
