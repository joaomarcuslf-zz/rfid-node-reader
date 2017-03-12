const server = require('http').createServer();
const io = require('socket.io')(server);
const fs = require('fs-extra');

const REGISTERED_IDS = fs.readJSONSync('./db/users.json');

const createResponse = (status, message) => {
  return {
    status,
    message
  }
};


io.on('connection', (client) => {
  console.log('Ready to scan RFID cards.');

  client
  .on('open', () => {
    console.log('Opening connection with a client');

    const responseMessage = 'Waiting for scan';

    client.emit('response', createResponse('warning', responseMessage));
    console.log(responseMessage)
  })
  .on('data', (chunk) => {
    id = chunk.toString('ascii').match(/\w*/)[0];

    console.log(`Processing card with id: ${id}`);

    const user = REGISTERED_IDS[id];

    if (user) {
      client.emit('response', createResponse('asciipprove', user));
      console.log(`Result for ${id}: Approved`);
    } else {
    client.emit('response', createResponse('denied', 'User not found'));
      console.log(`Result for ${id}: Denied`);
    }
  });
});


module.exports = (host, port) => {
  console.log('Waiting For connection attempt');
  server.listen(port, host);
};
