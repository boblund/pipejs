'use strict';

// From "Mastering JavaScript Functional Programming", Federico Kereki
const pipeKereki = (...fns) =>
	fns.reduce((result, f) => 
		(...args) => 
			f(result(...args)));

// Functionally the same as pipeKereki but more clear IMO
const pipe = (f1, ...restFns) =>
	(...args) => 
		restFns.reduce((result, f) => 
			f(result), f1(...args));

const asyncPipe = (...fns) =>
	async (args) => {
    		let _args = args;
			for(let f of fns) {
       				_args = f.constructor.name == 'AsyncFunction' ? await f(_args) : f(_args);
    	}
    return _args;
  }

// From "Mastering JavaScript Functional Programming", Federico Kereki
const tap = fn => x => (fn(x), x)
// Usage:
// const tee = tap(fn)
// pipe(..., tee, ...)(...args)

module.exports = {pipe, asyncPipe, tap}
