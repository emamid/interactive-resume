'use strict';

// Express/Node
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// FeathersJS
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');

const servicesInit = require('./services');
const associateModels = require('./models/associateModels');

const nodePort = 3000;

let app = null;

const fs = require('fs');

function initApp() {
    app = express(feathers());
	app.all('*', (request, response, next) => {
		console.log(`Request ${request.method} ${request.path}\n`);
        fs.appendFile('log.txt', `Request ${request.method} ${request.path}\n`, function (err) {
			if (err) throw err;
        });
		if (next) {
			next();
		}
	});
    app.use(cors({
        origin: true,
        credentials: true
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.configure(express.rest());
    app.use(express.errorHandler());

    servicesInit(app);
    associateModels(app);

    // Path to client (production build)
    app.use('/images', express.static(`${process.env.RESUME_DATA_DIR}/images`));
    app.use('/thumbnails', express.static(`${process.env.RESUME_DATA_DIR}/thumbnails`));    
    app.use('/', express.static('../client/build'));
};

initApp();

app.listen(nodePort, function() {
    console.log('Server listening on ', nodePort);
});    
