var supertest = require("supertest");
var should = require("should");
var config = require('./config/test-config.json');

// This agent refers to PORT where program is runninng.
var server = supertest.agent(config.development.baseUrl);

// UNIT test begin
describe("URL Test suite",function(){

    it("should get status 200 for home url",function(done){
        // calling home page
        server
        .get("/")
        .expect("Content-type",/html/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
            // log the error if present
            if(err) console.log(err);
            done();
        });
    });
    
    it("should get status 404 for invalid url",function(done){
        // calling invalid URL
        server
        .get("/INVALID_URL")
        .expect("Content-type",/html/)
        .expect(404) // THis is HTTP response
        .end(function(err,res){
            // log error if present
            if(err) console.log(err);
            done();
        });
    });
});

describe("API Test suite for valid responses",function(){
    
    it("should return 1 objects in JSON response",function(done){        
                  
        // calling api results
        server
        .get("/api/1")
        .expect("Content-type",/json/)
        .end(function(err,res){
            if(err) throw err;
            //json status shoulbe be 200
            res.body.status.should.equal(200);
            // length of json object should be equal to the api request param.
            res.body.data.length.should.equal(1);
            done();
        });               
    });
    
    it("should return 2 objects in JSON response",function(done){        
                  
        // calling api results
        server
        .get("/api/2")
        .expect("Content-type",/json/)
        .end(function(err,res){
            if(err) throw err;
            //json status shoulbe be 200
            res.body.status.should.equal(200);
            // length of json object should be equal to the api request param.
            res.body.data.length.should.equal(2);
            done();
        });               
    });
    
    it("should return 3 objects in JSON response",function(done){        
                  
        // calling api results
        server
        .get("/api/3")
        .expect("Content-type",/json/)
        .end(function(err,res){
            if(err) throw err;
            //json status shoulbe be 200
            res.body.status.should.equal(200);
            // length of json object should be equal to the api request param.
            res.body.data.length.should.equal(3);
            done();
        });               
    });
});

describe("API Test suite for invalid responses",function(){
    
    it("should error JSON for /api/0 route",function(done){        
        
        // calling api results
        server
        .get("/api/0")
        .expect("Content-type",/json/)
        .end(function(err,res){
            if(err) throw err;
            //json status shoulbe be 500
            res.body.status.should.equal(500);                
            done();
        });           
    });
    
    it("should error JSON for negative values in api route. example /api/-1",function(done){        
        
        // calling api results
        server
        .get("/api/-1")
        .expect("Content-type",/json/)
        .end(function(err,res){
            if(err) throw err;
            //json status shoulbe be 500
            res.body.status.should.equal(500);                
            done();
        });           
    });
    
    it("should error JSON for non-integer values in api route. example /api/abc",function(done){        
        
        // calling api results
        server
        .get("/api/abc")
        .expect("Content-type",/json/)
        .end(function(err,res){
            if(err) throw err;
            //json status shoulbe be 500
            res.body.status.should.equal(500);                
            done();
        });           
    });
});