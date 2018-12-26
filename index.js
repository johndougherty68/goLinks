'use strict'

const express = require ('express');
const morgan = require('morgan');
const logger = require('./logger');
const urlMapper = require('./urlMapper');
const path = require("path");

const PORT = process.env.PORT || 80;

const app = express();

app.use(function (req, res, next) {
    var nodeSSPI = require('node-sspi')
    var nodeSSPIObj = new nodeSSPI({
        retrieveGroups: true
    })
    nodeSSPIObj.authenticate(req, res, function (err) {
        res.finished || next()
    })
})

app.use(function (req, res, next) {
    logger.log(req.method + " " + req.url, req.connection.user);
    var out =
        req.connection.user +
        ' (' +
        req.connection.userSid +
        ') ';
    res.set('GoLinkAdmin','true');
    next();
})

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
    logger.log("getting list of links");
    const links = urlMapper.all();
    res.json(links);
})

//get the admin page
app.get('/admin', function (req, res) {
    logger.log("admin " + req.url);
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
    logger.log("get " + link);
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
    logger.log("delete " + link, req.connection.user);
    urlMapper.delete(link);
    res.json(req.body);
})

//update or create goLink
app.post('/:link', function(req, res){
    logger.log("/link " + req.params.link + " " + req.body.url);
    urlMapper.set(req.params.link, req.body.url);
    res.json(req.body);
})

//404 (need to do it like this to use a querystring)
app.get('/404', function(req, res){
    res.sendFile(path.join(__dirname, "./public/404.html"));
})

//get the url for the given goLink 
app.get('/:link?', function (req, res) {
    logger.log("get " + req.url, req.connection.user);
    console.log(req.connection.user);
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
            res.redirect("/404?goLink=" + link);
        }}
})


app.listen(PORT, function(){
    logger.log('urlMapper app listening on port ' + PORT);
});