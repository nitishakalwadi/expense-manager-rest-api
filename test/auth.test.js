process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('/POST auth - success', function(){
    it('it should create new user', function(done){
        chai.request(server)
            .post('/api/auth/signup')
            .send({
                'username': 'nitish.nitish.nitish',
                'password': 'nitish'
            })
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                res.body.should.have.property('data');
                res.body.data.should.have.property('token');
                res.body.data.token.should.not.be.empty;
                done();
            });
    });
});

describe('/POST auth - failure', function(){
    it('it should not create new user', function(done){
        chai.request(server)
            .post('/api/auth/signup')
            .send({
                'username': 'nitish.nitish.nitish',
                'password': 'nitish'
            })
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.equal(false);
                res.body.should.have.property('error');
                done();
            });
    });
});
