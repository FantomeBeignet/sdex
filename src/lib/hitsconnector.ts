import connectHits from 'instantsearch.js/es/connectors/hits/connectHits';
import { hitStore, type SpinnerInfo } from './hitstore';
import type { Hit } from 'instantsearch.js';

const makeHits = connectHits(function renderHits({ hits }, _) {
	hitStore.set(hits as Hit<SpinnerInfo>[]);
});

export { makeHits };
