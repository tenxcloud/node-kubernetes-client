/**
 * test kubernetes services
 * @author huangqg
 * @date 2015-03-18
 */

var should = require('should');
var assert = require('assert');
var fs = require('fs');
var Client = require('../../../kubernetes/api');

describe('Test k8s services API', function() {
  this.timeout(5000);
  var client;
  var services = [];
  beforeEach(function() {
    client = new Client(require('./config.json').k8s);
  });

  it('should return the services list', function(done) {
    client.services.get(function (err, servicesArr) {
      if (!err) {
        console.log('services: ' + JSON.stringify(servicesArr));
        // output results
        fs.writeFile("results/services.json", JSON.stringify(servicesArr, null, 4), function(err) {
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

  it('should return the service with specified id', function(done) {
    var serviceId = services[0].id;
    client.services.get(serviceId, function (err, service) {
      if (!err) {
        console.log('services ' + JSON.stringify(service));
        // output results
        fs.writeFile("results/service.json", JSON.stringify(service, null, 4), function(err) {
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
});