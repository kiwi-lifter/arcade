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
var enemySprites = ['images/red-d.gif','images/blue-d.gif','images/black-d.gif'];
var enemyHeight = 74;
var enemyWidth = 98;
var speeds = [150, 250, 300];

var playerSprite = 'images/knight.gif';
var playerHeight = 89;
var playerWidth = 71;
var playerXcoord =  (colsNum * colWidth)/2 - playerWidth/2;
var playerYcoord =  (rowsNum * rowHeight) - playerHeight/2 +10;
var lives = 3;
var score = 0;


var numberOfStars = 1;
var starSprite = 'images/coins.png';
var starHeight = 71;
var starWidth = 71;

var numberOfGems = 2;
var gemSprites = ['images/sword.png','images/book.png','images/potion.png'];
var gemHeight = 71;
var gemWidth = 71;

var numberOfHearts = 3;
var heartSprite = 'images/skull.png';
var heartHeight = 71;
var heartWidth = 71;

// x coordinates for pavement columns
//var pavementColumns = [0, 101, 202, 303, 404];
// y coordinates for pavement rows
//var pavementRows = [ 140, 220, 305];


//x y coordinates for pavement tiles
var fieldGrid = [
//{"x" : "15","y" : "55", "active" : "false"}, // water row
{"x" : 15, "y" : 140, "active" : false}, 
{"x" : 15,"y" : 220, "active" : false},
{"x" : 15,"y" : 305, "active" : false},
{"x" : 116,"y" : 140, "active" : false},
{"x" : 116,"y" : 220, "active" : false},
{"x" : 116,"y" : 305, "active" : false},
{"x" : 217,"y" : 140, "active" : false},
{"x" : 217,"y" : 220, "active" : false},
{"x" : 217,"y" : 305, "active" : false},
{"x" : 318,"y" : 140, "active" : false},
{"x" : 318,"y" : 220, "active" : false},
{"x" : 318,"y" : 305, "active" : false},
{"x" : 419,"y" : 140, "active" : false},
{"x" : 419,"y" : 220, "active" : false},
{"x" : 419,"y" : 305, "active" : false},
];


// Enemies our player must avoid
var Enemy = function() {
 
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
	
	// check for collision with player
	if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.height + player.y > this.y) {		
		player.lives -= 1;
		player.startPlayer();
	};

};

// reset the enemy position once it reaches end of row
Enemy.prototype.startEnemy = function() {
	this.sprite = randomSpriteImage(enemySprites);
	this.x = -colWidth;
	this.coordinates = randomCoordinates();
	this.y = this.coordinates.y;
	
	//this.speed = randomNumFromArray(speeds);
	
	switch(this.sprite){
		
			case 'images/red-d.gif':
			this.speed = 210;
			break;
			
			case 'images/black-d.gif':
			this.speed = 140;
			break;
				
			case 'images/blue-d.gif':
			this.speed = 70;
			break;
						
			default: this.speed = 70;	
		};
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
	
	
	if(player.lives === 0){
	console.log('Game Over');
	};
	
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
var Star = function(){
	this.sprite = starSprite;
	this.height = starHeight;
	this.width = starWidth;
	this.placeStar();
	
}

Star.prototype.placeStar = function(){

	// get random x y coordinates for star
	var active = true;
	
	while(active = true){
		
		this.coordinates = randomCoordinates();
		
		// make sure grid postion is not already occupied by a star or gem
		if(this.coordinates.active === false){
			this.x = this.coordinates.x;
			this.y = this.coordinates.y;
			
			var index = -1;
				
				for(var i = 0; i < fieldGrid.length; i++) {
					if(fieldGrid[i].x === this.x && fieldGrid[i].y === this.y){
						index = i;
						break;
					}
				};
			
			fieldGrid[i].active = true;
				
			break;
		};	//end if
	}; // end while	
};

Star.prototype.update = function() {
			
			// collision detection
			if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.height + player.y > this.y) {	
				
				//find index position of star object in array
				var index = -1;
				
				for(var i = 0; i < allStars.length; i++) {
					if(allStars[i].x === this.x && allStars[i].y === this.y){
						index = i;
						break;
					}
				};
				
				// remove star object from array
				allStars.splice(index, 1);
				
				// increment score
				player.score +=20;
			};
}

