<script lang="ts">
	import { PUBLIC_MEILI_HOST, PUBLIC_MEILI_SEARCH_KEY } from '$env/static/public';

	import { MatchingStrategies, instantMeiliSearch } from '@meilisearch/instant-meilisearch';
	import instantsearch from 'instantsearch.js';
	import { searchBox, hits, configure, stats, pagination } from 'instantsearch.js/es/widgets';
	import { singleIndex } from 'instantsearch.js/es/lib/stateMappings';
	import { onMount } from 'svelte';

	onMount(() => {
		const searchClient = instantMeiliSearch(PUBLIC_MEILI_HOST, PUBLIC_MEILI_SEARCH_KEY, {
			matchingStrategy: 'all' as MatchingStrategies
		});
		const search = instantsearch({
			indexName: 'spinners',
			searchClient: searchClient,
			routing: {
				stateMapping: singleIndex('spinners')
			}
		});

		search.addWidgets([
			configure({
				typoTolerance: true,
				minWordSizefor1Typo: 2,
				minWordSizefor2Typos: 4,
			}),

			stats({
				container: '#stats',
				cssClasses: {
					root: 'flex items-center justify-center text-center',
					text: 'text-gray-light text-sm'
				}
			}),

			searchBox({
				container: '#searchbox',
				placeholder: 'Search for spinners',
				showReset: false,
				showLoadingIndicator: false,
				cssClasses: {
					root: 'w-full',
					form: 'flex border-2 border-primary rounded-md',
					input: 'flex-grow p-4 bg-background-dark text-gray-extralight rounded-md',
					submit: 'p-4',
					submitIcon: 'text-gray-light fill-current h-4 w-4'
				}
			}),

			hits({
				container: '#hits',
				cssClasses: {
					root: 'w-full text-gray-extralight',
					list: 'w-full flex flex-col items-center justify-center gap-2',
					item: 'flex w-full p-3 text-gray-extralight border-2 border-background-light hover:border-primary rounded-lg'
				},
				templates: {
					item(hit, { html, components }) {
						return html`
							<div class="flex flex-col items-start justify-center">
								<h2>
									${components.Highlight({
										attribute: 'name',
										highlightedTagName: 'span',
										cssClasses: {
											highlighted: 'text-primary',
											nonHighlighted: 'text-gray-extralight'
										},
										hit
									})}
								</h2>
								<span class="text-gray-light text-sm">${hit.aliases}</span>
							</div>
						`;
					},
					empty(_, { html }) {
						return html`<div class="text-lg text-gray-light text-center">No spinners found</div>`;
					}
				}
			}),

			pagination({
				container: '#pagination',
				showFirst: false,
				showLast: false,
				cssClasses: {
					root: 'text-gray-medium text-lg border-2 border-background-light rounded-md py-3 px-4',
					list: 'flex items-center justify-center gap-6',
					link: 'hover:text-gray-light',
					selectedItem: 'text-gray-light',
					disabledItem: 'text-background-light'
				},
			})
		]);
		search.start();
	});
</script>

<main class="bg-background-dark grid place-items-center py-10 md:py-16 px-6">
	<div class="flex flex-col justify-center items-center gap-6 md:gap-12 w-full md:w-2/3">
		<div class="flex flex-col items-center justify-center gap-2">
			<div id="searchbox" class="w-full" />
			<div id="stats" class="w-full" />
		</div>
		<div id="hits" class="w-full" />
		<div id="pagination" />
	</div>
</main>
