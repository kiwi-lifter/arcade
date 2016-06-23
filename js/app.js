var colsNum = 5;
var rowsNum = 6;
var colWidth = 101;
var rowHeight = 83;
var tileSize = 83;
var rightBorder = colsNum * colWidth;
var bottomBorder = rowsNum * rowHeight;

var minEnemyPopulation = 3;
var maxEnemyPopulation = 9;
var distanceBetweenEnemies = colWidth;

// y coordinates for pavement rows
var pavementRows = [ 60, 145, 230];
// enemy speeds
var speeds = [75, 135, 200];


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = 0;
		
	this.y = randomNumFromArray(pavementRows);	
	this.speed = randomNumFromArray(speeds);	
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed * dt;
	
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
	this.sprite = 'images/char-boy.png';
	
};

Player.prototype.update = function() {
	//console.log("update function here");
} 

Player.prototype.render = function() {
	//console.log("render function here");
} 

Player.prototype.handleInput = function(allowedKeys) {
	//console.log("handleInput function here");
	switch(allowedKeys){
	case "left":
	this.x += this.x - 100;
	break;
	
	case "up":
	this.x += this.y - 100;
	break;
	
	case "right":
	this.y += this.x + 100;
	break;
	
	case "down":
	this.y += this.y + 100;
	break;

    }
} 



// This function produces a random number value from an array passed in as a parameter
var randomNumFromArray = function(numberArray){
	var randomNum = numberArray[Math.floor(Math.random() * numberArray.length)];
	return randomNum;
};


// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
var allEnemies = [];

var enemy = new Enemy;
allEnemies[0] = enemy;

// Place the player object in a variable called player
var player = new Player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});