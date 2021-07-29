import { writable } from 'svelte/store';
import { produce } from 'immer';

export function immerStore(value) {
	const { set, update, subscribe } = writable(value);
	
	return {
		set,
		update: fn => update(n => produce(n, fn)),
		subscribe
	};
}