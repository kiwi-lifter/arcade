var GAMEMODULE = (function () {

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

var enemyPopulation = 5;
var enemySprites = ['images/red-d.gif', 'images/blue-d.gif', 'images/black-d.gif'];
var enemyHeight = 74;
var enemyWidth = 98;
var speeds = [150, 250, 300];

var playerSprite = 'images/knight.gif';
var playerHeight = 89;
var playerWidth = 71;
var playerXcoord = (colsNum * colWidth) / 2 - playerWidth / 2;
var playerYcoord = (rowsNum * rowHeight) - playerHeight / 2 + 10;
var lives = 3;
var score = 0;


var numberOfCoins = 1;
var coinsSprite = 'images/coins.png';
var coinsHeight = 71;
var coinsWidth = 71;

var numberOfEquip = 2;
var equipSprites = ['images/sword.png', 'images/book.png', 'images/potion.png'];
var equipHeight = 71;
var equipWidth = 71;

var numberOfSkulls = 3;
var skullSprite = 'images/skull.png';
var skullHeight = 71;
var skullWidth = 71;

// x coordinates for pavement columns
//var pavementColumns = [0, 101, 202, 303, 404];
// y coordinates for pavement rows
//var pavementRows = [ 140, 220, 305];

//x y coordinates for pavement tiles
var fieldGrid = [
    //{"x" : "15","y" : "55", "active" : "false"}, // water row
    {
        "x": 15,
        "y": 140,
        "active": false
    }, {
        "x": 15,
        "y": 220,
        "active": false
    }, {
        "x": 15,
        "y": 305,
        "active": false
    }, {
        "x": 116,
        "y": 140,
        "active": false
    }, {
        "x": 116,
        "y": 220,
        "active": false
    }, {
        "x": 116,
        "y": 305,
        "active": false
    }, {
        "x": 217,
        "y": 140,
        "active": false
    }, {
        "x": 217,
        "y": 220,
        "active": false
    }, {
        "x": 217,
        "y": 305,
        "active": false
    }, {
        "x": 318,
        "y": 140,
        "active": false
    }, {
        "x": 318,
        "y": 220,
        "active": false
    }, {
        "x": 318,
        "y": 305,
        "active": false
    }, {
        "x": 419,
        "y": 140,
        "active": false
    }, {
        "x": 419,
        "y": 220,
        "active": false
    }, {
        "x": 419,
        "y": 305,
        "active": false
    },
];


// Super class for game agents - player, enemies, coins etc
var GameEntity = function(sprite, height, width) {
	this.sprite = sprite;
	this.height = height;
	this.width = width;
};

GameEntity.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.coordinates.y);
};

GameEntity.prototype.placeEntity = function(){
	// get random x y coordinates for 
    var active = true;

    while (active = true) {

        this.coordinates = randomCoordinates();

        // make sure grid postion is not already occupied by an entity
        if (this.coordinates.active === false) {
            this.x = this.coordinates.x;
            this.y = this.coordinates.y;

            var index = -1;

            for (var i = 0; i < fieldGrid.length; i++) {
                if (fieldGrid[i].x === this.x && fieldGrid[i].y === this.y) {
                    index = i;
                    break;
                }
            };

            fieldGrid[i].active = true;
            break;
        } //end if
    } // end while	
};

// Enemies our player must avoid
var Enemy = function() {

    this.height = enemyHeight;
    this.width = enemyWidth;

    // random enemy start
    this.startEnemy();
};

