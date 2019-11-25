'use strict';

module.exports = function(context) {
    context.params.sequelize = {
        include: [{
            association: 'Projects',
            attributes: ['id', 'name', 'employerID']
        }],
        raw: false
    };
    return context;
};

