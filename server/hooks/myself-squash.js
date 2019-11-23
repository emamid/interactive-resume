'use strict';

module.exports = function(context) {
    context.result = context.result[0] || {};
    return context;
};

