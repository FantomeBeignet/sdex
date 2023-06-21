/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#de8119',
				'background-light': '#333333',
				'background-dark': '#1f1f1f',
				'gray-extralight': '#f2f2f2',
				'gray-light': '#a6a6a6',
				'gray-medium': '#737373',
				'gray-dark': '#404040'
			}
		}
	},
	plugins: []
};
