module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Caminhos corretos para os arquivos do projeto
  ],
  theme: {
    screens: {
      'mobile': '320px',
      // => @media (min-width: 320px) { ... }

      'mobile-md': '375px',
      // => @media (min-width: 375px) { ... }

      'mobile-lp': '425px',
      // => @media (min-width: 767px) { ... }

      'tablet': '768px',
      // => @media (min-width: 768px) { ... }

      'tablet-lp': '1023px',
      // => @media (min-width: 1023px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1440px',
      // => @media (min-width: 1440px) { ... }
    },

  },
  plugins: [],
};
