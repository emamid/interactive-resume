'use strict';

module.exports = function(context) {
    context.params.sequelize = {
        include: [{
            association: 'Employer',
            attributes: ['name']
        }, {
            association: 'Tags',
            attributes: ['name']
        }, {
            association: 'Images',
            attributes: ['filename', 'caption', 'description', 'sortOrder']
        }],
        raw: false
    };
    return context;
};
