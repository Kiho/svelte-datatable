import { writable } from 'svelte/store';
import { produce } from 'immer';

// WORKAROUND for immer.js esm (see https://github.com/immerjs/immer/issues/557)
window.process = {
	env: {
		NODE_ENV: "production"
	}
};

export function immerStore(value) {
	const { set, update, subscribe } = writable(value);
	
	return {
		set,
		update: fn => update(n => produce(n, fn)),
		subscribe
	};
}