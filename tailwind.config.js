/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0A246A',
                'primary-dark': '#06184a',
                accent: '#C5A059',
                'accent-hover': '#b08d48',
                base: '#F5F5F7',
                nature: '#2E8B57',
            },
            fontFamily: {
                sans: ['"Noto Sans JP"', 'sans-serif'],
                serif: ['"Noto Serif JP"', 'serif'],
            }
        },
    },
    plugins: [],
}
