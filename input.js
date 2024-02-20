const { connect } = require("http2");

let connection;

const setupInput = (conn) => {
  connection = conn;
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
    }, 2000)
    console.log('Disconnected from server')
  }
  const movement = {
    'w': () => connection.write('Move: up'),
    's': () => connection.write('Move: down'),
    'a': () => connection.write('Move: left'),
    'd': () => connection.write('Move: right'),
  }
  let value = movement[data]
  if (value){
    value();
  }
};

module.exports = {
  setupInput,
  handleUserInput,
}