/*
* Licensed Materials - Property of tenxcloud.com
* (C) Copyright 2015 TenX Cloud. All Rights Reserved.
*/
/**
 * test kubernetes minions
 * @author huangqg
 * @date 2051-03-19
 */

var should = require('should');
var assert = require('assert');
var Client = require('../index');
var fs = require('fs');

describe('Test k8s events API', function() {
  this.timeout(5000);
  var client;
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should return the events list', function(done) {
    client.events.get(function (err, events) {
      if (!err) {
        //console.log('events: ' + JSON.stringify(events));
        assert(events instanceof Array);
        // output results
        fs.writeFile("results/events.json", JSON.stringify(events, null, 4));
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
});