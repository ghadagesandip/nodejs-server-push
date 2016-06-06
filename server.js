var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
   // parser = new require('xml2json'),
    jf = require('jsonfile'),
    fs = require('fs'),
    soc = null;

// creating the server ( localhost:8000 )
app.listen(8000);

console.log('server listening on localhost:8000');

// on server started we can load our client.html page
function handler(req, res) {
    fs.readFile(__dirname + '/client.html', function(err, data) {
        if (err) {
            console.log(err);
            res.writeHead(500);
            return res.end('Error loading client.html');
        }
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(200);
        res.end(data);
    });
}


fs.watchFile(__dirname + '/sample.json', function(event, fileName) { //watching my        sports.json file for any changes
    //NOTE: fs.watch returns event twice on detecting change due to reason that editors fire 2 events --- there are workarounds for this on stackoverflow
    console.log("File changed");

    jf.readFile(__dirname + '/sample.json', function(err, data) { //if change detected read the sports.json
        console.log('File read');
        var data = data; //store in a var
        console.log('sent') //just for debugging
        if(typeof soc !== "undefined" && soc !== null) {
            soc.volatile.emit('notification', data); //emit to all clients
        }
    });

});

io.sockets.on('connection', function(socket) {
    console.log(__dirname);
    soc = socket;
    console.log('Socket assigned');
});