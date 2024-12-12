/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      
      colors: {
        'primary': '#609ed6',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(232, 232, 232, 0) 0%, rgba(232, 232, 232, 0.714286) 25%, #E8E8E8 49%, rgba(232, 232, 232, 0.784314) 73.5%, rgba(232, 232, 232, 0) 100%)',
        'custom-gradient-2': 'linear-gradient(90deg, rgba(232, 232, 232, 0) 0%, rgba(232, 232, 232, 0.714286) 25%, #E8E8E8 49%, rgba(232, 232, 232, 0.784314) 73.5%, rgba(232, 232, 232, 0) 100%)',
      },    
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Ganti font sans
        heading: ['Roboto', 'sans-serif'], // Tambahkan keluarga font baru
      },  
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [    
    function ({ addComponents }) {
      addComponents({
        '.primary-color': {
          color: '#609ed6', // 
        },
        '.button-blue': {
          color: '#609ed6', // Text biru
          border: '1px solid #609ed6',
          backgroundColor: 'transparent',
          borderRadius: '0.375rem', // rounded-lg
          padding: '0.625rem 1.25rem', // px-5 py-2.5
          textAlign: 'center',
          fontSize: '0.875rem', // text-sm
          fontWeight: '500', // font-medium
          '&:hover': {
            backgroundColor: '#609ed6', // bg-blue-800
            color: '#FFF', // hover:text-white
          },
        },
        '.button-dark': {
          color: '#111827', // text-gray-900
          border: '1px solid #374151',
          backgroundColor: 'transparent',
          borderRadius: '0.375rem',
          padding: '0.625rem 1.25rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '500',
          '&:hover': {
            backgroundColor: '#1F2937', // bg-gray-900
            color: '#FFF', // hover:text-white
          },
        },
        '.button-white': {
          color: '#111827', // text-gray-900
          border: '1px solid #374151',
          backgroundColor: 'transparent',
          borderRadius: '0.375rem',
          padding: '0.625rem 1.25rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '500',
          '&:hover': {
            backgroundColor: '#1F2937', // bg-gray-900
            color: '#FFF', // hover:text-white
          },
        },
        '.button-red': {
          color: '#DC2626',
          border: '1px solid #DC2626',
          backgroundColor: 'transparent',
          borderRadius: '0.375rem',
          padding: '0.625rem 1.25rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '500',
          '&:hover': {
            backgroundColor: '#DC2626',
            color: '#FFF',
          },
        },
      });
    },
  ],
}

