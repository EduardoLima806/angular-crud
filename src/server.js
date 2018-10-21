var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/app.settings');
    coinRoutes = require('./expressFolder/coinRoutes');

    mongoose.Promise  = global.Promise;
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
        () => { console.log('Database is connected') },
        err => { console.log('Can not connect to the database'+ err) }
    );

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    const port = process.env.PORT || 4000;

    console.log(bodyParser.json());

    app.use('/coins', coinRoutes);

    const server = app.listen(port, function(){
        console.log('Listening on port ' + port);
    });