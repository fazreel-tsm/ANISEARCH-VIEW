module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
		extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        'bg-input': 'var(--bg-input)',
        border: 'var(--border)',
        glow: 'var(--glow)',
        header: 'var(--header)',
        text: 'var(--text)',
        placeholder: 'var(--placeholder)',
      }
    }
  },
  plugins: []
}
