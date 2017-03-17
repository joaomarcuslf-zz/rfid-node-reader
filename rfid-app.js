const { createServer } = require('http');
const { readFile } = require('fs');
const PORT = 3000;
const IP_BIND = '0.0.0.0';
require('./src/rfid-socket')(IP_BIND, 8000);

const server = createServer((request, response) => {
    let filePath = './public/index.html';
    let contentType = 'text/html';

    readFile(filePath, function (error, content) {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
    });
});

server.listen(PORT, IP_BIND, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    let appUrl = `http://${IP_BIND}:${PORT}`;
    console.log('Server running on', appUrl);
});
