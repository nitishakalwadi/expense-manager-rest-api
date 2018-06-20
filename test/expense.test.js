process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('/GET expense', function(){
    it('it should GET all the expenses', function(done){
        chai.request(server)
            .get('/api/expense')
            .end(function(err, res){
                console.log(res.body);
                res.should.have.status(200);
                // res.body.should.be.a('array');
                res.body.should.have.property('success');
                res.body.success.should.equal(false);
                done();
            });
    });
});

describe('/POST expense', function(){
    it('it should save an expense', function(done){
        chai.request(server)
            .post('/api/expense/save')
            .send({
                'expenseName': 'expense2',
                'expense': 200
            })
            .end(function(err, res){
                console.log(res.body);
                res.should.have.status(200);
                done();
            });
    });
});