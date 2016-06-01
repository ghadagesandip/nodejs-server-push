jQuery(function($){
    socket = new io.Socket('localhost:8888');
    socket.connect();
    socket.on('message', function(data){
        document.getElementById('data').innerHTML = data;
    });
});