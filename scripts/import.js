import { createHash } from 'crypto';
import { readFileSync } from 'fs';
import { MeiliSearch } from 'meilisearch';
import dotenv from 'dotenv';

dotenv.config();

const data = readFileSync('spinners.csv', { encoding: 'utf8' });

let lines = data.split('\n');

const client = new MeiliSearch({
	host: process.env.PUBLIC_MEILI_HOST,
	apiKey: process.env.MEILI_MASTER_KEY
});

await client.index('spinners').deleteAllDocuments();

lines.forEach(async (line) => {
	const info = line.split(',');
	if (info.length != 7) return;
	const [name, aliases, twitter_name, twitter_link, youtube_name, youtube_link, board] = info;
	const aliases_list = aliases.length > 0 ? aliases.split(';') : [];
	const id = createHash('sha1').update(name).digest('hex');

	await client.index('spinners').addDocuments([
		{
			id: id,
			name: name.trim(),
			aliases: aliases_list,
			twitter_name: twitter_name.trim(),
			twitter_link: twitter_link.trim(),
			youtube_name: youtube_name.trim(),
			youtube_link: youtube_link.trim(),
			board: board.trim().toUpperCase()
		}
	]);

	console.log(`Imported data for ${name}`);
});
