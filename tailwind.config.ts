// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dynamic: 'var(--color)',
      },
      backgroundColor: {
        'dynamic/10': 'color-mix(in srgb, var(--color) 10%, transparent)',
      },
    },
  },
}
