var assert = require('chai').assert;

require('../lib/configure').load(require('../config'));

var models = require('../lib/models');

describe('browse.js', function() {
    var browse = require('../lib/models/browse');

    it('browseUpdated', function(done) {
        browse.browseUpdated(function(err, rows) {
            done(err);
        });
    });
});


describe('search.js', function() {
    this.timeout(40000);
    var search = require('../lib/models/search');

    it('search', function(done) {
        search(['app', 'cortex'], {
            limit: 20
        }, function(err, rows) {
            done(err);
        });
    });
});

describe('depended.js', function() {
    var depended = require('../lib/models/depended');

    it('depended', function(done) {
        depended('backbone', 0, 1000, function(err, rows) {
            assert(rows);
            done(err);
        });
    });
});

describe('package.js', function() {
    var pkg = models.package;

    it('package', function(done) {
        pkg('async', function(err, data) {
            assert(data.version);
            assert(data.dependents);
            done(err);
        });
    });
});


describe('registry.js', function() {
    var registry = require('../lib/models/registry');
    it('registry', function(done) {
        registry.info(function(err, info) {
            assert(info);
            done(err);
        });
    });
});