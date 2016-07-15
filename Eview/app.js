  var http = require('http');
  var url = require('url');
  var fs = require('fs');
 // var mongo = require("./mongo");/home/s14196to/CNSiMac/Desktop/node/Eview/app.js

 function count(){
  var i = 0;
  console.log(i);
  i = i+1;
 }



  var server = http.createServer(onRequest);
  function onRequest(req,res){
    var request = req.url;
    var recon = request.split(".");
    var show = recon[0];
    count();
    console.log(req.url);
    var acrion = request.parse;
    if(req == null){
    res.writeHead(404,{"Content-Type":"text/plain"});
    console.log("error");
    res.end("error 404:Not Found");
    return;
    }

    if(req.url == "/"){
      fs.readFile('./test.html','UTF-8',function(err,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        res.end();
      });
    }

    else if(req.url == "/css/base"){
      fs.readFile('./css/base.css','UTF-8',function(err,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        res.end();
      });
    }


    
    else if(req.url == "/css/base.css"){
      fs.readFile('./css/base.css','UTF-8',function(err,data){
        console.log("Anny");
        res.writeHead(200,{'Content-Type':'text/css'});
        res.write(data);
        res.end();
      });
    }


    else if(req.url == "/css/style.css"){
      fs.readFile('./css/style.css','UTF-8',function(err,data){
        console.log("Anny");
        res.writeHead(200,{'Content-Type':'text/css'});
        res.write(data);
        res.end();
      });
    }

    else if(req.url == "/js/main.js"){
    res.writeHead(200,{"Content-Type":"text/java"});
    var script = fs.readFileSync('./js/main.js');
    res.write(script);
    res.end();
    return;
    }

    else if(req.url == "/img/img_01.png"){
    res.writeHead(200,{"Content-Type":"image/png"});
    console.log("Anny");
    var img = fs.readFileSync('./img/img_01.png');
    res.write(img);
    res.end();
    return;
    }
    else if(req.url == "/img/01.jpg"){
    res.writeHead(200,{"Content-Type":"image/jpeg"});
    console.log("Anny");
    var img = fs.readFileSync('./img/01.jpg');
    res.write(img);
    res.end();
    return;
    }
    else if(req.url == "/img/img01.jpg"){
    res.writeHead(200,{"Content-Type":"image/jpeg"});
    console.log("Anny2");
    var img = fs.readFileSync('./img/img01.jpg');
    res.write(img);
    res.end();
    return;
    }
    else if(req.url == "/img/img_logo_2.svg"){
    res.writeHead(200,{"Content-Type":"image/jpeg"});
    console.log("Anny");
    var img = fs.readFileSync('./img/img_logo_2.svg');
    res.write(img);
    res.end();
    return;
    }
    else{
      console.log("Zhesicha");
    }

  }
  var PORT = 8080;
  var ADDRESS = "localhost";
  server.listen(PORT,ADDRESS);
  console.log("server running at http://"+ADDRESS+":"+PORT);
