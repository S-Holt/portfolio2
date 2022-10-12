let gameScore = 0,
	lives = 3,
	livesLeft = document.querySelector('.lives > span'),
    score = document.querySelector('.score > span');
    
// Enemies our player must avoid 
var Enemy = function() {
    
    this.sprite = 'images/bug.png';
    this.x = -100;
    this.speed = 0;
    this.width = 70;
    this.height = 90;
    this.rand = Math.floor(Math.random() * 2);
    this.y = this.rand == 0 ? 300 : this.rand == 1 ? 155 : 75;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks this is for the collision zone
Enemy.prototype.update = function(dt) {
    this.speed = (Math.floor(Math.random() * (350 - 100 + 15) + 100));
    this.x += this.speed * dt;
    livesLeft.innerText = lives;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
setInterval(function() {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}, (Math.floor(Math.random() * (1500 - 900 + 1)) + 900));

/*var allEnemies = [];
console.log(allEnemies);*/

var Player = function() {
    this.x = 225;
    this.y = 480;
    this.width = 70;
    this.height = 90;
    this.sprite = 'images/girl_ext.png';
}

Player.prototype.update = function(dt) {};

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key == "up") {
        this.y -= 150
    } else if (key == "down") {
        this.y += 150;
    } else if (key == "left") {
        this.x -= 100;
    } else if (key == "right") {
        this.x += 100;
    }


    if (this.y < 30) {
        this.y = 30;
    } else if (this.x < 0) {
        this.x = 0;
    } else if (this.y > 480) {
        this.y =480;
    } else if (this.x > 445) {
        this.x = 445;
    }
    if (this.y < 50) {
        setTimeout(function () {
            player.x = 225;
            player.y = 480;
            
        },200);
        gameScore++;
			score.innerText = gameScore * 100;
			if (gameScore === 5 && lives > 0) {
				confirm('You won the game!');
				lives = 3;
				gameScore = 0;
				livesLeft.innerText = lives;
                score.innerText = '';
            }     
    }
}
var player = new Player();

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
