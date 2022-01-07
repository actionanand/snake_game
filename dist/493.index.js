"use strict";(self.webpackChunksnake_game=self.webpackChunksnake_game||[]).push([[493],{493:(e,t,n)=>{let r;n.r(t);let a=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});a.decode();let o=null;function s(e,t){return a.decode((null!==o&&o.buffer===r.memory.buffer||(o=new Uint8Array(r.memory.buffer)),o).subarray(e,e+t))}let i=null;function _(){return null!==i&&i.buffer===r.memory.buffer||(i=new Int32Array(r.memory.buffer)),i}const c=Object.freeze({Up:0,0:"Up",Right:1,1:"Right",Down:2,2:"Down",Left:3,3:"Left"}),l=Object.freeze({Won:0,0:"Won",Lost:1,1:"Lost",Played:2,2:"Played"});class d{static __wrap(e){const t=Object.create(d.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();r.__wbg_world_free(e)}static new(e,t){var n=r.world_new(e,t);return d.__wrap(n)}width(){return r.world_width(this.ptr)>>>0}points(){return r.world_points(this.ptr)>>>0}reward_cell(){try{const n=r.__wbindgen_add_to_stack_pointer(-16);r.world_reward_cell(n,this.ptr);var e=_()[n/4+0],t=_()[n/4+1];return 0===e?void 0:t>>>0}finally{r.__wbindgen_add_to_stack_pointer(16)}}snake_head_idx(){return r.world_snake_head_idx(this.ptr)>>>0}start_game(){r.world_start_game(this.ptr)}game_status(){var e=r.world_game_status(this.ptr);return 3===e?void 0:e}game_status_text(){try{const n=r.__wbindgen_add_to_stack_pointer(-16);r.world_game_status_text(n,this.ptr);var e=_()[n/4+0],t=_()[n/4+1];return s(e,t)}finally{r.__wbindgen_add_to_stack_pointer(16),r.__wbindgen_free(e,t)}}change_snake_dir(e){r.world_change_snake_dir(this.ptr,e)}snake_length(){return r.world_snake_length(this.ptr)>>>0}snake_cells(){return r.world_snake_cells(this.ptr)}step(){r.world_step(this.ptr)}}(async function e(t){void 0===t&&(t=new URL(n(482),n.b));const a={wbg:{}};a.wbg.__wbg_rnd_d0b99aeca37e4e54=function(e){var t;return t=e>>>0,Math.floor(Math.random()*t)},a.wbg.__wbindgen_throw=function(e,t){throw new Error(s(e,t))},("string"==typeof t||"function"==typeof Request&&t instanceof Request||"function"==typeof URL&&t instanceof URL)&&(t=fetch(t));const{instance:o,module:i}=await async function(e,t){if("function"==typeof Response&&e instanceof Response){if("function"==typeof WebAssembly.instantiateStreaming)try{return await WebAssembly.instantiateStreaming(e,t)}catch(t){if("application/wasm"==e.headers.get("Content-Type"))throw t;console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",t)}const n=await e.arrayBuffer();return await WebAssembly.instantiate(n,t)}{const n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}}(await t,a);return r=o.exports,e.__wbindgen_wasm_module=i,r})().then((function(e){var t=20,n=(169,Math.floor(169*Math.random())),r=d.new(13,n),a=r.width(),o=document.getElementById("game-control-btn"),s=document.getElementById("game-status"),i=document.getElementById("game-points"),_=document.getElementById("snake-canvas"),f=_.getContext("2d");function u(){s.textContent=r.game_status_text(),i.textContent=r.points().toString()}function w(){var n,o,s,i,_,c;!function(){f.beginPath();for(var e=0;e<a+1;e++)f.moveTo(t*e,0),f.lineTo(t*e,a*t);for(var n=0;n<a+1;n++)f.moveTo(0,t*n),f.lineTo(a*t,t*n);f.stroke()}(),n=r.snake_cells(),o=r.snake_length(),(s=new Uint32Array(e.memory.buffer,n,o)).filter((function(e,t){return!(t>0&&e===s[0])})).forEach((function(e,n){var r=e%a,o=Math.floor(e/a);f.fillStyle=0===n?"#ff0000":"#1db954",f.beginPath(),f.fillRect(r*t,o*t,t,t)})),f.stroke(),_=(i=r.reward_cell())%a,c=Math.floor(i/a),f.beginPath(),f.fillStyle="#7878db",f.fillRect(_*t,c*t,t,t),f.stroke(),u()}function h(){var e=r.game_status();if(e==l.Won||e==l.Lost)return o.textContent="Re-Play",void u();setTimeout((function(){f.clearRect(0,0,_.width,_.height),w(),r.step(),requestAnimationFrame(h)}),1e3/3)}_.height=a*t,_.width=a*t,o.addEventListener("click",(function(e){void 0===r.game_status()?(o.textContent="Playing...",r.start_game(),h()):location.reload()})),document.addEventListener("keydown",(function(e){switch(e.code){case"ArrowUp":case"KeyW":r.change_snake_dir(c.Up);break;case"ArrowRight":case"KeyD":r.change_snake_dir(c.Right);break;case"ArrowDown":case"KeyS":r.change_snake_dir(c.Down);break;case"ArrowLeft":case"KeyA":r.change_snake_dir(c.Left)}})),w()}))},482:(e,t,n)=>{e.exports=n.p+"7a186aebe52443d943fb.wasm"}}]);