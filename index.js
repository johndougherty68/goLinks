const express = require ('express');
const morgan = require('morgan');
const logger = require('./logger');
const urlMapper = require('./urlMapper');
const path = require("path");

const PORT = process.env.PORT || 80;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: logger.stream
}));

//favicon
app.get('/favicon.ico', function(req, res){
    res.sendFile(path.join(__dirname, "./public/favicon.ico"));
})

//get the whole list of links
app.get('/links', function(req, res){
    logger.info("getting list of links");
    const links = urlMapper.all();
    res.json(links);
})

//get the admin page
app.get('/admin', function (req, res) {
    logger.info("admin " + req.url);
    const link = req.params.link;
    res.sendFile(path.join(__dirname, "./public/links.html"));
})

//get things prefaced by "assets/"
//we need to do this, otherwise everything will be assumed to be a GoLink
app.get('/assets/:item',function(req, res){
    const item = req.params.item;
    res.sendFile(path.join(__dirname, "./public/" + item));
})

//get a specific GoLink (not the same as /link, which redirects to the mapped url)
app.get('/admin/:link',function(req, res){
    var link = req.params.link;
    console.log("link " + link);
    logger.info("get " + link);
    const mappedURL = urlMapper.get(link);
    if(mappedURL){
        res.json({'result':mappedURL});
    }
    else{
        res.json({'result':'noexist'});
    }
})

//delete the given goLink
app.delete('/:link', function(req, res){
    var link = req.params.link;
    logger.info("delete " + link );
    urlMapper.delete(link);
    res.json(req.body);
})

//update or create goLink
app.post('/:link', function(req, res){
    logger.info("/link " + req.params.link + " " + req.body.url);
    urlMapper.set(req.params.link, req.body.url);
    res.json(req.body);
})

//404 (need to do it like this to use a querystring)
app.get('/404', function(req, res){
    res.sendFile(path.join(__dirname, "./public/404.html"));
})

//get the url for the given goLink 
app.get('/:link?', function (req, res) {
    logger.info("get " + req.url);
    const link = req.params.link;
//    if(urlMapper.ignoreItems.includes(link.toLowerCase()))

    if(link)
    {
        console.log(link);
        const mappedURL = urlMapper.get(link);
        if(mappedURL)
        {
            res.redirect(mappedURL);
        }
        else
        {
            console.log("404");
            res.redirect("/404?goLink=" + link);
        }}
})


app.listen(PORT, function(){
    logger.info('urlMapper app listening on port ' + PORT);
});