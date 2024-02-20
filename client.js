const net = require('net');
const { Console } = require('console');
const { IP, PORT, name } = require('./constants');

// establishes a connection with the game server
const connect = function () {
  const conn = net.createConnection({
    host: IP,// IP address here,
    port: PORT,// PORT number here,
  });

  //When connected to the client, log a message
  conn.on('connect', () => {
    console.log('Connected to server');
    conn.write(`Name: ${name}`);
    setTimeout(() => {
      conn.write('Move: up')
    }, 1000);
  })

  //When data is recieved, transform the data to a string
  conn.on('data', (data) => {
    console.log(data.toString());

  })
  // interpret incoming data as text
  // conn.setEncoding("utf8");

  //When the connection with the server is ended, log a disconnect message.
  conn.on('end', () => {
    console.log('Disconnecting from server.');
    process.exit();
  });

  return conn;
};

module.exports = { connect };