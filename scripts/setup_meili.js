import { MeiliSearch } from 'meilisearch';
import dotenv from 'dotenv';

dotenv.config();

const client = new MeiliSearch({
	host: process.env.PUBLIC_MEILI_HOST,
	apiKey: process.env.MEILI_MASTER_KEY
});

client.createIndex('spinners', { primaryKey: 'id' });
client.index('spinners').updateFilterableAttributes(['board']);
client
	.index('spinners')
	.updateSearchableAttributes(['name', 'aliases', 'twitter_name', 'youtube_name']);
client
	.index('spinners')
	.updateDisplayedAttributes([
		'name',
		'aliases',
		'board',
		'twitter_name',
		'twitter_link',
		'youtube_name',
		'youtube_link'
	]);
client.index('spinners').updateDistinctAttribute('name');
client.index('spinners').updateTypoTolerance({
	minWordSizeForTypos: {
		oneTypo: 2,
		twoTypos: 4
	}
});
