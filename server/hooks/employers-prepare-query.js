'use strict';

const Sequelize = require('sequelize');

let myself;

module.exports = async function(context) {
    if (!myself) {
        const Myself = require('../models/myself.model').getModel();
        myself = await Myself.findOne();
    }
    context.params.sequelize = {
        where: {
            id: {
                [Sequelize.Op.ne]: myself.personalEmployerID
            }
        },
		order: [
			['startDate', 'DESC']
		]
    };
    return context;
};

