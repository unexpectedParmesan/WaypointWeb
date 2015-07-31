/*
** Quests Tests
*/

var chai      = require('chai');
var spies     = require('chai-spies');
chai.use(require('chai-things'));

var should    = require('chai').should();
var expect    = require('chai').expect;
var supertest = require('supertest');
var api       = supertest('http://localhost:3000');

describe('GET /quests', function () {
  var rand, title, questId;

  it('should return a 200 response', function (done) {
    api.get('/quests')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an array of quests', function (done) {
    api.get('/quests')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.be.an('array');
        (res.body).should.all.have.property('id');
        (res.body).should.all.have.property('creator_facebook_id');
        (res.body).should.all.have.property('title');
        (res.body).should.all.have.property('length');
        (res.body).should.all.have.property('description');
        (res.body).should.all.have.property('estimated_time');
        (res.body).should.all.have.property('length');
        (res.body).should.all.have.property('waypoints');
        (res.body).should.all.have.property('created_at');
        (res.body).should.all.have.property('updated_at');
        done();
      });
  });

  beforeEach(function (){
    rand = Math.floor(Math.random() * 100);
    title = "Quest Random Number: " + rand.toString();
  });

  it('should be updated with a new quest', function (done) {

    api.post('/quests')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        facebookId: '1',
        title: title,
        description: 'Quest description',
        estimatedTime: '3 hours'
      })
      .expect(200)
      .end(function (err, res) {

        questId = res.body.id;

        expect(res.body.title).to.equal(title);
        expect(res.body.description).to.equal('Quest description');
        expect(res.body.estimated_time).to.equal('3 hours');
        expect(res.body.creator_facebook_id).to.equal('1');
        done();
      });
  });

  it('should be able to delete a quest', function (done) {

    api.delete('/quests/' + questId)
      .set('Accept', 'application/x-www-form-urlencoded')
      .send()
      .expect(200)
      .end(function (err, res) {

        api.get('/quests/' + questId)
          .set('Accept', 'application/x-www-form-urlencoded')
          .expect(404)
          .end(function (err, res){});
        done();
      });
  });
});