Star.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}



// Gem class
var Gem = function(){
	this.sprite = randomSpriteImage(gemSprites);
	this.height = gemHeight;
	this.width = gemWidth;
	this.placeGem();
	
}

Gem.prototype.placeGem = function(){

	// get random x y coordinates for gem
	var active = true;
	
	while(active = true){
		
		this.coordinates = randomCoordinates();
		
		// make sure grid postion is not already occupied by a star or gem
		if(this.coordinates.active === false){
			this.x = this.coordinates.x;
			this.y = this.coordinates.y;
			
			var index = -1;
				
				for(var i = 0; i < fieldGrid.length; i++) {
					if(fieldGrid[i].x === this.x && fieldGrid[i].y === this.y){
						index = i;
						break;
					}
				};
			
			fieldGrid[i].active = true;
				
			//active = false;
			break;
		}	//end if
	} // end while	
};

Gem.prototype.update = function() {
			
			// collision detection
			if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.height + player.y > this.y) {	
				
				//find index position of star object in array
				var index = -1;
				
				for(var i = 0; i < allGems.length; i++) {
					if(allGems[i].x === this.x && allGems[i].y === this.y){
						index = i;
						break;
					}
				};
				
				// remove gem object from array
				allGems.splice(index, 1);
				
				// increment score
				player.score += 10;
			};
}

Gem.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Heart class
var Heart = function(){
	this.sprite = heartSprite;
	this.height = heartHeight;
	this.width = heartWidth;
	this.placeHeart();
	
}

Heart.prototype.placeHeart = function(){

	// get random x y coordinates for gem
	var active = true;
	
	while(active = true){
		
		this.coordinates = randomCoordinates();
		
		// make sure grid postion is not already occupied by a star, gem or heart
		if(this.coordinates.active === false){
			this.x = this.coordinates.x;
			this.y = this.coordinates.y;
			
			var index = -1;
				
				for(var i = 0; i < fieldGrid.length; i++) {
					if(fieldGrid[i].x === this.x && fieldGrid[i].y === this.y){
						index = i;
						break;
					}
				};
			
			fieldGrid[i].active = true;
				
			//active = false;
			break;
		}	//end if
	} // end while	
};

Heart.prototype.update = function() {
			
			// collision detection
			if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.height + player.y > this.y) {	
				
				//find index position of star object in array
				var index = -1;
				
				for(var i = 0; i < allHearts.length; i++) {
					if(allHearts[i].x === this.x && allHearts[i].y === this.y){
						index = i;
						break;
					}
				};
				
				// remove gem object from array
				allHearts.splice(index, 1);
				
				// increment score
				if(player.score >=10){
					player.score -= 10;
				}
			};
}

Heart.prototype.render = function() {
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

// Random selection of sprite image/sprite
var randomSpriteImage = function(spriteArray){
	
	var randomNum = Math.floor(Math.random() * spriteArray.length);
	var theResult = spriteArray[randomNum];
	return theResult;
};

//Some extra randomness
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
};

// Now instantiate your objects.


// Place all enemy objects in an array called allEnemies
var allEnemies = [];

for(var i=0; i<enemyPopulation; i++)
{
	allEnemies.push(new Enemy);
};

// Array for stars
var allStars = [];

for(var i=0; i<numberOfStars; i++)
{
	allStars.push(new Star);
};

// Array for gems
var allGems = [];

for(var i=0; i<numberOfGems; i++)
{
	allGems.push(new Gem);
};

// Array for hearts
var allHearts = [];

for(var i=0; i<numberOfHearts; i++)
{
	allHearts.push(new Heart);
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