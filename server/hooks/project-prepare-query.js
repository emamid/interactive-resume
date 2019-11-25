'use strict';

module.exports = function(context) {
    context.params.sequelize = {
        include: [{
            association: 'Employer'
        }, {
            association: 'Tags'
        }],
        raw: false
    };
    return context;
};
