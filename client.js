const { Console } = require('console');
const net = require('net');


// establishes a connection with the game server
const connect = function () {
  const conn = net.createConnection({
    host: 'localhost',// IP address here,
    port: 50541,// PORT number here,
  });

  //When connected to the client, log a message
  conn.on('connect', () => {
    console.log('Connected to server');
    conn.write("Name: JEP")
    setTimeout(()=> {
      conn.write('Move: up')
    }, 1000)
    
    
  })

  //When data is recieved, transform the data to a string
  conn.on('data', (data) => {
    console.log(data.toString());
    
  })
  // interpret incoming data as text
  // conn.setEncoding("utf8");

  //When the connection with the server is ended, log a disconnect message.
  conn.on('end', () => {
    console.log('Disconnected from server');
  })
  
  return conn;
};

const setupInput = function () {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  stdin.on("data", handleUserInput);
  return stdin;
};

const handleUserInput = function (data) {
  if (data === '\u0003') {
    console.log('Exiting Game')
    setTimeout(() => {
      process.exit();
    },2000)
  }
};
setupInput();
module.exports = {
  connect,
  setupInput
}