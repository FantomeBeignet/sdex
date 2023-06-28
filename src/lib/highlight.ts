import type { HighlightedParts, Hit, HitAttributeHighlightResult } from 'instantsearch.js';
import {
	getPropertyByPath,
	unescape,
	toArray,
	getHighlightedParts
} from 'instantsearch.js/es/lib/utils';
import type { SpinnerInfo } from './hitstore';

export const highlight = (hit: Hit<SpinnerInfo>, attribute: keyof SpinnerInfo, base: string) => {
	const highlightPreTag = '<span class="text-primary">';
	const highlightPostTag = '</span>';
	const property: HitAttributeHighlightResult | HitAttributeHighlightResult[] =
		getPropertyByPath(hit._highlightResult, attribute as string) || [];
	const properties = toArray(property);

	const parts = properties.map(({ value }) => getHighlightedParts(unescape(value || '')));
	return parts
		.map(
			(part) =>
				`<span class=${base}>${part
					.map((subpart) =>
						subpart.isHighlighted
							? highlightPreTag + subpart.value + highlightPostTag
							: subpart.value
					)
					.join('')}</span>`
		)
		.join(', ');
};
