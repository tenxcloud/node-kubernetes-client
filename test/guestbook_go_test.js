/**
 * test kubernetes replicationControllers
 * @author huangqg
 * @date 2051-03-18
 */


var assert = require('assert');
var fs = require('fs');
var Client = require('../../../kubernetes/api');
  var client;
  client = new Client(require('./config.json').k8s);
  console.log('creating redis-master-controller');
  client.replicationControllers.create(require('./guestbook-go/redis-master-controller.json'), function (err, replicationControllersArr) {
    if (!err) {
      console.log('replicationControllers: ' + JSON.stringify(replicationControllersArr));
      console.log("creating redis-master-service")
      client.services.create(require('./guestbook-go/redis-master-service.json'), function (err, service) {
      if (!err) {
        console.log('services ' + JSON.stringify(service));
        // output results
        fs.writeFile("results/redis-master-service.json", JSON.stringify(service, null, 4));
        console.log("creating redis-master-service")
        client.replicationControllers.create(require('./guestbook-go/redis-slave-controller.json'), function (err, replicationControllersArr) {
          if (!err) {
            client.services.create(require('./guestbook-go/redis-slave-service.json'), function (err, service) {
              if(!err) {
              client.replicationControllers.create(require('./guestbook-go/guestbook-controller.json'), function (err, replicationControllersArr) {
                if (!err) {
                  client.services.create(require('./guestbook-go/guestbook-service.json'), function (err, service) {
                    if(!err) {
                      console.log('guest book created successfully');
                      console.log('please run the following cmd to remove the previous resources');
                      console.log(" kubectl delete pod,rc,service -l servicename=guestbookwebapp");


                    } else {
                      console.log('err: ' + JSON.stringify(err));
                      throw err;
                    }
                  });
                }else {
                  throw err;
                }
              });

              } else {
                throw err;
              }
            });
          }else {
            throw err;
          }
        });
      } else {
        console.log(err);

      }
    });
    } else {
      console.log(err);

    }
  });