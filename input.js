//const { connect } = require("http2");

let connection;

// Interface to handle user input from stdin
const setupInput = (conn) => {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  stdin.on("data", handleUserInput);
  return stdin;
};

//Function handles the user input
const handleUserInput = function (data) {

  //If the user keypress is 'ctrl + c' 
  if (data === '\u0003') {
    console.log('Exiting Game') 
    
    //Delay by two seconds the closing of the game
    setTimeout(() => {
      process.exit();
    }, 2000)
    console.log('Disconnected from server')
    //If the user presses the key 'm'
  } else if (data === 'm'){
    connection.write('Say: This game is amazing!')
  }
    //Object with the corresponding actions per key press
    const movement = {
    'w': () => connection.write('Move: up'),
    's': () => connection.write('Move: down'),
    'a': () => connection.write('Move: left'),
    'd': () => connection.write('Move: right'),
  }
  let value = movement[data]
  //if a certain key in this object is pressed
  if (value){
    value(); //Run the function corresponding to the key which triggers movement
  }
};

module.exports = {
  setupInput,
  handleUserInput,
}