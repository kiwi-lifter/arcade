var GAMEMODULE = (function() {

    var gameOver = false;
    var pause = false;

    var colsNum = 5;
    var rowsNum = 6;
    var colWidth = 101;
    var rowHeight = 83;
    var tileSize = 83;
    var rightBorder = colsNum * colWidth;
    var bottomBorder = rowsNum * rowHeight;

    var enemyPopulation = 5;
    var enemySprites = ['images/red-d.gif', 'images/blue-d.gif', 'images/black-d.gif'];
    var enemyHeight = 74;
    var enemyWidth = 98;
    var speeds = [150, 250, 300];

    var playerSprite = 'images/knight.gif';
    var playerHeight = 85;
    var playerWidth = 71;
    var playerXcoord = (colsNum * colWidth) / 2 - playerWidth / 2;
    var playerYcoord = (rowsNum * rowHeight) - playerHeight / 2 + 10;
    var lives = 3;
    var score = 0;

    var numberOfCoins = 1;
    var coinsSprite = 'images/coins.png';
    var coinsHeight = 71;
    var coinsWidth = 71;
    var coinsWorth = 30;

    var numberOfEquip = 2;
    var equipSprites = ['images/sword.png', 'images/book.png', 'images/potion.png'];
    var equipHeight = 71;
    var equipWidth = 71;
    var equipWorth = 15;

    var numberOfSkulls = 4;
    var skullSprite = 'images/skull.png';
    var skullHeight = 71;
    var skullWidth = 71;
    var skullWorth = -15;

    //array of x y coordinates for pavement tiles
    var fieldGrid = [
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

    /**
	* @constructor Superclass creates new game entity.
	* @param {String}	sprite	Path to sprite image.
    * @param {number}	height	px height of sprite.
    * @param {number}	width	px width of sprite. 
    **/
    var GameEntity = function(sprite, height, width) {
        this.sprite = sprite;
        this.height = height;
        this.width = width;
    };

    GameEntity.prototype.render = function() {
        ENGINEMODULE.ctx.drawImage(Resources.get(this.sprite), this.x, this.coordinates.y);
    };
	/**
	* @description Method generates random x y coordinates, checks them against
	* game grid array to make sure they are not already active, before assigning them
	* to the object.
    **/
    GameEntity.prototype.placeEntity = function() {
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
	/**
	* @description Method checks if player has collided with entities, adjust player score if true.
	* @param {array} entityArray The entity objects to be checked against player.
    **/
	GameEntity.prototype.collisionDetection = function(entityArray) {
		// collision detection
		if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.height + player.y > this.y) {
			//find index position of object in array
			var index = -1;
			for (var i = 0; i < entityArray.length; i++) {
				if (entityArray[i].x === this.x && entityArray[i].y === this.y) {
					index = i;
					break;
				}
			};
			// remove object from game area
			this.x = -75;
			// increment score
			// don't want score to go below zero
			if((player.score + this.value)<0){
				player.score = 0;
			}
			else{
				player.score += this.value;
			}
		};
	}
    /**
	* @constructor Creates new Enemy
    **/
    var Enemy = function() {

        this.height = enemyHeight;
        this.width = enemyWidth;

        // random enemy start
        this.startEnemy();
    };

    Enemy.prototype = Object.create(GameEntity.prototype);
    Enemy.prototype.constructor = Enemy;
	/**
	* @description Update the enemy's position, required method for game.
    * @param {number}	dt	 A time delta between ticks.
    **/
    Enemy.prototype.update = function(dt) {
        this.x += this.speed * dt;
        // Restart the enemy once it reaches end of row.
        if (this.x > rightBorder) {
            this.startEnemy();
        }
        // check for collision with player
        if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.height + player.y > this.y) {
            player.lives -= 1;
            player.startPlayer();
            this.startEnemy();
        };
    };

    // set or reset the enemy position once it reaches end of row
    Enemy.prototype.startEnemy = function() {
        this.sprite = randomSpriteImage(enemySprites);
        this.x = -colWidth;
        this.coordinates = randomCoordinates();
        this.y = this.coordinates.y;
		// set speed depending on enemy sprite type
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

    /**
	* @constructor Creates new Player.
    **/
    var Player = function() {
        GameEntity.call(this, playerSprite, playerHeight, playerWidth);
        this.startPlayer();
        this.score = score;
        this.lives = lives;
        this.pause = pause;
        this.gameOver = gameOver;
    };

    Player.prototype = Object.create(GameEntity.prototype);
    Player.prototype.constructor = Player;
    Player.prototype.update = function() {
        // reached the water or all out of lives?
        if (this.lives === 0 || this.y < 55) {
            this.gameOver = true;
        };
    };

    Player.prototype.render = function() {
		// using the ctx invoked in ENGINEMODULE
        ENGINEMODULE.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        // score
        ENGINEMODULE.ctx.font = "20px Arial";
        ENGINEMODULE.ctx.fillStyle = "#fff";
        ENGINEMODULE.ctx.fillText("Score: " + this.score, 8, 570);
        // lives
        ENGINEMODULE.ctx.font = "20px Arial";
        ENGINEMODULE.ctx.fillStyle = "#fff";
        ENGINEMODULE.ctx.fillText("Lives: " + this.lives, 412, 570);
    };

    Player.prototype.startPlayer = function() {
        this.x = playerXcoord;
        this.y = playerYcoord;
    };

    Player.prototype.togglePause = function() {
        this.pause = !this.pause;
    };

    Player.prototype.handleInput = function(keyCode) {
        switch (keyCode) {
            case "left":
                if (this.x > 34 && !this.paused) {
                    this.x = this.x - colWidth;
                }
                break;

            case "up":
                if (this.y > 0 && !this.paused) {
                    this.y = this.y - rowHeight;
                };
                break;

            case "right":
                if (this.x < 400 && !this.paused) {
                    this.x = this.x + colWidth;
                };
                break;

            case "down":
                if (this.y < 400 && !this.paused) {
                    this.y = this.y + rowHeight;
                };
                break;

            case "pause":
                this.togglePause();
                break;

            case "spacebar":
                resetGame();
                break;

            default:
                console.log('keyCode switch default');
                break;
        };
    };

    /**
	* @constructor Creates new Coins.
    **/
    var Coins = function() {

        GameEntity.call(this, coinsSprite, coinsHeight, coinsWidth);
		this.value = coinsWorth;
        this.placeEntity();
    }

    Coins.prototype = Object.create(GameEntity.prototype);
    Coins.prototype.constructor = Coins;
    Coins.prototype.update = function() {
        this.collisionDetection(allCoins);
    }
	
	
    /**
	* @constructor Creates new Equipment.
    **/
    var Equip = function() {
        // get random image from an array
        var randomEnemySprite = randomSpriteImage(equipSprites);
        GameEntity.call(this, randomEnemySprite, equipHeight, equipWidth);
		this.value = equipWorth;
        this.placeEntity();
    }

    Equip.prototype = Object.create(GameEntity.prototype);
    Equip.prototype.constructor = Equip;
    Equip.prototype.update = function() {
        this.collisionDetection(allEquip);
    }

	/**
	* @constructor Creates new Skull.
    **/
    var Skull = function() {
        GameEntity.call(this, skullSprite, skullHeight, skullWidth);
		this.value = skullWorth;
        this.placeEntity();
    }

    Skull.prototype = Object.create(GameEntity.prototype);
    Skull.prototype.constructor = Skull;
    Skull.prototype.update = function() {
        this.collisionDetection(allCoins);
    }

    /**
	* @description Generates random x and y coordinate numbers from the field grid array
    **/
    var randomCoordinates = function() {
        shuffleArray(fieldGrid);
        var randomNum = Math.floor(Math.random() * fieldGrid.length);
        var theResult = fieldGrid[randomNum];
        return theResult;
    };

    /**
	* @description Generates random number from an array
	* @param {array}
	* @returns {number} A number from the array.
    **/
    var randomNumFromArray = function(numberArray) {
        shuffleArray(numberArray);
        var randomNum = Math.floor(Math.random() * numberArray.length);
        var theResult = numberArray[randomNum];
        return theResult;
    };

    /**
	* @description Generates random sprite image from an array
	* @param {array}
	* @returns {image} A sprite image from the array.
    **/
    var randomSpriteImage = function(spriteArray) {
        var randomNum = Math.floor(Math.random() * spriteArray.length);
        var theResult = spriteArray[randomNum];
        return theResult;
    };

    /**
	* @description Randomly shuffles an array of numbers.
	* @param {array}
	* @returns {number} The shuffled array.
    **/
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
	
	/**
	* @description Resets game state on game over.
    **/
    var resetGame = function() {
        player.lives = GAMEMODULE.lives;
        player.score = GAMEMODULE.score;
        player.gameOver = false;
        player.startPlayer();
        allEnemies.forEach(function(enemy) {
            enemy.startEnemy();
        });
        fieldGrid.forEach(function(gridPoint) {
            gridPoint.active = false;
        });
        allSkulls.forEach(function(skull) {
            skull.placeEntity();
        });
        allEquip.forEach(function(equip) {
            equip.sprite = randomSpriteImage(equipSprites);
            equip.placeEntity();
        });
        allCoins.forEach(function(coins) {
            coins.placeEntity();
        });	
        ENGINEMODULE.main();
    };
    
    // Place all enemy objects in an array called allEnemies

    var allEnemies = [];
    // Array for equipment
    var allEquip = [];
    // Array for skulls
    var allSkulls = [];
    // Array for coins
    var allCoins = [];

    for (var i = 0; i < enemyPopulation; i++) {
        allEnemies.push(new Enemy);
    };
    for (var i = 0; i < numberOfCoins; i++) {
        allCoins.push(new Coins);
    };
    for (var i = 0; i < numberOfEquip; i++) {
        allEquip.push(new Equip);
    };
    for (var i = 0; i < numberOfSkulls; i++) {
        allSkulls.push(new Skull);
    };

    // Place the player object in a variable called player.
    var player = new Player;

    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keyup', function(e) {
        var allowedKeys;
        if (player.gameOver === true) {
            allowedKeys = {
                32: 'spacebar'
            };
            player.handleInput(allowedKeys[e.keyCode]);
        } else {
            allowedKeys = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down',
                80: 'pause'
            };
            player.handleInput(allowedKeys[e.keyCode]);
        } // end if
    });
    /** return GAMEMODULE result as an object to global scope for use by Engine module
     *  add any properties to this object that need to be revealed to the global scope	
     **/
    return {
        allEnemies: allEnemies,
        allCoins: allCoins,
        allEquip: allEquip,
        allSkulls: allSkulls,
        player: player,
        lives: lives,
        score: score
    };
})();