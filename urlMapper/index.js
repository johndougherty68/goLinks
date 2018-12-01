// this will provide CRUD operations on the url mapper data store.
// v 1.0 using data-store
const Store = require('data-store');
const store = new Store({ path: 'urls.json' });
const logger = require('../logger');

var urlMapper = {
    ignoreItems:["favicon.ico"],
    all: function(){
        try{
            const res = [];
            logger.info("Getting all links");
            const items = JSON.parse(store.json(null, 2));
            for(var key in items){
                if(items.hasOwnProperty(key)){
                    res.push({'golink':key, 'url':items[key]});
                }
            }
            return res;
        }
        catch(err){
            logger.error(err.message);
        }
    },
    get: function(goLink){
        try{
            logger.info("Getting " + goLink);
            const res = store.get(goLink.toLowerCase());
            logger.info("Returning " + res);
            return res;   
        }
        catch(err){
            logger.error(err.message);
        }
    },

    set: function(goLink,url){
        try{
            logger.info("Setting " + goLink + " to " + url);
            store.set(goLink.toLowerCase(),url);
            return store.get(goLink.toLowerCase());   
        }
        catch(err){
            logger.error(err.message);
        }
    },

    delete: function(goLink){
        try{
            logger.info("Deleting " + goLink);
            goLink = goLink.toLowerCase();
            var res = this.get(goLink);
            store.del(goLink);
            return res;
        }
        catch(err){
            logger.error(err.message);
        }
    },

    exists: function(goLink){
        try{
            logger.info("Checking existence of " + goLink);
            return store.has(goLink);
        }
        catch(err){
            logger.error(err.message);
        }
    }
}

module.exports = urlMapper;