'use strict';

module.exports = function(context) {
    context.params.sequelize = {
        include: [{
            association: 'Projects'
        }],
        raw: false
    };
    return context;
};

