/*
** Users Test
*/
var chai      = require('chai');
var spies     = require('chai-spies');
chai.use(require('chai-things'));

var should    = require('chai').should();
var expect    = require('chai').expect;
var supertest = require('supertest');
var api       = supertest('http://localhost:3000');

describe('Users', function () {

  it('should return a 200 response', function (done) {
    api.get('/users')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an array of users', function (done) {
    api.get('/users')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.be.an('array');
        (res.body).should.all.have.property('id');
        (res.body).should.all.have.property('facebook_id');
        (res.body).should.all.have.property('name');
        (res.body).should.all.have.property('profile_pic');
        (res.body).should.all.have.property('created_at');
        (res.body).should.all.have.property('updated_at');
        done();
      });
  });

});