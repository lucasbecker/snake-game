const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const box = 32;

const snake = [{ 
  x: 7 * box, 
  y: 7 * box
}];

const food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
};

let direction = 'right';
document.addEventListener('keydown', move);


function createBackground(){
  context.fillStyle = 'lightgreen';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake(){
  for(let i = 0; i < snake.length; i++){
    context.fillStyle = 'green';
    context.fillRect( snake[i].x, snake[i].y, box, box);
  }
}

function createFood(){
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);
}

function move(event){
  if(event.keyCode == 37 && direction != 'right') direction = 'left';
  if(event.keyCode == 38 && direction != 'down') direction = 'up';
  if(event.keyCode == 39 && direction != 'left') direction = 'right';
  if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function startGame(){  

  if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0
  if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
  if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
  if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

  for(let i = 1; i < snake.length; i++){
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
      clearInterval(game);
      alert(`Game over! Sua pontuação é: ${snake.length}`);
    }
  }

  createBackground();
  createSnake();
  createFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  switch(direction){
    case 'right':
      snakeX += box;
      break;
    case 'left':
      snakeX -= box;
      break;
    case 'up':
      snakeY -= box;
      break;
    case 'down':
      snakeY += box;
      break;
    default:
      break;
  }

  // Snake eat food?
  if(snakeX != food.x || snakeY != food.y){
    snake.pop();
  } else{
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = { x: snakeX, y: snakeY}
  
  snake.unshift(newHead);
  
}

let game = setInterval(startGame, 100);