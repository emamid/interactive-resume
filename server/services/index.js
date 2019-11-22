'use strict';

const employers = require('./employers/employers.service');
const projects = require('./projects/projects.service');
const tags = require('./tags/tags.service');

module.exports = function(app) {
	employers(app);
	projects(app);
	tags(app);
};
