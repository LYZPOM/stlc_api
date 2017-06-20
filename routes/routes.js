const path = require('path');
const fs = require('fs');

var appRouter = function(app) {

  app.get("/v2/index", function(req, res) {
    logRequest(req);
    const fileLoc = path.join(__dirname,"data/index.json");
    const stream = fs.createReadStream(fileLoc);
    addStdErrorHandling(stream,res);
    stream.pipe(res);
  });
}

function addStdErrorHandling(stream,res){
  stream.on('error',function(error){
    res.writeHead(404,'Not Found');
    res.end();
  });
}

function logRequest(req){
  console.log( " Request received " + reqToString(req));
}

function reqToString(req){
 return `url:${req.url}`;
}

module.exports = appRouter;
