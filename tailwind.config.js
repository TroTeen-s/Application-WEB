module.exports = {
  content: [
    './storage/framework/views/*.php',
    "./resources/**/*.blade.php",
    './resources/**/*.js',
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        'orange-300': '#FF9900',
        'black-trot': '#353535',
        'white-background' : '#ffffff',
      },
      BackgroundImage : {
          'Europe':"url('resources/js/components/main/Images/Europe.png')",
      }
    },
  },
  plugins: [],
}
