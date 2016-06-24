var colsNum = 5;
var rowsNum = 6;
var colWidth = 101;
var rowHeight = 83;
var tileSize = 83;
var rightBorder = colsNum * colWidth;
var bottomBorder = rowsNum * rowHeight;

var enemyPopulation =3;

var enemyHeight = 171;
var enemyWidth = 101;

var playerHeight = 171;
var playerWidth = 101;

var playerXcoord =  (colsNum * colWidth)/2 - playerWidth/2;
var playerYcoord =  (rowsNum * rowHeight) - playerHeight/2;

// y coordinates for pavement rows
var pavementRows = [ 60, 145, 230];
// enemy speeds
var speeds = [150, 250, 350];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	
	this.height = enemyHeight;
	this.width = enemyWidth;
	
	// random enemy start
	this.startEnemy();	
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed * dt;
	
	// re start the enemy once it reaches end of row
	if(this.x > rightBorder) {
		this.startEnemy();
	}
	
};

// restart Player if hit by enemy
Enemy.prototype.collidingWithPlayer = function () {
    if (player.x <= this.x + 50 &&
        this.x <= player.x + 20 &&
        player.y <= this.y + 20 &&
        this.y <= player.y + 20) {

        this.startEnemy();
    }
};

// reset the enemy position once it reaches end of row
Enemy.prototype.startEnemy = function() {
	this.x = -colWidth;
	this.y = randomNumFromArray(pavementRows);
	this.speed = randomNumFromArray(speeds);
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
	
	this.height = playerHeight;
	this.width = playerWidth;
	
	this.startPlayer();
	
};

Player.prototype.update = function() {
	if (this.y < 0) {	
        this.startPlayer();
    }
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}; 

Player.prototype.startPlayer = function(){
	this.x = playerXcoord;
	this.y = playerYcoord;
};

Player.prototype.handleInput = function(keyCode) {
	
		switch(keyCode){
		
			case "left":
			if(this.x>0){
				this.x = this.x - colWidth;
			};
			break;
			
			case "up":
			if(this.y>0){
				this.y = this.y - rowHeight;
			};
			break;
			
			case "right":
			if(this.x<400){
				this.x = this.x + colWidth;
			};
			break;
			
			case "down":
			if(this.y<400){
				this.y = this.y + rowHeight;
			};
			break;
		};
};

// This function randomly selects a number from any number array passed in as the parameter.
var randomNumFromArray = function(numberArray){
	var randomNum = numberArray[Math.floor(Math.random() * numberArray.length)];
	return randomNum;
};

// Now instantiate your objects.


// Place all enemy objects in an array called allEnemies
var allEnemies = [];

for(var i=0; i<enemyPopulation; i++)
{
	allEnemies.push(new Enemy);
};

// Place the player object in a variable called player.
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