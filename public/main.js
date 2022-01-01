import init, { greet } from "../pkg/snake_game.js";

init()
.then(_ => {
  greet("Anand");
  // alert('Hi');
});