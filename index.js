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

app.get('/links', function(req, res){
    logger.info("getting list of links");
    const links = urlMapper.all();
    res.json(links);
})

app.get('/admin/:link?', function (req, res) {
    logger.info("admin " + req.url);
    const link = req.params.link;
    if(link)
    {
        // const mappedURL = urlMapper.get(link);
        // if(mappedURL)
        // {
        //     res.redirect(mappedURL);
        // }
    }
    else{
        res.sendFile(path.join(__dirname, "./public/links.html"));
    }
})

app.delete('/admin/link', function(req, res){
    console.log(req.body);
    logger.info("/admin/link " + req.body.goLink + " " + req.body.url);
    urlMapper.delete(req.body.goLink);
    res.json(req.body);
})


app.post('/admin/link', function(req, res){
    logger.info("/admin/link " + req.body.goLink + " " + req.body.url);
    urlMapper.set(req.body.goLink, req.body.url);
    res.json(req.body);
})

app.get('/:link?', function (req, res) {
    logger.info("get " + req.url);
    const link = req.params.link;
    if(urlMapper.ignoreItems.includes(link.toLowerCase()))

    if(link)
    {
        const mappedURL = urlMapper.get(link);
        if(mappedURL)
        {
            res.redirect(mappedURL);
        }
    }
})

app.listen(PORT, function(){
    logger.info('urlMapper app listening on port ' + PORT);
});