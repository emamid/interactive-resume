'use strict';

module.exports = function(context) {
    context.params.sequelize = {
        include: [{
            association: 'Projects',
            include: [{
                association: 'Employer'
            }]
        }],
        raw: false
    };
    return context;
};
