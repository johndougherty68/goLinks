var assert = require('assert');
var urlMapper = require('../urlMapper')

describe('Set test 1', function () {
    it('should accept a simple value and return it', function () {
        urlMapper.set("gaf","http://www.gaf.com");
        var res = urlMapper.get("gaf");
        assert.equal(res, "http://www.gaf.com");
    });
    it('should accept an existing value ', function () {
        urlMapper.set("gafNew","http://www.gaf.com");
        var res = urlMapper.get("gafNew");
        assert.equal(res, "http://www.gaf.com");

        urlMapper.set("gafNew","http://www.cnn.com");
        var res = urlMapper.get("gafNew");
        assert.equal(res, "http://www.cnn.com");
    });
    it('should return a value without having just set it', function () {
        var res = urlMapper.get("gaf");
        assert.equal(res, "http://www.gaf.com");
    });
    it('should know if a value exists', function () {
        var res = urlMapper.exists("gaf");
        assert.equal(res, true);
    });
    it('should know if a value does not exist', function () {
        var res = urlMapper.exists("gafDoesNotExist");
        assert.equal(res, false);
    });
    it('should delete a value', function () {
        urlMapper.set("gafToBeDeleted","http://www.xkcd.com");
        var res = urlMapper.get("gafToBeDeleted");
        assert.equal(res, "http://www.xkcd.com");
        urlMapper.delete("gafToBeDeleted");
        var res = urlMapper.get("gafToBeDeleted");
        assert.equal(res, undefined);       
    });
    it('should return all values', function () {
        var res = urlMapper.all();
        var cn = 0;
        for(var key in res){
            if(res.hasOwnProperty(key)){
                cn++;
            }
        }
        assert.equal(cn>1,true);
    });
});
