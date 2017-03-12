const readline = require('readline');
const HOST = '0.0.0.0';
const PORT = 8000;
const address = `http://${HOST}:${PORT}/`;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

require('./src/rfib-socket')(HOST, PORT);
const io = require('socket.io-client');

const client = io.connect(address);

client.on('response', ({status, message}) => {
  if(status === 'denied')
    return;

  console.log('Name:', message.name);
  console.log('BirthDate:', message.birthDate);
  console.log('E-mail:', message.email);
});


(function readLine() {
  rl.question('Waiting to Scan: ', function (answer) {
    console.log(`Input entered: ${answer}`);
    client.emit('data', answer);
    readLine();
  });
})();
