let mix = require("laravel-mix");

mix
  .js("src/js/app.js", "dist/js")
  .sass("src/css/app.scss", "css")
  .options({
    postCss: [require("tailwindcss")],
  })
  .setPublicPath("dist");
