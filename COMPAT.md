# Kubernetes API Compatibility Status
[Kubernetes Swagger Specification](http://kubernetes.io/third_party/swagger-ui/)

This document details the client's known compatibility with version `v1`
of the Kubernetes API endpoints. It shall be updated continuously as new
testing information is collected.

Independent testing is appreciated. If tests are performed on any API
endpoints that have not yet been verified, a pull request should be
submitted to add the test results to the appropriate table.

#### Legend
| Status | Description of status key
|:------:|:---------------------------
| OK     | Main endpoint and all tested parameters are fully functional
| PART   | Main endpoint works but some optional parameters do not
| NONE   | Main endpoint does not work
| ?      | Unknown, not yet tested


## Primary API Endpoints

|           |  Events                         | Status |
|:---------:|:--------------------------------|:------:|
| `GET`     | events                          | OK
| `GET`     | namespaces/{ns}/events          | OK
| `POST`    | namespaces/{ns}/events          | ?
| `GET`     | namespaces/{ns}/events/{name}   | OK
| `PUT`     | namespaces/{ns}/events/{name}   | ?
| `PATCH`   | namespaces/{ns}/events/{name}   | ?
| `DELETE`  | namespaces/{ns}/events/{name}   | ?


|           |  Endpoints                          | Status |
|:---------:|:------------------------------------|:------:|
| `GET`     | endpoints                           | OK
| `GET`     | namespaces/{ns}/endpoints           | OK
| `POST`    | namespaces/{ns}/endpoints           | ?
| `GET`     | namespaces/{ns}/endpoints/{name}    | OK
| `PUT`     | namespaces/{ns}/endpoints/{name}    | ?
| `PATCH`   | namespaces/{ns}/endpoints/{name}    | ?
| `DELETE`  | namespaces/{ns}/endpoints/{name}    | ?


|           |  Limit Ranges                       | Status |
|:---------:|:------------------------------------|:------:|
| `GET`     | limitranges                         | OK
| `GET`     | namespaces/{ns}/limitranges         | OK
| `POST`    | namespaces/{ns}/limitranges         | ?
| `GET`     | namespaces/{ns}/limitranges/{name}  | OK
| `PUT`     | namespaces/{ns}/limitranges/{name}  | ?
| `PATCH`   | namespaces/{ns}/limitranges/{name}  | ?
| `DELETE`  | namespaces/{ns}/limitranges/{name}  | ?


|           |  Namespaces                 | Status |
|:---------:|:----------------------------|:------:|
| `GET`     | namespaces                  | OK
| `POST`    | namespaces                  | OK
| `GET`     | namespaces/{name}           | OK
| `PUT`     | namespaces/{name}           | OK
| `PATCH`   | namespaces/{name}           | OK
| `DELETE`  | namespaces/{name}           | OK
| `PUT`     | namespaces/{name}/finalize  | ?
| `PUT`     | namespaces/{name}/status    | ?


|           |  Nodes                | Status |
|:---------:|:----------------------|:------:|
| `GET`     | nodes                 | OK
| `POST`    | nodes                 | ?
| `GET`     | nodes/{name}          | OK
| `PUT`     | nodes/{name}          | ?
| `PATCH`   | nodes/{name}          | OK
| `DELETE`  | nodes/{name}          | ?
| `PUT`     | nodes/{name}/status   | ?


|           |  Persistent Volume Claims                             | Status |
|:---------:|:------------------------------------------------------|:------:|
| `GET`     | persistentvolumeclaims                                | ?
| `GET`     | namespaces/{ns}/persistentvolumeclaims                | ?
| `POST`    | namespaces/{ns}/persistentvolumeclaims                | ?
| `GET`     | namespaces/{ns}/persistentvolumeclaims/{name}         | ?
| `PUT`     | namespaces/{ns}/persistentvolumeclaims/{name}         | ?
| `PATCH`   | namespaces/{ns}/persistentvolumeclaims/{name}         | ?
| `DELETE`  | namespaces/{ns}/persistentvolumeclaims/{name}         | ?
| `PUT`     | namespaces/{ns}/persistentvolumeclaims/{name}/status  | ?


|           |  Persistent Volumes               | Status |
|:---------:|:----------------------------------|:------:|
| `GET`     | persistentvolumes                 | ?
| `POST`    | persistentvolumes                 | ?
| `GET`     | persistentvolumes/{name}          | ?
| `PUT`     | persistentvolumes/{name}          | ?
| `PATCH`   | persistentvolumes/{name}          | ?
| `DELETE`  | persistentvolumes/{name}          | ?
| `PUT`     | persistentvolumes/{name}/status   | ?


|           |  Pod Templates                        | Status |
|:---------:|:--------------------------------------|:------:|
| `GET`     | podtemplates                          | ?
| `GET`     | namespaces/{ns}/podtemplates          | ?
| `POST`    | namespaces/{ns}/podtemplates          | ?
| `GET`     | namespaces/{ns}/podtemplates/{name}   | ?
| `PUT`     | namespaces/{ns}/podtemplates/{name}   | ?
| `PATCH`   | namespaces/{ns}/podtemplates/{name}   | ?
| `DELETE`  | namespaces/{ns}/podtemplates/{name}   | ?


|           |  Pods                                         | Status |
|:---------:|:----------------------------------------------|:------:|
| `GET`     | pods                                          | OK
| `GET`     | namespaces/{ns}/pods                          | OK
| `POST`    | namespaces/{ns}/pods                          | ?
| `GET`     | namespaces/{ns}/pods/{name}                   | OK
| `PUT`     | namespaces/{ns}/pods/{name}                   | ?
| `PATCH`   | namespaces/{ns}/pods/{name}                   | ?
| `DELETE`  | namespaces/{ns}/pods/{name}                   | ?
| `GET`     | namespaces/{ns}/pods/{name}/attach            | ?
| `POST`    | namespaces/{ns}/pods/{name}/attach            | ?
| `POST`    | namespaces/{ns}/pods/{name}/binding           | ?
| `GET`     | namespaces/{ns}/pods/{name}/exec              | ?
| `POST`    | namespaces/{ns}/pods/{name}/exec              | ?
| `GET`     | namespaces/{ns}/pods/{name}/log               | ?
| `GET`     | namespaces/{ns}/pods/{name}/portforward       | ?
| `POST`    | namespaces/{ns}/pods/{name}/portforward       | ?
| `GET`     | namespaces/{ns}/pods/{name}/proxy             | ?
| `PUT`     | namespaces/{ns}/pods/{name}/proxy             | ?
| `POST`    | namespaces/{ns}/pods/{name}/proxy             | ?
| `DELETE`  | namespaces/{ns}/pods/{name}/proxy             | ?
| `OPTIONS` | namespaces/{ns}/pods/{name}/proxy             | ?
| `HEAD`    | namespaces/{ns}/pods/{name}/proxy             | ?
| `GET`     | namespaces/{ns}/pods/{name}/proxy/{path:*}    | ?
| `PUT`     | namespaces/{ns}/pods/{name}/proxy/{path:*}    | ?
| `POST`    | namespaces/{ns}/pods/{name}/proxy/{path:*}    | ?
| `DELETE`  | namespaces/{ns}/pods/{name}/proxy/{path:*}    | ?
| `OPTIONS` | namespaces/{ns}/pods/{name}/proxy/{path:*}    | ?
| `HEAD`    | namespaces/{ns}/pods/{name}/proxy/{path:*}    | ?
| `PUT`     | namespaces/{ns}/pods/{name}/status            | ?


|           |  Replication Controllers                              | Status |
|:---------:|:------------------------------------------------------|:------:|
| `GET`     | replicationcontrollers                                | OK
| `GET`     | namespaces/{ns}/replicationcontrollers                | OK
| `POST`    | namespaces/{ns}/replicationcontrollers                | ?
| `GET`     | namespaces/{ns}/replicationcontrollers/{name}         | ?
| `PUT`     | namespaces/{ns}/replicationcontrollers/{name}         | ?
| `PATCH`   | namespaces/{ns}/replicationcontrollers/{name}         | ?
| `DELETE`  | namespaces/{ns}/replicationcontrollers/{name}         | ?
| `PUT`     | namespaces/{ns}/replicationcontrollers/{name}/status  | ?


|           |  Resource Quotas                              | Status |
|:---------:|:----------------------------------------------|:------:|
| `GET`     | resourcequotas                                | ?
| `GET`     | namespaces/{ns}/resourcequotas                | ?
| `POST`    | namespaces/{ns}/resourcequotas                | ?
| `GET`     | namespaces/{ns}/resourcequotas/{name}         | ?
| `PUT`     | namespaces/{ns}/resourcequotas/{name}         | ?
| `PATCH`   | namespaces/{ns}/resourcequotas/{name}         | ?
| `DELETE`  | namespaces/{ns}/resourcequotas/{name}         | ?
| `PUT`     | namespaces/{ns}/resourcequotas/{name}/status  | ?


|           |  Secrets                          | Status |
|:---------:|:----------------------------------|:------:|
| `GET`     | secrets                           | ?
| `GET`     | namespaces/{ns}/secrets           | ?
| `POST`    | namespaces/{ns}/secrets           | ?
| `GET`     | namespaces/{ns}/secrets/{name}    | ?
| `PUT`     | namespaces/{ns}/secrets/{name}    | ?
| `PATCH`   | namespaces/{ns}/secrets/{name}    | ?
| `DELETE`  | namespaces/{ns}/secrets/{name}    | ?


|           |  Service Accounts                         | Status |
|:---------:|:------------------------------------------|:------:|
| `GET`     | serviceaccounts                           | ?
| `GET`     | namespaces/{ns}/serviceaccounts           | ?
| `POST`    | namespaces/{ns}/serviceaccounts           | ?
| `GET`     | namespaces/{ns}/serviceaccounts/{name}    | ?
| `PUT`     | namespaces/{ns}/serviceaccounts/{name}    | ?
| `PATCH`   | namespaces/{ns}/serviceaccounts/{name}    | ?
| `DELETE`  | namespaces/{ns}/serviceaccounts/{name}    | ?


|           |  Services                         | Status |
|:---------:|:----------------------------------|:------:|
| `GET`     | services                          | OK
| `GET`     | namespaces/{ns}/services          | OK
| `POST`    | namespaces/{ns}/services          | ?
| `GET`     | namespaces/{ns}/services/{name}   | OK
| `PUT`     | namespaces/{ns}/services/{name}   | ?
| `PATCH`   | namespaces/{ns}/services/{name}   | ?
| `DELETE`  | namespaces/{ns}/services/{name}   | ?


------------------------------------------------------------------------


## Proxy API Endpoints

|           |  Proxy Nodes                  | Status |
|:---------:|:------------------------------|:------:|
| `GET`     | proxy/nodes/{name}            | ?
| `PUT`     | proxy/nodes/{name}            | ?
| `POST`    | proxy/nodes/{name}            | ?
| `DELETE`  | proxy/nodes/{name}            | ?
| `OPTIONS` | proxy/nodes/{name}            | ?
| `HEAD`    | proxy/nodes/{name}            | ?
| `GET`     | proxy/nodes/{name}/{path:*}   | ?
| `PUT`     | proxy/nodes/{name}/{path:*}   | ?
| `POST`    | proxy/nodes/{name}/{path:*}   | ?
| `DELETE`  | proxy/nodes/{name}/{path:*}   | ?
| `OPTIONS` | proxy/nodes/{name}/{path:*}   | ?
| `HEAD`    | proxy/nodes/{name}/{path:*}   | ?


|           |  Proxy Pods                                   | Status |
|:---------:|:----------------------------------------------|:------:|
| `GET`     | proxy/namespaces/{ns}/pods/{name}             | ?
| `PUT`     | proxy/namespaces/{ns}/pods/{name}             | ?
| `POST`    | proxy/namespaces/{ns}/pods/{name}             | ?
| `DELETE`  | proxy/namespaces/{ns}/pods/{name}             | ?
| `OPTIONS` | proxy/namespaces/{ns}/pods/{name}             | ?
| `HEAD`    | proxy/namespaces/{ns}/pods/{name}             | ?
| `GET`     | proxy/namespaces/{ns}/pods/{name}/{path:*}    | ?
| `PUT`     | proxy/namespaces/{ns}/pods/{name}/{path:*}    | ?
| `POST`    | proxy/namespaces/{ns}/pods/{name}/{path:*}    | ?
| `DELETE`  | proxy/namespaces/{ns}/pods/{name}/{path:*}    | ?
| `OPTIONS` | proxy/namespaces/{ns}/pods/{name}/{path:*}    | ?
| `HEAD`    | proxy/namespaces/{ns}/pods/{name}/{path:*}    | ?


|           |  Proxy Services                                   | Status |
|:---------:|:--------------------------------------------------|:------:|
| `GET`     | proxy/namespaces/{ns}/services/{name}             | ?
| `PUT`     | proxy/namespaces/{ns}/services/{name}             | ?
| `POST`    | proxy/namespaces/{ns}/services/{name}             | ?
| `DELETE`  | proxy/namespaces/{ns}/services/{name}             | ?
| `OPTIONS` | proxy/namespaces/{ns}/services/{name}             | ?
| `HEAD`    | proxy/namespaces/{ns}/services/{name}             | ?
| `GET`     | proxy/namespaces/{ns}/services/{name}/{path:*}    | ?
| `PUT`     | proxy/namespaces/{ns}/services/{name}/{path:*}    | ?
| `POST`    | proxy/namespaces/{ns}/services/{name}/{path:*}    | ?
| `DELETE`  | proxy/namespaces/{ns}/services/{name}/{path:*}    | ?
| `OPTIONS` | proxy/namespaces/{ns}/services/{name}/{path:*}    | ?
| `HEAD`    | proxy/namespaces/{ns}/services/{name}/{path:*}    | ?


------------------------------------------------------------------------


#### Watch API Endpoints

|           |  Watch Endpoints                          | Status |
|:---------:|:------------------------------------------|:------:|
| `GET`     | watch/endpoints                           | ?
| `GET`     | watch/namespaces/{ns}/endpoints           | ?
| `GET`     | watch/namespaces/{ns}/endpoints/{name}    | ?


|           |  Watch Events                         | Status |
|:---------:|:--------------------------------------|:------:|
| `GET`     | watch/events                          | ?
| `GET`     | watch/namespaces/{ns}/events          | ?
| `GET`     | watch/namespaces/{ns}/events/{name}   | ?


|           |  Watch Limit Ranges                       | Status |
|:---------:|:------------------------------------------|:------:|
| `GET`     | watch/limitranges                         | ?
| `GET`     | watch/namespaces/{ns}/limitranges         | ?
| `GET`     | watch/namespaces/{ns}/limitranges/{name}  | ?


|           |  Watch Namespaces         | Status |
|:---------:|:--------------------------|:------:|
| `GET`     | watch/namespaces          | ?
| `GET`     | watch/namespaces/{name}   | ?


|           |  Watch Nodes             | Status |
|:---------:|:----------------------|:------:|
| `GET`     | watch/nodes           | ?
| `GET`     | watch/nodes/{name}    | ?


|           |  Watch Persistent Volume Claims                       | Status |
|:---------:|:------------------------------------------------------|:------:|
| `GET`     | watch/persistentvolumeclaims                          | ?
| `GET`     | watch/namespaces/{ns}/persistentvolumeclaims          | ?
| `GET`     | watch/namespaces/{ns}/persistentvolumeclaims/{name}   | ?


|           |  Watch Persistent Volumes         | Status |
|:---------:|:----------------------------------|:------:|
| `GET`     | watch/persistentvolumes           | ?
| `GET`     | watch/persistentvolumes/{name}    | ?


|           |  Watch Pod Templates                      | Status |
|:---------:|:------------------------------------------|:------:|
| `GET`     | watch/podtemplates                        | ?
| `GET`     | watch/namespaces/{ns}/podtemplates        | ?
| `GET`     | watch/namespaces/{ns}/podtemplates/{name} | ?


|           |  Watch Pods                       | Status |
|:---------:|:----------------------------------|:------:|
| `GET`     | watch/pods                        | ?
| `GET`     | watch/namespaces/{ns}/pods        | ?
| `GET`     | watch/namespaces/{ns}/pods/{name} | ?


|           |  Watch Replication Controllers                        | Status |
|:---------:|:------------------------------------------------------|:------:|
| `GET`     | watch/replicationcontrollers                          | ?
| `GET`     | watch/namespaces/{ns}/replicationcontrollers          | ?
| `GET`     | watch/namespaces/{ns}/replicationcontrollers/{name}   | ?


|           |  Watch Resource Quotas                        | Status |
|:---------:|:----------------------------------------------|:------:|
| `GET`     | watch/resourcequotas                          | ?
| `GET`     | watch/namespaces/{ns}/resourcequotas          | ?
| `GET`     | watch/namespaces/{ns}/resourcequotas/{name}   | ?


|           |  Watch Secrets                        | Status |
|:---------:|:--------------------------------------|:------:|
| `GET`     | watch/secrets                         | ?
| `GET`     | watch/namespaces/{ns}/secrets         | ?
| `GET`     | watch/namespaces/{ns}/secrets/{name}  | ?


|           |  Watch Service Accounts                       | Status |
|:---------:|:----------------------------------------------|:------:|
| `GET`     | watch/serviceaccounts                         | ?
| `GET`     | watch/namespaces/{ns}/serviceaccounts         | ?
| `GET`     | watch/namespaces/{ns}/serviceaccounts/{name}  | ?


|           |  Watch Services                       | Status |
|:---------:|:--------------------------------------|:------:|
| `GET`     | watch/services                        | ?
| `GET`     | watch/namespaces/{ns}/services        | ?
| `GET`     | watch/namespaces/{ns}/services/{name} | ?


------------------------------------------------------------------------


|           |  Miscellaneous Endpoints                  | Status |
|:---------:|:------------------------------------------|:------:|
| `GET`     | /api/v1                                   | ?
| `POST`    | namespaces/{ns}/bindings                  | ?
| `GET`     | componentstatuses                         | ?
| `GET`     | componentstatuses/{name}                  | ?
