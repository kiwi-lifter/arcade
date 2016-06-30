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
var enemyPopulation =4;
var enemySprite = 'images/enemy-bug-small.png';
var enemyHeight = 74;
var enemyWidth = 98;
var speeds = [150, 250, 300];

var playerSprite = 'images/char-boy-small.png';
var playerHeight = 78;
var playerWidth = 67;
var playerXcoord =  (colsNum * colWidth)/2 - playerWidth/2;
var playerYcoord =  (rowsNum * rowHeight) - playerHeight/2 +10;
var lives = 3;
var score = 0;


var numberOfStars = 3;
var starSprite = 'images/star-small.png';
var starHeight = 71;
var starWidth = 71;


// x coordinates for pavement columns
var pavementColumns = [0, 101, 202, 303, 404];
// y coordinates for pavement rows
var pavementRows = [ 140, 220, 305];



var fieldGrid = [
//{"x" : "15","y" : "55", "active" : "false"}, // water row
{"x" : 15, "y" : 140, "active" : "false"}, // pavement row
{"x" : 15,"y" : 220, "active" : "false"}, // pavement row
{"x" : 15,"y" : 305, "active" : "false"}, // pavement row
//{"x" : "15","y" : "390", "active" : "false"}, // grass row
//{"x" : "15","y" : "470", "active" : "false"}, // grass row 
//{"x" : "115", "y" : "55", "active" : "false"},
{"x" : 116,"y" : 140, "active" : "false"},
{"x" : 116,"y" : 220, "active" : "false"},
{"x" : 116,"y" : 305, "active" : "false"},
//{"x" : "115","y" : "390", "active" : "false"},
//{"x" : "115","y" : "470", "active" : "false"},
//{"x" : "215","y" : "55", "active" : "false"},
{"x" : 217,"y" : 140, "active" : "false"},
{"x" : 217,"y" : 220, "active" : "false"},
{"x" : 217,"y" : 305, "active" : "false"},
//{"x" : "215","y" : "390", "active" : "false"},
//{"x" : "215","y" : "470", "active" : "false"},
//{"x" : "320","y" : "55", "active" : "false"},
{"x" : 318,"y" : 140, "active" : "false"},
{"x" : 318,"y" : 220, "active" : "false"},
{"x" : 318,"y" : 305, "active" : "false"},
//{"x" : "320","y" : "390", "active" : "false"},
//{"x" : "320","y" : "470", "active" : "false"},
//{"x" : "420","y" : "55", "active" : "false"},
{"x" : 419,"y" : 140, "active" : "false"},
{"x" : 419,"y" : 220, "active" : "false"},
{"x" : 419,"y" : 305, "active" : "false"},
//{"x" : "420","y" : "390", "active" : "false"},
//{"x" : "420","y" : "470", "active" : "false"}*/
];


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
	this.x +=  this.speed * dt;
	
	// Restart the enemy once it reaches end of row.
	if(this.x > rightBorder) {
		this.startEnemy();
	}
	
	if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.height + player.y > this.y) {	
		player.startPlayer();
	};

};

// reset the enemy position once it reaches end of row
Enemy.prototype.startEnemy = function() {
	this.x = -colWidth;
	this.coordinates = randomCoordinates();
	this.y = this.coordinates.y;
	this.speed = randomNumFromArray(speeds);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.coordinates.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
	this.sprite = playerSprite;
	this.height = playerHeight;
	this.width = playerWidth;
	this.startPlayer();
	this.score = score;
	this.lives = lives;
};

Player.prototype.update = function() {
	
	if (this.y < 55) {	
		
		player.score += 20;
        this.startPlayer();
    }
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	
	// score
	ctx.font = "20px Arial";
	ctx.fillStyle = "#fff";
	ctx.fillText("Score: "+this.score, 8, 570);
	
	// lives
	ctx.font = "20px Arial";
	ctx.fillStyle = "#fff";
	ctx.fillText("Lives: "+this.lives, 412, 570);
}; 

Player.prototype.startPlayer = function(){
	this.x = playerXcoord;
	this.y = playerYcoord;
}

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
			
		};
};

// Star class
var Star = function(id){
	this.id = id;
	this.sprite = starSprite;
	this.height = starHeight;
	this.width = starWidth;
	console.log(this.id);
	this.placeStar();
	
}

Star.prototype.placeStar = function(){

	//this.coordinates = randomCoordinates();
	//this.x = starRandomNumFromArray(starPavementColumns);
	//this.y = starRandomNumFromArray(starPavementRows);
	
	this.coordinates = randomCoordinates();
	this.x = this.coordinates.x;
	this.y = this.coordinates.y;
	
};


Star.prototype.update = function() {
			
			// collision detection
			if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.height + player.y > this.y) {	
				
				//find index position of star object in array
				var index = 5;
				
				for(var i = 0; i < allStars.length; i++) {
					if(allStars[i].id === this.id){
						index = i;
						break;
					}
				};
				
				// remove star object from array
				allStars.splice(index, 1);
				
				// increment score
				player.score += 10;
			};
}

Star.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Random selection of x y cooordinates object from an array
var randomCoordinates = function(){
	shuffleArray(fieldGrid);
	var randomNum = Math.floor(Math.random() * fieldGrid.length);
	var theResult = fieldGrid[randomNum];

	return theResult;
};

// Random selection of a number from any number array passed in as the parameter.
var randomNumFromArray = function(numberArray){
	shuffleArray(numberArray);
	var randomNum = Math.floor(Math.random() * numberArray.length);
	var theResult = numberArray[randomNum];

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