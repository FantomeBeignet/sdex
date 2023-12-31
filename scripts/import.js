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

lines.forEach((line) => {
	const info = line.split(',');
	if (info.length != 5) return;
	const [name, aliases, twitter_id, youtube_id, board] = info;
	const aliases_list = aliases.length > 0 ? aliases.split(';') : [];
	const id = createHash('sha1').update(name).digest('hex');

	const importOne = client.index('spinners').addDocuments(
		[
			{
				id: id,
				name: name.trim(),
				aliases: aliases_list,
				twitter_id: twitter_id.trim(),
				youtube_id: youtube_id.trim(),
				board: board.trim().toUpperCase()
			}
		],
		{ primaryKey: 'id' }
	);
	setTimeout(
		() => importOne
			.then(() => console.log(`Imported data for ${name}`))
			.catch((e) => console.log(`Failed to import ${name} : ${e}`)),
		100
	);
});
