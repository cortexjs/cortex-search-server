var request = require('supertest'),
    assert = require('chai').assert,
    app = require('../lib')(require('../config'));

describe('rest.js', function() {
    app = app.listen();

    describe('browse', function() {
        it('browseUpdated', function(done) {
            request(app)
                .get('/-/browse/updated')
                .expect(200, function(err, res) {
                    if(res)
                        console.log(res.body);
                    done(err);
                });
        });
    });

    describe('package', function() {

        it('package missing', function(done) {
            request(app)
                .get('/-/package/nopackage')
                .expect(404, function(err, res) {
                    done(err);
                });
        });

        it('version missing', function(done) {
            request(app)
                .get('/-/package/align/a3.f22.3')
                .expect(400, done);
        });

        it('with version', function(done) {
            request(app)
                .get('/-/package/align/1.0.0')
                .expect(200, function(err, res) {
                    assert.equal(res.body.version, "1.0.0");
                    done(err);
                });
        });

        it('with name', function(done) {
            request(app)
                .get('/-/package/cortex')
                .expect('Content-Type', /json/)
                .expect(200, function(err, res) {
                    assert.equal(res.body.name, "cortex");
                    assert(res.body.versions);
                    done(err);
                });
        });
    });

    describe('search', function() {
        it('with keyword', function(done) {
            request(app)
                .get('/-/search?keyword=web&limit=20')
                .expect('Content-Type', /json/)
                .expect(200, function(err, res) {
                    assert(res.body && res.body.length);
                    done(err);
                });

        });

        it('with author', function(done) {
            request(app)
                .get('/-/search?author=cortex-admin&skip=1&limit=10')
                .expect('Content-Type', /json/)
                .expect(200, function(err, res) {
                    assert(res && res.body && res.body.length);
                    assert.equal(res.body.length, 10);
                    done(err);
                });
        });

        it('with name', function(done) {
            request(app)
                .get('/-/search?name=backbone&limit=20')
                .expect(200, function(err, res) {
                    assert(res.body);
                    assert.equal(res.body.length, 1);
                    done(err);
                });
        });

        it('with q', function(done) {
            request(app)
                .get('/-/search?q=app+cortex&limit=30')
                .expect('Content-Type', /json/)
                .expect(200, function(err, res) {
                    done(err);
                });
        });

        it('with mix', function(done) {
            request(app)
                .get('/-/search?name=backbone&keyword=web&limit=10')
                .expect(200, function(err, res) {
                    assert(res.body.length);
                    done(err);
                });
        });
    });


    it('index', function(done) {
        request(app)
            .get('/-')
            .expect(404, function(err) {
                done(err);
            });
    });

});