Enemy.prototype = Object.create(GameEntity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Restart the enemy once it reaches end of row.
    if (this.x > rightBorder) {
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

    switch (this.sprite) {

        case 'images/red-d.gif':
            this.speed = 210;
            break;

        case 'images/black-d.gif':
            this.speed = 140;
            break;

        case 'images/blue-d.gif':
            this.speed = 70;
            break;

        default:
            this.speed = 70;
    };
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	GameEntity.call(this, playerSprite, playerHeight, playerWidth);
    this.startPlayer();
    this.score = score;
    this.lives = lives;
};

Player.prototype = Object.create(GameEntity.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

    if (player.lives === 0) {
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
    ctx.fillText("Score: " + this.score, 8, 570);

    // lives
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Lives: " + this.lives, 412, 570);
};

Player.prototype.startPlayer = function() {
    this.x = playerXcoord;
    this.y = playerYcoord;
}

Player.prototype.handleInput = function(keyCode) {

    switch (keyCode) {

        case "left":
            if (this.x > 34) {
                this.x = this.x - colWidth;
            }
            break;

        case "up":
            if (this.y > 0) {
                this.y = this.y - rowHeight;
            };
            break;

        case "right":
            if (this.x < 400) {
                this.x = this.x + colWidth;
            };
            break;

        case "down":
            if (this.y < 400) {
                this.y = this.y + rowHeight;
            };
            break;

    };
};

// Coins class
var Coins = function() {
	
	GameEntity.call(this, coinsSprite, coinsHeight, coinsWidth);
    this.placeEntity();
}

Coins.prototype = Object.create(GameEntity.prototype);
Coins.prototype.constructor = Coins;

Coins.prototype.update = function() {

    // collision detection
    if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.height + player.y > this.y) {

        //find index position of Coins object in array
        var index = -1;

        for (var i = 0; i < allCoins.length; i++) {
            if (allCoins[i].x === this.x && allCoins[i].y === this.y) {
                index = i;
                break;
            }
        };

        // remove Coins object from array
        allCoins.splice(index, 1);

        // increment score
        player.score += 20;
    };
}

// Equip class
var Equip = function() {
	// get random from an array of images
    this.sprite = randomSpriteImage(equipSprites);
    this.height = equipHeight;
    this.width = equipWidth;
    this.placeEntity();
}

Equip.prototype = Object.create(GameEntity.prototype);
Equip.prototype.constructor = Equip;

Equip.prototype.update = function() {

    // collision detection
    if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.height + player.y > this.y) {

        //find index position of Coins object in array
        var index = -1;

        for (var i = 0; i < allEquip.length; i++) {
            if (allEquip[i].x === this.x && allEquip[i].y === this.y) {
                index = i;
                break;
            }
        };

        // remove Equip object from array
        allEquip.splice(index, 1);

        // increment score
        player.score += 10;
    };
}

// Skull class
var Skull = function() {
	GameEntity.call(this, skullSprite, skullHeight, skullWidth);
    this.placeEntity();
}

Skull.prototype = Object.create(GameEntity.prototype);
Skull.prototype.constructor = Skull;
Skull.prototype.update = function() {

    // collision detection
    if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.height + player.y > this.y) {

        //find index position of Skull object in array
        var index = -1;

        for (var i = 0; i < allSkulls.length; i++) {
            if (allSkulls[i].x === this.x && allSkulls[i].y === this.y) {
                index = i;
                break;
            }
        };

        // remove Skull object from array
        allSkulls.splice(index, 1);

        // increment score
        if (player.score >= 10) {
            player.score -= 10;
        }
    };
}

// Random selection of x y cooordinates object from an array
var randomCoordinates = function() {

    shuffleArray(fieldGrid);

    var randomNum = Math.floor(Math.random() * fieldGrid.length);
    var theResult = fieldGrid[randomNum];

    return theResult;
};

// Random selection of a number from any number array passed in as the parameter.
var randomNumFromArray = function(numberArray) {

    shuffleArray(numberArray);
    var randomNum = Math.floor(Math.random() * numberArray.length);
    var theResult = numberArray[randomNum];
    return theResult;
};

// Random selection of sprite image/sprite
var randomSpriteImage = function(spriteArray) {

    var randomNum = Math.floor(Math.random() * spriteArray.length);
    var theResult = spriteArray[randomNum];
    return theResult;
};

//Some extra randomness
var shuffleArray = function(array) {
    var i = 0,
        j = 0,
        temp = null;

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

for (var i = 0; i < enemyPopulation; i++) {
    allEnemies.push(new Enemy);
};

// Array for coins
var allCoins = [];

for (var i = 0; i < numberOfCoins; i++) {
    allCoins.push(new Coins);
};

// Array for equipment
var allEquip = [];

for (var i = 0; i < numberOfEquip; i++) {
    allEquip.push(new Equip);
};

// Array for skulls
var allSkulls = [];

for (var i = 0; i < numberOfSkulls; i++) {
    allSkulls.push(new Skull);
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

return {
	allEnemies: allEnemies,
	allCoins: allCoins,
	allEquip: allEquip,
	allSkulls: allSkulls,
	player: player
	
};

})();

console.log(GAMEMODULE.player);