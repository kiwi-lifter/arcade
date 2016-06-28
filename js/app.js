var colsNum = 5;
var rowsNum = 6;
var colWidth = 101;
var rowHeight = 83;
var tileSize = 83;
var rightBorder = colsNum * colWidth;
var bottomBorder = rowsNum * rowHeight;

/* Sprites are not the same size as the tiles so some
 * tweeking of x y coordinate var values is needed
 */
var enemyPopulation =3;
var enemySprite = 'images/enemy-bug-small.png';
var enemyHeight = 74;
var enemyWidth = 98;

var playerSprite = 'images/char-boy-small.png';
var playerHeight = 78;
var playerWidth = 67;

var playerXcoord =  (colsNum * colWidth)/2 - playerWidth/2;
var playerYcoord =  (rowsNum * rowHeight) - playerHeight/2 +10;

var numberOfStars = 3;
var starSprite = 'images/star-small.png';
var starHeight = 71;
var starWidth = 71;
// x coordinates for pavement columns
var starPavementColumns = [15, 116, 217, 318, 419];
// y coordinates for pavement rows
var starPavementRows = [ 140, 220, 305];

// x coordinates for pavement columns
var pavementColumns = [0, 101, 202, 303, 404];
// y coordinates for pavement rows
var pavementRows = [ 140, 220, 305];
// enemy speeds
var speeds = [150, 250, 300];


var paused = false;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = enemySprite;
	
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
	this.x +=  0//this.speed * dt;
	
	// Restart the enemy once it reaches end of row.
	if(this.x > rightBorder) {
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
	this.sprite = playerSprite;
	this.height = playerHeight;
	this.width = playerWidth;
	this.startPlayer();
};

Player.prototype.update = function() {
	
	if (this.y < 55) {	
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
			if(this.x>34){
				this.x = this.x - colWidth;
			}
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
			
			case "p": 
			togglePause();
			break; 
		};
};

// Star class
var Star = function(id){
	this.id = id;
	this.sprite = starSprite;
	this.height = starHeight;
	this.width = starWidth;
	this.placeStar();
}

Star.prototype.placeStar = function(){
	
	this.x = starRandomNumFromArray(starPavementColumns);
	this.y = starRandomNumFromArray(starPavementRows);
	
};

Star.prototype.update = function() {

	
	
			if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.height + player.y > this.y) {	
			
				console.log('id= ' + this.id);
			
				var target = allStars.indexOf(this.x);
				
				console.log('target= ' + target);
	
				allStars.splice(target, 1);
				
				console.table(allStars);
				
			};
	
}

Star.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// This function randomly selects a number from any number array passed in as the parameter.
var randomNumFromArray = function(numberArray){
	shuffleArray(numberArray);
	var randomNum = Math.floor(Math.random() * numberArray.length);
	var theResult = numberArray[randomNum];

	return theResult;
};

// This function randomly selects a number from any number array passed in as the parameter.
var starRandomNumFromArray = function(numberArray){
	shuffleArray(numberArray);
	var randomNum = Math.floor(Math.random() * numberArray.length);
	var theResult = numberArray[randomNum];
	numberArray.splice(randomNum, 1);

	return theResult;
};

var shuffleArray = function(array) {
  var i = 0
    , j = 0
    , temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
	return temp;
  }
}

// Now instantiate your objects.


// Place all enemy objects in an array called allEnemies
var allEnemies = [];

for(var i=0; i<enemyPopulation; i++)
{
	allEnemies.push(new Enemy);
};

// Array for stars
var allStars = [];

for(var s=0; s<numberOfStars; s++)
{
	allStars.push(new Star(s));
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
        40: 'down',
		80: 'p'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});