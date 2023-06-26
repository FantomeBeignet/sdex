<script lang="ts">
	import { PUBLIC_MEILI_HOST, PUBLIC_MEILI_SEARCH_KEY } from '$env/static/public';

	import { MatchingStrategies, instantMeiliSearch } from '@meilisearch/instant-meilisearch';
	import instantsearch from 'instantsearch.js';
	import {
		searchBox,
		hits,
		configure,
		stats,
		pagination,
		menuSelect,
		currentRefinements
	} from 'instantsearch.js/es/widgets';
	import { singleIndex } from 'instantsearch.js/es/lib/stateMappings';
	import { onMount } from 'svelte';

	let timerId: number;

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
				minWordSizefor2Typos: 4
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
				},
				queryHook(query, refine) {
					clearTimeout(timerId);
					timerId = setTimeout(() => refine(query), 300);
				}
			}),

			menuSelect({
				container: '#select',
				attribute: 'board',
				cssClasses: {
					select:
						'py-2 px-2.5 border-2 border-primary rounded-sm bg-background-dark text-gray-light'
				},
				templates: {
					item(item, { html }) {
						return html`<option>${item.label} (${item.count})</option>`;
					},
					defaultOption(_data, { html }) {
						return html`Filter by board`;
					}
				}
			}),

			currentRefinements({
				container: '#refinements',
				cssClasses: {
					root: 'text-gray-light',
					label: 'hidden',
					category: 'flex items-center justify-center gap-2 rounded-sm py-1 px-2',
					categoryLabel: 'underline underline-offset-3'
				}
			}),

			stats({
				container: '#stats',
				cssClasses: {
					root: 'h-full flex items-center justify-center text-center',
					text: 'text-gray-light text-sm'
				}
			}),

			hits({
				container: '#hits',
				cssClasses: {
					root: 'w-full text-gray-extralight',
					list: 'w-full flex flex-col items-center justify-center gap-2',
					item: 'flex flex-col gap-3 md:gap-4 w-full p-3 md:p-4 text-gray-extralight border-2 border-background-light hover:border-primary rounded-lg max-w-2xl transition-colors'
				},
				templates: {
					item(hit, { html, components }) {
						console.log(components);
						console.log(hit);
						return html`
							<input type="checkbox" id="chk-${hit.name}" class="sr-only peer" />
							<label
								for="chk-${hit.name}"
								class="flex items-center justify-center w-full hover:cursor-pointer"
							>
								<div class="flex justify-between flex-grow px-1">
									<div class="flex flex-col items-start justify-center">
										<h2 class="text-sm md:text-base">
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
										${hit.aliases.length > 0
											? html`<span class="text-xs md:text-sm text-gray-light"
													>${components.Highlight({
														attribute: 'aliases',
														highlightedTagName: 'span',
														cssClasses: {
															highlighted: 'text-primary',
															nonHighlighted: 'text-gray-light'
														},
														hit
													})}</span
											  >`
											: null}
									</div>
									<div
										class="flex items-center justify-center text-gray-light text-sm md:text-base text-end"
									>
										${hit.board.toUpperCase()}
									</div>
								</div>
								<div class="text-gray-light fill-current p-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-4 h-4"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M19.5 8.25l-7.5 7.5-7.5-7.5"
										/>
									</svg>
								</div>
							</label>
							<div
								class="hidden peer-checked:flex items-center justify-between px-1 text-sm md:text-base"
							>
								<div class="flex items-center justify-start gap-2 w-11/12 overflow-hidden">
									<img src="/twitter.svg" alt="twitter logo" class="h-4 md:h-6 w-4 md:w-6" />
									${hit.twitter_id
										? html`<a
												href="https://twitter.com/${hit.twitter_id}"
												class="text-ellipsis overflow-hidden align-middle whitespace-nowrap underline underline-offset-3 decoration-primary hover:pointer-cursor"
										  >
												<span class="text-gray-light">@</span>
												<span class="text-gray-extralight"
													>${components.Highlight({
														attribute: 'twitter_id',
														highlightedTagName: 'span',
														cssClasses: {
															highlighted: 'text-primary',
															nonHighlighted: 'text-gray-extralight'
														},
														hit
													})}</span
												>
										  </a>`
										: html`<span class="text-gray-light italic">No twitter found.</span>`}
								</div>
								<div class="flex items-center justify-end gap-2 w-11/12 overflow-hidden">
									${hit.youtube_id
										? html`<a
												href="https://youtube.com/@${hit.youtube_id}"
												class="text-ellipsis overflow-hidden align-middle whitespace-nowrap underline underline-offset-3 decoration-primary hover:pointer-cursor"
										  >
												<span class="text-gray-light">@</span>
												<span class="text-gray-extralight"
													>${components.Highlight({
														attribute: 'youtube_id',
														highlightedTagName: 'span',
														cssClasses: {
															highlighted: 'text-primary',
															nonHighlighted: 'text-gray-extralight'
														},
														hit
													})}</span
												>
										  </a>`
										: html`<span class="text-gray-light italic">No youtube found.</span>`}
									<img src="/youtube.svg" alt="youtube logo" class="h-4 md:h-6 w-4 md:w-6" />
								</div>
							</div>
						`;
					},
					empty(_, { html }) {
						return html`<div class="text-lg md:text-xl text-gray-light text-center">
							No spinners found
						</div>`;
					}
				}
			}),

			pagination({
				container: '#pagination',
				showFirst: false,
				showLast: false,
				cssClasses: {
					root: 'text-lg rounded-md text-gray-light',
					list: 'flex items-center justify-center',
					item: 'px-3 py-2 leading-tight border-y-2 border-x border-background-light hover:bg-background-light hover:text-gray-extralight transition-colors',
					selectedItem: 'text-gray-extralight bg-background-light',
					disabledItem:
						'text-background-light hover:text-background-light hover:bg-background-dark',
					previousPageItem: 'rounded-l-md border-l-2',
					nextPageItem: 'rounded-r-md border-r-2'
				}
			})
		]);
		search.start();
	});
</script>

<main class="bg-background-dark grid place-items-center py-10 md:py-16 px-6">
	<div class="flex flex-col justify-center items-center gap-6 md:gap-12 w-full max-w-2xl">
		<div class="flex flex-col items-center justify-center gap-2 w-full">
			<div id="searchbox" class="w-full" />
			<div class="w-full flex items-center justify-center gap-2">
				<div id="select" />
				<div id="refinements" class="flex items-center justify-center" />
			</div>
			<div id="stats" class="w-full" />
		</div>
		<div id="hits" class="w-full" />
		<div id="pagination" />
	</div>
</main>
