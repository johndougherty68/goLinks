var assert = require('assert');
var urlMapper = require('../urlMapper')
var axios = require('axios');
var baseURL = "http://localhost/";

describe.skip('API tests', function () {
    it('should return a value without having just set it', function () {
        var goLink = "gaf";
        var mappedURL = "http://www.app.com";
        var url = baseURL + "admin/" + goLink;
        axios.get(url)
            .then(function(response){
                var result = response.data;
                assert.equal(result, mappedURL);
            })                
    });

    it('should accept a simple value and return it', function () {
        var goLink = "gaf";
        var mappedURL = "http://www.app.com";
        var data = {'url':mappedURL};
        axios.post(baseURL + goLink,data)
            .then(function(response){
                var url = baseURL + "admin/" + goLink;
                axios.get(url)
                    .then(function(response){
                        var result = response.data;
                        assert.equal(result, mappedURL);
                    })                
            })
    });
    it('should accept an existing value ', function () {
        urlMapper.set("gaf","http://www.app.com");
        var res = urlMapper.get("gaf");
        assert.equal(res, "http://www.app.com");
        var goLink = "gaf";
        var mappedURL = "http://www.app.com";
        var data = {'url':mappedURL};
        axios.post(baseURL + goLink,data)
            .then(function(response){
                var url = baseURL + "admin/" + goLink;
                axios.get(url)
                    .then(function(response){
                        var result = response.data;
                        assert.equal(result, mappedURL);
                    })                
            })
    });
    
//    });
    // it('should know if a value exists', function () {
    //     var res = urlMapper.exists("gaf");
    //     assert.equal(res, true);
    // });
    // it('should know if a value does not exist', function () {
    //     var res = urlMapper.exists("gafDoesNotExist");
    //     assert.equal(res, false);
    // });
    // it('should delete a value', function () {
    //     urlMapper.set("gafToBeDeleted","http://www.xkcd.com");
    //     var res = urlMapper.get("gafToBeDeleted");
    //     assert.equal(res, "http://www.xkcd.com");
    //     urlMapper.delete("gafToBeDeleted");
    //     var res = urlMapper.get("gafToBeDeleted");
    //     assert.equal(res, undefined);       
    // });
    // it('should return all values', function () {
    //     var res = urlMapper.all();
    //     var cn = 0;
    //     for(var key in res){
    //         if(res.hasOwnProperty(key)){
    //             cn++;
    //         }
    //     }
    //     assert.equal(cn>1,true);
    // });
});
