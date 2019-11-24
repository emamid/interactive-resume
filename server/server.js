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

function initApp() {
    app = express(feathers());
    app.use(cors({
        origin: true,
        credentials: true
    }));

    // Path to client (production build)
    app.use('/images', express.static(`${process.env.RESUME_DATA_DIR}/images`));
    app.use('/', express.static('../client/dist'));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.configure(express.rest());
    app.use(express.errorHandler());

    servicesInit(app);
    associateModels(app);
};

initApp();

app.listen(nodePort, function() {
    console.log('Server listening on ', nodePort);
});    
