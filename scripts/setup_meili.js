import { MeiliSearch } from 'meilisearch';
import dotenv from 'dotenv';

dotenv.config();

const client = new MeiliSearch({
	host: process.env.PUBLIC_MEILI_HOST,
	apiKey: process.env.MEILI_MASTER_KEY
});

client
	.createIndex('spinners', { primaryKey: 'id' })
	.catch((e) => console.log(`Failed to create index : ${e}`))
	.then(() => console.log('Created index'));
client
	.index('spinners')
	.updateFilterableAttributes(['board'])
	.catch((e) => console.log(`Failed to update filterable attributes : ${e}`))
	.then(() => console.log('Updated filterable attributes'));
client
	.index('spinners')
	.updateSearchableAttributes(['name', 'aliases', 'twitter_id', 'youtube_id'])
	.catch((e) => console.log(`Failed to update searchable attributes : ${e}`))
	.then(() => console.log('Updated searchable attributes'));
client
	.index('spinners')
	.updateDisplayedAttributes(['name', 'aliases', 'board', 'twitter_id', 'youtube_id'])
	.catch((e) => console.log(`Failed to update displayed attributes : ${e}`))
	.then(() => console.log('Updated displayed attributes'));
client
	.index('spinners')
	.updateDistinctAttribute('name')
	.catch((e) => console.log(`Failed to update distinct attributes : ${e}`))
	.then(() => console.log('Updated distinct attributes'));
client
	.index('spinners')
	.updateTypoTolerance({
		minWordSizeForTypos: {
			oneTypo: 2,
			twoTypos: 4
		}
	})
	.catch((e) => console.log(`Failed to update typo tolerance : ${e}`))
	.then(() => console.log('Updated typo tolerance'));
