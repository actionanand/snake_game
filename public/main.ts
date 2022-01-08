import init, { World, Direction } from '../pkg/ar_snake_game';
import { GamesStatus } from '../pkg/ar_snake_game';
import { rnd } from './utils/rnd';

init()
.then(wasm => {
  const CELL_SIZE = 20;
  const WORLD_WIDTH = 13;
  const snakeSpawnIdx = rnd(WORLD_WIDTH * WORLD_WIDTH);

  const world = World.new(WORLD_WIDTH, snakeSpawnIdx);
  const worldWidth = world.width(); 

  const gameControlBtn = document.getElementById('game-control-btn');
  const gameStatus = document.getElementById('game-status');
  const gamePoints = document.getElementById('game-points');
  const btnUp = document.getElementById('key-up');
  const btnDown = document.getElementById('key-down');
  const btnLeft = document.getElementById('key-left');
  const btnRight = document.getElementById('key-right');

  const canvas = <HTMLCanvasElement> document.getElementById('snake-canvas');
  const ctx = canvas.getContext('2d');

  const myColors = {
    '--green-bg': `#15883e`,
    '--green-lite': '#1db954',
    '--my-red': '#ff0000',
    '--my-purple': '#7878db'
  }

  canvas.height = worldWidth * CELL_SIZE;
  canvas.width = worldWidth * CELL_SIZE;

  gameControlBtn.addEventListener('click', _ => {
    const status = world.game_status();
    if (status === undefined) {
      gameControlBtn.textContent = 'Playing...'
      world.start_game();
      play();
    } else {
      location.reload();
    }

  });

  document.addEventListener('keydown', (event) => {
    // console.log(event.code);
    switch(event.code) {
      case 'ArrowUp':
      case 'KeyW':
        world.change_snake_dir(Direction.Up);
        break;
      case 'ArrowRight':
      case 'KeyD':
        world.change_snake_dir(Direction.Right);
        break;
      case 'ArrowDown':
      case 'KeyS':
        world.change_snake_dir(Direction.Down);
        break;
      case 'ArrowLeft':
      case 'KeyA':
        world.change_snake_dir(Direction.Left);
        break;
    }
  });

  btnUp.addEventListener('click', _ => {
    world.change_snake_dir(Direction.Up);
  });

  btnDown.addEventListener('click', _ => {
    world.change_snake_dir(Direction.Down);
  });

  btnLeft.addEventListener('click', _ => {
    world.change_snake_dir(Direction.Left);
  });

  btnRight.addEventListener('click', _ => {
    world.change_snake_dir(Direction.Right);
  });

  function drawWorld() {
    ctx.beginPath();

    for(let x = 0; x < worldWidth + 1; x++) {
      ctx.moveTo(CELL_SIZE * x, 0);
      ctx.lineTo(CELL_SIZE * x, worldWidth * CELL_SIZE);
    }

    for(let y = 0; y < worldWidth + 1; y++) {
      ctx.moveTo(0, CELL_SIZE * y);
      ctx.lineTo(worldWidth * CELL_SIZE, CELL_SIZE * y);
    }

    ctx.stroke();
  }

  function drawReward() {
    const reward_idx = world.reward_cell();
    const col = reward_idx % worldWidth;
    const row = Math.floor(reward_idx / worldWidth);

    ctx.beginPath();
    ctx.fillStyle = myColors['--my-purple'];
    ctx.fillRect(
      col * CELL_SIZE,
      row * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
    ctx.stroke();
  }

  function drawSnake() {
    const snakeCellPtr = world.snake_cells();
    const snakeLen = world.snake_length();

    const snakeCells = new Uint32Array(
      wasm.memory.buffer,
      snakeCellPtr,
      snakeLen
    );

    snakeCells
    .filter((cellIdx, i) => !(i > 0 && cellIdx === snakeCells[0])) // removing the clashing snake body cell to show snake head; this is filter-out method
    .forEach((cellIdx, i) => {
      const col = cellIdx % worldWidth;
      const row = Math.floor(cellIdx / worldWidth);

      ctx.fillStyle = i === 0 ? myColors['--my-red'] : myColors['--green-lite'];
  
      ctx.beginPath();
      ctx.fillRect(
        col * CELL_SIZE,
        row * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });


    ctx.stroke();
  }

  function drawGameStatus() {
    gameStatus.textContent = world.game_status_text();
    gamePoints.textContent = world.points().toString();
  }

  function paint() {
    drawWorld();
    drawSnake();
    drawReward();
    drawGameStatus();
  }

  function play() {
    const status = world.game_status();
    if(status == GamesStatus.Won || status == GamesStatus.Lost) {
      gameControlBtn.textContent = 'Re-Play';
      drawGameStatus();
      return;
    }

    const fps = 3;
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      paint();
      world.step();
      requestAnimationFrame(play);
    }, 1000/fps);
  }

paint();
});