/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#de8119',
				'background-light': '#333333',
				'background-dark': '#1f1f1f'
			}
		}
	},
	plugins: []
};
