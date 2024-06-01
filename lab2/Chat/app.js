const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        let message_data = JSON.parse(message);
        let response = {};

        if (message_data.login) {
            ws.username = message_data.username;
            response = {
                type: 'login',
                message: `${ws.username} has joined`,
                online: clients.map(client => client.username)
            };
            clients.push(ws);
        } else if (message_data.body) {
            response = {
                type: 'chat',
                message: message_data.body,
                online: clients.map(client => client.username)
            };
        }

        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(response));
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clients = clients.filter(client => client !== ws);
        let response = {
            type: 'logout',
            message: `${ws.username} has been disconnected`,
            online: clients.map(client => client.username)
        };
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(response));
            }
        });
    });

    ws.on('error', (error) => {
        console.log('WebSocket error:', error);
    });
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8090;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
