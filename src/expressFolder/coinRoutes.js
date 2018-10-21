var express = require('express');
var app = express();
var coinRoutes = express.Router();

var Coin = require('../models/Coin');

coinRoutes.route('/add').post(function(req, res) {
    var coin = new Coin(req.body);
    console.log("coin ", coin);
    coin.save().then(item => {
        res.status(200).json({'coin': 'Coin added sucessfully'});
    }).catch(err => res.status(400).send('unable to save to database'));
});

coinRoutes.route('/').get(function(req, res) {
    Coin.find(function (err, coins) {
        if (err) {
            console.log(err);
        } else {
            res.json(coins);
        }
    });
});

coinRoutes.route('/edit/:id').get(function (req, res) {
    var id = req.params.id;
    Coin.findById(id, function (err, coin) {
        res.json(coin);
    });
});

coinRoutes.route('/update/:id').post(function (req, res) {
    Coin.findById(req.params.id, function (err, coin) {
        if (!coin) {
            console.log('Could not load the Document');
        } else {
            coin.name = req.body.name;
            coin.price = req.body.price;
            
            coin.save().then(coin => {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send('unable to update the database');
            })
        }
    })
});

coinRoutes.route('/delete/:id').post(function (req, res) {
    Coin.findByIdAndRemove({_id: req.params.id}, function (err, coin) {
        if (err) {
            res.json(err);
        } else {
            res.json('Sucessfully removed');
        }
    });
});

module.exports = coinRoutes;