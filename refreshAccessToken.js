const supertest = require('supertest');
var expect = require("chai").expect;
var fs = require('fs');
var access_token;
var access_token = fs.readFileSync('Accesstoken.txt', 'utf8');
var refreshTokenPayload = "grant_type=refresh_token&refresh_token="+access_token;

// Mocha describe

describe('Refresh Access Token', function () {

    // Post Report in apigee

    it('Refresh Access Token ', (done) => {
        supertest.agent("https://visa-payments-earthport-prod.login.apigee.com/oauth")
            .set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
            .post("/token")
            .set('Authorization', "Basic ZWRnZWNsaTplZGdlY2xpc2VjcmV0").send(refreshTokenPayload)
            .end(function (err, res) {
                if (err) return done(err);
                else {
                    expect(res.statusCode).to.equal(200);
                }
                done();
            });
    }).timeout(18000);
});