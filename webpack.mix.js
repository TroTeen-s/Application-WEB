const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .react()
    .disableNotifications()
    .setResourceRoot("/")
    .disableSuccessNotifications()
    .sass('resources/sass/app.scss', 'public/css')
    .postCss('resources/css/app.css', 'public/css', [
        require('tailwindcss'),
        require('autoprefixer'),
    ]);
    
