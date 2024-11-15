const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');
    const pcmFilePath = path.resolve(__dirname, 'example.pcm'); // Replace with your PCM file
    const pcmStream = fs.createReadStream(pcmFilePath);

    pcmStream.on('data', (chunk) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(chunk);
        }
    });

    pcmStream.on('end', () => {
        ws.close();
    });
});
