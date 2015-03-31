/*
* Licensed Materials - Property of tenxcloud.com
* (C) Copyright 2015 TenX Cloud. All Rights Reserved.
*/
/**
 * test kubernetes minions
 * @author huangqg
 * @date 2015-03-19
 */

var should = require('should');
var assert = require('assert');
var Client = require('../../../kubernetes/api');
var fs = require('fs');

describe('Test k8s namespaces API', function() {
  this.timeout(5000);
  var client;
  var items = [];
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should return the namespaces list', function(done) {
    client.namespaces.get(function (err, namespaces) {
      if (!err) {
        console.log('namespaces: ' + JSON.stringify(namespaces));
        assert(namespaces instanceof Array);
        items = namespaces[0].items;
        // output results
        fs.writeFile("results/namespaces.json", JSON.stringify(namespaces, null, 4), function(err) {
          if(err) {
            console.log(err);
          }
          console.log("The file was saved!");
          done();
        });
      } else {
        console.log(err);
        assert(false);
      }
    });
  });

  it('should return the namespace with specified id', function(done) {
    var nsId = items[0].id;
    client.namespaces.get(nsId, function (err, namespace) {
      if (!err) {
        console.log('namespace ' + JSON.stringify(namespace));
        // output results
        fs.writeFile("results/namespace.json", JSON.stringify(namespace, null, 4), function(err) {
          if(err) {
            console.log(err);
          }
          console.log("The file was saved!");
          done();
        });
      } else {
        console.log(err);
        assert(false);
      }
    });
  });

  it('should delete the namespace with specified id', function(done) {
    var nsId = items[2].id;
    client.namespaces.delete(nsId, function (err, namespace) {
      if (!err) {
        console.log('namespace ' + JSON.stringify(namespace));
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });

  it('should create a namespace', function(done) {
    client.namespaces.create(require('./json/namespace.json'), function (err, namespace) {
      if (!err) {
        console.log('namespace created successfully /r' + JSON.stringify(namespace));
        done();
      } else {
        console.log(err);
        assert(false);
      }
    });
  });
});