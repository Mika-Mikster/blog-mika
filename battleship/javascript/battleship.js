// Displaying all the messages "hit", "miss", "sank my battleship" etc.
var view = {
  displayMessage: function(msg){
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
};
// Making it also possible to send the input with Enter instead of clicking the button
function handleKeyPress(e) {
  var fireButton = document.getElementById("fireButton");
  if(e.keyCode === 13){
    fireButton.click();
    return false;
  }
}
//Turning the input into a value that can be used for the guessing function
function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  controller.processGuess(guess);
  guessInput.value = "";
}
//When the DOM has loaded, start with the function init
window.onload = init;
//Turning the guess value of "A3" etc into the ID numbers "00" etc.
function parseGuess(guess){
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
  if (guess === null || guess.length !== 2){
    alert("Oops, please enter a letter and a number on the board.");
  } else {
    var firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);
    if (isNaN(row) || isNaN(column)){
      alert("Oops, that isn't on the board");
    } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
      alert("Oops, that's off the board!");
    } else {
      return row + column;
    }
  }
  return null;
}
//The controller function of the input
var controller = {
  guesses: 0,
  processGuess: function (guess){
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips){
        view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
      }
    }
  }
};
//the object of all the ships, locations, size, when the ships are hit/missed/sunk
var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  //Locations of the ships
  ships: [{ locations: ["00", "00", "00"], hits: ["", "", ""] },
          { locations: ["00", "00", "00"], hits: ["", "", ""] },
          { locations: ["00", "00", "00"], hits: ["", "", ""] }],
  //the fire option based on the guess input of the player
  fire: function (guess) {
    for (var i = 0; i < this.numShips; i++){
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);
      //When the ship is hit
      if (index >= 0){
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        //When you hit the ship multiple times and sunk it
        if (this.isSunk(ship)){
          view.displayMessage("You sank my Battleship!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    //When the no ships where hit
    view.displayMiss(guess);
    view.displayMessage("You missed.");
    return false;
  },
  //What happens when the ship was bombed and sank
  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++){
      if (ship.hits[i] !== "hit"){
        return false;
      }
    }
    return true;
  },
  //Generates the location of the ships
  generateShipLocations: function(){
    var locations;
    for (var i = 0; i < this.numShips; i++){
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  },
  //Generates the size of the ships and it's place
  generateShip: function(){
    var direction = Math.floor(Math.random()*2);
    var row;
    var col;
    if (direction === 1){
      row = Math.floor(Math.random()*this.boardSize);
      col = Math.floor(Math.random()*(this.boardSize - (this.shipLength+1)));
    } else {
      row = Math.floor(Math.random()*(this.boardSize - (this.shipLength+1)));
      col = Math.floor(Math.random()*this.boardSize);
    }
    var newShipLocations = [];
    for(var i = 0; i < this.shipLength; i++){
      if (direction === 1){
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push((row + i) + "" + col);
      }
    }
    return newShipLocations;
  },
  collision: function(locations){
    for(var i = 0; i < this.numShips; i++){
      var ship = model.ships[i];
      for (var j = 0; j < locations.length; j++){
        if(ship.locations.indexOf(locations[j]) >= 0){
          return true;
        }
      }
    }
    return false;
  }
};
// Function to get the eventhandler on the button
function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;

  model.generateShipLocations();
}
