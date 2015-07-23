/*
** Users Test
*/
var should    = require('chai').should();
var expect    = require('chai').expect();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000');

describe('Users', function () {

  it('should return a 200 response', function (done) {
    api.get('/users')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an array of objects', function (done) {
    api.get('/users')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.not.equal(null);
        expect(res.body).to.have.property('facebook_id');
        expect(res.body.facebook_id).to.not.equal(null);
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.not.equal(null);
        expect(res.body).to.have.property('profile_pic');
        expect(res.body.profile_pic).to.not.equal(null);
        expect(res.body).to.have.property('created_at');
        expect(res.body.created_at).to.not.equal(null);
        expect(res.body).to.have.property('updated_at');
        expect(res.body.updated_at).to.not.equal(null);
        done();
      });
  });

});