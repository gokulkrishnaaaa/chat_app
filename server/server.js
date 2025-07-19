const WebSocket = require('ws');
const wss = new WebSocket.Server({ port:8080});

console.log('WebSocket server started...');

wss.on('connection', function(ws){
    console.log("Client Connected")

    ws.on('message', function incoming(message){
            
        wss.clients.forEach(function each(client){
            if(client!= ws && client.readyState === WebSocket.OPEN){
                client.send(message)
            }
        });
    });

    ws.on('close', ()=>{
        console.log('Client Disconnected')
    });
});