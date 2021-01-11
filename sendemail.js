const supertest = require('supertest');
var expect = require("chai").expect;
var fs = require('fs');
var input101 = fs.readFileSync('mynewfile1.html', 'utf8');

//#region Send Email Describe
describe('Email Sending Job', function () {
  
    it('Send Email ', (done) => {
        supertest.agent("https://earthport-test-dev.apigee.net/v1/analytics/")
            .set('Content-Type', 'text/html')
            .post("/sendMail")
            .send(input101)
            .end(function (err, res) {
                if (err) return done(err);
                else {
                    expect(res.statusCode).to.equal(200);
					var today = new Date();
					var log="Mail Send Successfully";
					var msg_log=today+log;
					test_log(msg_log);
                }
                done();
            });
    }).timeout(18000);

});
//#endregion

function test_log(msg){
    fs.appendFile('log.txt', msg, function(err) {
        if (err) {
           return console.error(err);
        }
     });
}