use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

// Use `wee_alloc` as the global allocator.
#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen(module = "/public/utils/rnd.js")]
extern {
    fn rnd(max: usize) -> usize;
}

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum Direction {
  Up,
  Right,
  Down,
  Left
}

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub enum GamesStatus {
  Won,
  Lost,
  Played
}

#[derive(PartialEq, Clone, Copy)]
pub struct SnakeCell(usize);

struct Snake {
  body: Vec<SnakeCell>,
  direction: Direction
}

impl Snake {
  fn new(spawn_index: usize, size: usize) -> Snake {
    let mut body = vec!();

    for i in 0..size {
      body.push(SnakeCell(spawn_index - i));
    }

    Snake {
      body,
      direction: Direction::Right
    }
  }
}

#[wasm_bindgen]
pub struct World {
  width: usize,
  size: usize,
  snake: Snake,
  next_cell: Option<SnakeCell>,
  reward_cell: Option<usize>,
  status: Option<GamesStatus>,
  points: usize
}

#[wasm_bindgen]
impl World {
  pub fn new(width: usize, snake_idx: usize) -> World {

    let snake = Snake::new(snake_idx, 3);
    let size = width * width;
    let reward_cell = World::gen_reward_cell(size, &snake.body);

    World {
      width,
      size,
      snake,
      next_cell: None,
      reward_cell,
      status: None,
      points: 0
    }
  }

  fn gen_reward_cell(max: usize, snake_body: &Vec<SnakeCell>) -> Option<usize> {
    let mut reward_cell;  

    loop {
      reward_cell = rnd(max);
      if !snake_body.contains(&SnakeCell(reward_cell)) { break; }
    }

    Some(reward_cell)
  }

  pub fn width(&self) -> usize {
    self.width
  }

  pub fn points(&self) -> usize {
    self.points
  }

  pub fn reward_cell(&self) -> Option<usize> {
    self.reward_cell
  }
  
  pub fn snake_head_idx(&self) -> usize {
    self.snake.body[0].0
  }

  pub fn start_game(&mut self) {
    self.status = Some(GamesStatus::Played);
  }

  pub fn game_status(&self) -> Option<GamesStatus> {
    self.status
  }

  pub fn game_status_text(&self) -> String{
    match self.status {
      Some(GamesStatus::Won) => String::from("You've won!"),
      Some(GamesStatus::Lost) => String::from("You lost the match!"),
      Some(GamesStatus::Played) => String::from("Playing..."),
      None => String::from("No status")
    }
  }

  pub fn change_snake_dir(&mut self, direction: Direction) {
    let next_cell = self.gen_next_snake_cell(&direction);

    if self.snake.body[1].0 == next_cell.0 { return; }

    self.next_cell = Some(next_cell);
    self.snake.direction = direction;
  }

  pub fn snake_length(&self) -> usize {
    self.snake.body.len()
  }

  // can't return a ref. to js because of borrowing rules
  // pub fn snake_cells(&self) -> &Vec<SnakeCell> {
  //   &self.snake.body
  // }

  // *const is row pointer
  // borrowing rules not applied to it
  pub fn snake_cells(&self) -> *const SnakeCell {
    self.snake.body.as_ptr()
  }

  pub fn step(&mut self) {

    match self.status {
      Some(GamesStatus::Played) => {
        let temp = self.snake.body.clone();

        match self.next_cell {
          Some(cell) => {
            self.snake.body[0] = cell;
            self.next_cell = None;
          },
          None => {
            self.snake.body[0] = self.gen_next_snake_cell(&self.snake.direction);
          }
        }
    
        for i in 1..self.snake_length() {
          self.snake.body[i] = SnakeCell(temp[i - 1].0);
        }

        if self.snake.body[1..self.snake_length()].contains(&self.snake.body[0]) {
          self.status = Some(GamesStatus::Lost);
        }
    
        if self.reward_cell == Some(self.snake_head_idx()) {
          if self.snake_length() < self.size {
            self.points +=1;
            self.reward_cell = World::gen_reward_cell(self.size, &self.snake.body);
          } else {
            self.reward_cell = None;
            self.status = Some(GamesStatus::Won);
          }
          self.snake.body.push(SnakeCell(self.snake.body[1].0)); // pushing index 1 of snake body at the end (the same cell)
        }
      },
      _ => {}
    }

  }

  fn gen_next_snake_cell(&self, direction: &Direction) -> SnakeCell {
    let snake_idx = self.snake_head_idx();
    let row = snake_idx / self.width;

    return match direction {
      Direction::Right => {
        // SnakeCell((row * self.width) + (snake_idx + 1) % self.width)
        let threshold = (row + 1) * self.width;
        if snake_idx + 1 == threshold {
          SnakeCell(threshold - self.width)
        } else {
          SnakeCell(snake_idx + 1)
        }
      },
      Direction::Left => {
        // SnakeCell((row * self.width) + (snake_idx - 1) % self.width)
        let threshold = row * self.width;
        if snake_idx == threshold {
          SnakeCell(threshold + (self.width - 1))
        } else {
          SnakeCell(snake_idx - 1)
        }
      },
      Direction::Up => {
        // SnakeCell((snake_idx - self.width) % self.size)
        let threshold = snake_idx - (row * self.width);
        if snake_idx == threshold {
          SnakeCell((self.size - self.width) + threshold)
        } else {
          SnakeCell(snake_idx - self.width)
        }
      },
      Direction::Down => {
        // SnakeCell((snake_idx + self.width) % self.size)
        let threshold = snake_idx + ((self.width - row) * self.width);
        if snake_idx + self.width == threshold {
          SnakeCell(threshold - (row + 1) * self.width)
        } else {
          SnakeCell(snake_idx + self.width)
        }
      }
    };
  }

}