//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var port = 3000;
var comments = [];
var server = http.createServer(function (req, res) {
    var parseObj = url.parse(req.url, true);
    var pathname = parseObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        })
    } else if (pathname === '/post') {
        var comment = parseObj.query;
        comment.dateTime = '2019-9-16';
        comments.unshift(comment);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else if (pathname === '/comments') {
        var str = JSON.stringify(comments);
        res.end(str);
    }
});