'use strict';

const userHelper = require('../lib/util/user-helper');

const express = require('express');
const tweetsRoutes = express.Router();

module.exports = function(DataHelpers) {
  tweetsRoutes.get('/', function(req, res) {
    // console.log('inside get route');
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post('/', function(req, res) {
    // console.log(req.body);
    if (!req.body.text) {
      // console.log('this log');
      res.status(400).json({ error: 'invalid request: no data in POST body' });
      return;
    }

    const user = req.body.user
      ? req.body.user
      : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };
    // console.log('what is tweet', tweet);
    DataHelpers.saveTweet(tweet, err => {
      // console.log(err);
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send(tweet);
      }
    });
  });

  return tweetsRoutes;
};
