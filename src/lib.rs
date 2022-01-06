use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

// Use `wee_alloc` as the global allocator.
#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum Direction {
  Up,
  Right,
  Down,
  Left
}

#[derive(Clone)]
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
  snake: Snake
}

#[wasm_bindgen]
impl World {
  pub fn new(width: usize, snake_idx: usize) -> World {
    World {
      width,
      size: width * width,
      snake: Snake::new(snake_idx, 3)
    }
  }

  pub fn width(&self) -> usize {
    self.width
  }
  
  pub fn snake_head_idx(&self) -> usize {
    self.snake.body[0].0
  }

  pub fn change_snake_dir(&mut self, direction: Direction) {
    let next_cell = self.gen_next_snake_cell(&direction);

    if self.snake.body[1].0 == next_cell.0 { return; }
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
    let temp = self.snake.body.clone();
    let next_cell = self.gen_next_snake_cell(&self.snake.direction);
    let len = self.snake.body.len();

    self.snake.body[0] = next_cell;
    for i in 1..len {
      self.snake.body[i] = SnakeCell(temp[i - 1].0);
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