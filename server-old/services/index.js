'use strict';

const employers = require('./employers/employers.service');
const myself = require('./myself/myself.service');
const projects = require('./projects/projects.service');
const projectTags = require('./projectTags/projectTags.service');
const tags = require('./tags/tags.service');

module.exports = function (app) {
	employers(app);
	myself(app);
	projects(app);
	projectTags(app);
	tags(app);
};
