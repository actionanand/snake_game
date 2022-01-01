/* tslint:disable */
/* eslint-disable */
/**
*/
export class World {
  free(): void;
/**
* @returns {World}
*/
  static new(): World;
/**
* @returns {number}
*/
  width(): number;
/**
* @returns {number}
*/
  snake_head_idx(): number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_world_free: (a: number) => void;
  readonly world_new: () => number;
  readonly world_width: (a: number) => number;
  readonly world_snake_head_idx: (a: number) => number;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
