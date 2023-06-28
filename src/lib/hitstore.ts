import type { BaseHit, Hit } from 'instantsearch.js';
import { writable } from 'svelte/store';

export type SpinnerInfo = {
	name: string,
	aliases: string[],
	twitter_id: string,
	youtube_id: string,
	board: string
}

export const hitStore = writable<Hit<SpinnerInfo>[]>([]);
