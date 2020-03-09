exports.libpath = libpath = '/usr/local/lib/node_modules/';
const http = require('http');
const URL = require('url');
const querystring = require('querystring');

exports.app = app = {};

var server = http.createServer(function (req, res) {
        var body = "";
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Origin", "*");

            body = querystring.parse(body);
            // console.log("body:", body);
            req.ubibody = body;

            var url = URL.parse(req.url, true);
            // console.log(url);
            req.ubiurl = url;

            if (app[url.pathname]) {
                var ret = app[url.pathname](req, res);
				if(ret != 'wait'){
					res.write(JSON.stringify(ret));
					res.end();
				}
            } else {
                res.write(JSON.stringify({
                        code: 404
                    }));
				res.end();
            }
            
        });
    }).listen(8080);

app['/getnodetime'] = function (req, res) {
    var nowtime = (new Date()).getTime();
    return {
        "timestamp": nowtime
    };
};
