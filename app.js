let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');
let progresso = 0;
const gameWidth = 375;
const gameHeight = 590;
let score = 0;
let record = 0;
const crash = new Audio('crash.mp3');
const eat = new Audio('eat.mp3');
let speedCheck = 0;
let fps = 10;
let lastKey = 0;
let gameState = 0;
function gameOver() {
	crash.play();
	speedCheck = 0;
	gameState = 1;
	record = score;
	score = 0;
	document.getElementById('score').innerHTML = score;
	document.getElementById('record').innerHTML = record;
}
class Snake {
	constructor(game) {
		this.image = document.getElementById('img_snake');
		this.snakedown = document.getElementById('img_snakedown');
		this.snakeup = document.getElementById('img_snakeup');
		this.snakeleft = document.getElementById('img_snakeleft');
		this.bodyImage = document.getElementById('img_body');
		this.gameWidth = game.gameWidth;
		this.gameHeight = game.gameHeight;
		this.game = game;
		this.position = [{x: 10, y: 10, oldx: 0, oldy: 0}];
		this.size = 25;
		this.length = 0;
	}
	draw(ctx) {
		for (let i = 0; i <= this.length; i++) {
			if (i == 0) {
				switch (speedCheck) {
					case 0:
					  ctx.drawImage(this.image, this.position[i].x, this.position[i].y, this.size, this.size);
					  break;
					case 1:
					  ctx.drawImage(this.snakeleft, this.position[i].x, this.position[i].y, this.size, this.size);
					  break;
					case 2:
					  ctx.drawImage(this.image, this.position[i].x, this.position[i].y, this.size, this.size);
					  break;
					case 3:
					  ctx.drawImage(this.snakeup, this.position[i].x, this.position[i].y, this.size, this.size);
					  break;
					case 4:
					  ctx.drawImage(this.snakedown, this.position[i].x, this.position[i].y, this.size, this.size);
					  break;
				}
			}
			else {
				ctx.drawImage(this.bodyImage, this.position[i].x, this.position[i].y, this.size, this.size);
			}
		}
	}
	update(deltaTime) {
		switch (speedCheck) {
			case 0:
			  this.position[0].x = this.position[0].x; 
			  this.position[0].y = this.position[0].y;
			  break;
			case 1:
			  for (let i = 0; i <= this.length; i++) {
			    this.position[i].oldx = this.position[i].x;
			    this.position[i].oldy = this.position[i].y;
		      }
		      this.position[0].x = this.position[0].x - this.size;
		      for (let i = 1; i <= this.length; i++) {
			    this.position[i].x = this.position[i - 1].oldx;
			  this.position[i].y = this.position[i - 1].oldy;
		      }
			  break;
			case 2:
			  for (let i = 0; i <= this.length; i++) {
			    this.position[i].oldx = this.position[i].x;
			    this.position[i].oldy = this.position[i].y;
		      }
		      this.position[0].x = this.position[0].x + this.size;
		      for (let i = 1; i <= this.length; i++) {
			    this.position[i].x = this.position[i - 1].oldx;
			    this.position[i].y = this.position[i - 1].oldy;
		      }
			  break;
			case 3:
			  for (let i = 0; i <= this.length; i++) {
			    this.position[i].oldx = this.position[i].x;
			    this.position[i].oldy = this.position[i].y;
		      }
		      this.position[0].y = this.position[0].y - this.size;
		      for (let i = 1; i <= this.length; i++) {
			    this.position[i].x = this.position[i - 1].oldx;
			    this.position[i].y = this.position[i - 1].oldy;
		      }
			  break;
			case 4:
			  for (let i = 0; i <= this.length; i++) {
			    this.position[i].oldx = this.position[i].x;
			    this.position[i].oldy = this.position[i].y;
		      }
		      this.position[0].y = this.position[0].y + this.size;
		      for (let i = 1; i <= this.length; i++) {
			    this.position[i].x = this.position[i - 1].oldx;
			    this.position[i].y = this.position[i - 1].oldy;
		      }
			  break;
		}
		if(this.position[0].x < 0) {
			gameOver();
		}
		if(this.position[0].x + this.size > this.gameWidth) {
			gameOver();
		}
		if(this.position[0].y < 0) {
			gameOver();
		}
		if(this.position[0].y + this.size > this.gameHeight) {
			gameOver();
		}
		if (this.length > 0) {
			for (let i = 1; i <= this.length; i++) {
				if (this.position[0].x < this.position[i].x + this.size && this.position[0].x + this.size > this.position[i].x && this.position[0].y < this.position[i].y + this.size && this.position[0].y + this.size > this.position[i].y) {
					gameOver();
				}
			}
		}
		let bottomOfSnake = this.position[0].y + this.size;
		let topOfSnake = this.position[0].y;
		let rightOfSnake = this.position[0].x + this.size;
		let leftOfSnake = this.position[0].x;
		let topOfMela = this.game.mela.position.y;
		let bottomOfMela = this.game.mela.position.y + this.game.mela.size;
		let rightOfMela = this.game.mela.position.x + this.game.mela.size;
		let leftOfMela = this.game.mela.position.x;
		if(leftOfSnake < rightOfMela && rightOfSnake > leftOfMela && topOfSnake < bottomOfMela && bottomOfSnake > topOfMela) {
			progresso = 1;
			this.position[this.position.length] = {x: this.position[this.length].x, y: this.position[this.length].y + this.size, oldx: 0, oldy: 0};
			this.length++;
			if (this.length == 4) {
				fps++;
			}
			else if (this.length == 8) {
				fps += 2;
			}
			else if (this.length == 12) {
				fps += 2;
			}
			else if (this.length == 16) {
				fps++;
			}
			else if (this.length == 20) {
				fps += 2;
			}
			eat.play();
			score++;
			document.getElementById('score').innerHTML = score;
		}
	}
}
class InputHandler {
	constructor(game) {
		this.game = game;
		document.addEventListener('keydown', (event) => {
			switch (event.keyCode) {
				case 37:
				  if (this.game.snake.length > 0) {
					  if (lastKey != 2) {
					  speedCheck = 1;
					  lastKey = 1;
				    }
				  }
				  else {
					  speedCheck = 1;
					  lastKey = 1;
				  }
				  break;
				case 39:
				  if (this.game.snake.length > 0) {
					  if (lastKey != 1) {
					  speedCheck = 2;
					  lastKey = 2;
				    }
				  }
				  else {
					  speedCheck = 2;
					  lastKey = 2;
				  }
				  break;
				case 38:
				  if (this.game.snake.length > 0) {
					  if (lastKey != 4) {
					  speedCheck = 3;
					  lastKey = 3;
				    }
				  }
				  else {
					  speedCheck = 3;
					  lastKey = 3;
				  }
				  break;
				case 40:
				  if (this.game.snake.length > 0) {
					  if (lastKey != 3) {
					  speedCheck = 4;
					  lastKey = 4;
				    }
				  }
				  else {
					  speedCheck = 4;
					  lastKey = 4;
				  }
				  break;
			}
		});
	}
}
class Mela {
	constructor(game) {
		this.image = document.getElementById('img_mela');
		this.gameWidth = game.gameWidth;
		this.gameHeight = game.gameHeight;
		this.position = {x: 50, y: 50};
		this.size = 25;
	}
	draw(ctx) {
		ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
	}
	update(deltaTime) {
		if (progresso == 1) {
			this.position.x = Math.random() * ((this.gameWidth - (3 * this.size)) - (3 * this.size)) + (3 * this.size);
			this.position.y = Math.random() * ((this.gameHeight - (3 * this.size)) - (3 * this.size)) + (3 * this.size);
			progresso = 0;
		}
	}
}
class Game {
	constructor(GAME_WIDTH, GAME_HEIGHT) {
		this.gameWidth = GAME_WIDTH;
		this.gameHeight = GAME_HEIGHT;
	}
	start() {
		this.mela = new Mela(this);
		this.snake = new Snake(this);
		this.gameObjects = [this.mela, this.snake];
		new InputHandler(this);
	}
	update(deltaTime) {
		if (gameState == 0) {
			this.gameObjects.forEach((object) => object.update(deltaTime));	
		}
		else {
			return;
		}			
	}
	draw(ctx) {
		if (gameState == 0) {
			this.gameObjects.forEach((object) => object.draw(ctx));
		}
		else {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
		    ctx.fillStyle = "rgba(0, 0, 0.1)";
		    ctx.fill();
		    ctx.font = "15px Arial";
		    ctx.fillStyle = "white";
		    ctx.textAlign = "center";
		    ctx.fillText("Game Over! Premi Invio per riprovare", this.gameWidth / 2, this.gameHeight / 2);
			document.addEventListener('keydown', (event) => {
			switch (event.keyCode) {
				case 13:
				  gameState = 0;
				  speedCheck = 0;
                  fps = 10;
                  lastKey = 0;
				  progresso = 0;
				  game.start();
				  break;
			}
		});
		}
	}
}
let game = new Game(gameWidth, gameHeight);
game.start();
let lastTime = 0;
function gameLoop(timestamp) {
	let deltaTime = timestamp - lastTime;
	if (timestamp < lastTime + (1000 / fps)) {
		requestAnimationFrame(gameLoop);
		return;
	}
	lastTime = timestamp;
	ctx.clearRect(0, 0, gameWidth, gameHeight);
	game.update(deltaTime);
	game.draw(ctx);
	requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);