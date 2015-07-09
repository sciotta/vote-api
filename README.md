# vote-api 
An in-memory and performatic vote API with Node/Express and LokiJS 

## Getting Started

#### 1. Setting Up environment

Clone this repository and install [nodeJS](http://nodejs.org/downloads/)...

> **Attention!** If you are running on Ubuntu SO, please, read [this article](http://www.hostingadvice.com/how-to/install-nodejs-ubuntu-14-04/) for clear any doubts!

...and them grunt-cli package (NPM) globally:

```
npm install -g grunt-cli
```

#### 2. Download node modules

Use this commands on upon your cloned folder:

```
npm install
```

#### You are almost ready!

Use the folowing steps to start locally, build or test your applicattion:

#### Start api server

```
npm start
```

> The server will start at http://localhost:8080. Take a look if this port not it use by other proccess.
> You can test api on [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) using the vote-api.json.postman_collection present on root of this repository.

#### Test application

Only api request tests (with Mocha, should and Supertest)

```
grunt
```

Benchmark (performance) test

```
grunt benchmark
```
> The test result will be generated at ***output_folder*** in HTML format containing a graph and information about the benchmark test. Extra configurations can to be easily do inside ***config.js*** 
