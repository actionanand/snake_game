# Snake Game

This is a mini game to learn about `webassembly` with the help of `rust` language. The concept is running old Nokia Snake game in web using rust.

## Rust Tools

  1. `rustup` - a tool for managing different versions of rust
  2. `rustc`  - a tool for compiling rust code
  3. `cargo`  - a tool for managing rust packages and projects
  5. `rustc --version` - to check `rust` version

## How to create a new project?

  1. Binary Project - Executable Program

  ```bash
cargo init
  ```

  2. Library Project - Dependency for other Programs

  ```bash
cargo init --lib
  ```

## Installing dependent packages and spinning up the server

  1. webpack

```bash
npm install -D webpack webpack-cli webpack-dev-server
```

  2. [HTML Webpack Plugin](https://www.npmjs.com/package/html-webpack-plugin)

```bash
npm install -D html-webpack-plugin
```

  3. Add [wasm-bindgen](https://crates.io/crates/wasm-bindgen) to `.toml` file

```
wasm-bindgen = "0.2.78"
```

  4. Add `crate-type = ["cdylib"] ` inside `[lib]` table in`.toml` file.

```
crate-type = ["cdylib"]
```

  5. To build the package, we need an additional tool, `wasm-pack`. This helps compile the code to WebAssembly, as well as produce the right packaging for use in the browser. To download and install it, enter the following command into your terminal:
```bash
cargo install wasm-pack
```

  6. To build the package. We need to type this into our terminal:
```bash
wasm-pack build --target web
```


## How to run this app?

  1. Build rust code as package to be consumed by js
```bash
npm run wasm
```

  2. To serve the web app - development

```bash
npm run serve
```

### VSC extensions

  - [Even Better TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml)
  - [Rust](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust)

### Resources

  * [Rust Package registry](https://crates.io/)
  * [wee_alloc](https://github.com/rustwasm/wee_alloc)