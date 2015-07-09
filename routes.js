'use strict';

var errors = require('./components/errors');

module.exports = function (app) {

// ROUTES FOR API
// =============================================================================
    app.use('/api/contests', require('./api/contests'));
    app.use('/api/contest', require('./api/candidates'));
    app.use('/api/votes', require('./api/votes'));
    
    app.route('/:url(api)/*').get(errors[404]);
};