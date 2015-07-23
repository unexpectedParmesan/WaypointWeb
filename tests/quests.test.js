/*
** Quests Test
*/
var should    = require('chai').should();
var expect    = require('chai').expect();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000');

describe('Quests', function () {
  it('should return a 200 response', function (done) {
    api.get('/quests')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});