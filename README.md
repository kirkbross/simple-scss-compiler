# Simple SCSS Compiler
A simple, blazing fast Gulp-driven SCSS compiler with `cssnano`, `autoprefixer` and `include-media`

## Setup
### Global packages
- Install [Node](https://nodejs.org/) locally.
- Install [Yarn](https://yarnpkg.com/) locally (or use *npm* which comes with Node pre-installed).
- Install [Gulp](https://gulpjs.com/) globally through `yarn add -g gulp@next` or `npm install -g gulp@next`.

### Local project packages
- Git clone this repo on your computer.
- `cd` into the project folder /.
- Install all [packages](./package.json) with `yarn install` or `npm install`.

## Usage

- Run `yarn start` (or `npm start`) and it will watch all scss files (in scss folder only) and compile automatically when you change a `.scss` file. It will save the compiled `.css` file in the same location.
- The default is `development mode` which is "expanded" CSS. If you want compressed / minified CSS, which is best for production, run `yarn run prod` or `npm run prod`. It will save the minified `.css` file in the same location.
- `autoprefixer` is enabled by default and recommended. This adds vendor prefixes for different browsers, e.g. `display: -ms-flexbox;` when you  put `display: flex;` If you don't want vendor prefixing, you'll have to edit the `gulpfile.js` file and remove it (not recommended).
- Always name partial include files starting with an underscore, e.g. `_fonts.scss` or `_menus.scss`. Save them in the `scss/_partials/` folder and import them into your main scss file with:

`@import '_partials/your_scss_partial_file';`

---

- Also included is a handy library for creating responsive break points. [include-media](https://eduardoboucas.github.io/include-media/#features) is installed and must be imported from the node_modules folder with:

`@import '../node_modules/include-media/dist/include-media';`

- It has flexible naming so you can use whatever naming convention you like. Just be sure to import your breakpoint override file *before* you import the include-media file. E.g.:

```
// _breakpoint_overrides.scss 
$breakpoints: (phone: 320px, tablet: 768px, desktop: 1024px);
```

Then use them like this: 
```
/* Inclusive and exclusive operators for a finer control over the intervals */
@include media(">phone", "<=tablet") {
width: 50%;
}
```

- Rock on.
