'use strict';

module.exports = function(context) {
    context.params.sequelize = {
        include: [{
            association: 'Projects',
            attributes: ['id', 'name']
        }],
        raw: false
    };
    return context;
};

