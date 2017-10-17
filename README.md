# svelte datatable

This project was created by the [Svelte REPL](https://svelte.technology/repl).

Data Table component was converted to Svelte from [MicroDroid/vue-materialize-datatable](https://github.com/MicroDroid/vue-materialize-datatable) project. 

Paginate component was converted to Svelte from [https://github.com/lokyoung/vuejs-paginate](https://github.com/lokyoung/vuejs-paginate) project.

[See demo here at Heroku(slow)](https://safe-springs-35306.herokuapp.com/)

## Features
 - Sorting, with numerical sorting
 - Pagination - Client & Server Side
 - Fuzzy searching
 - Excel export
 - Printing
 - Custom topbar buttons
 - Flexible data-from-row extractor
 - Follows the Material Design spec
 - Limited support for IE 11(need Object.assign polyfill)

## Requirements
 - [`materialize-css`](https://www.npmjs.com/package/materialize-css) (and **NOT** any other MD library!)
 - Svelte

## Get started

You will need to have [Node.js](https://nodejs.org) installed.

Install the dependencies...

```bash
cd /path/to/this/directory
npm install
```

...then start Rollup:

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.


## Deploying to the web

### With [now](https://zeit.co/now)

Install `now` if you haven't already:

```bash
npm install -g now
```

Then, from within your project folder:

```bash
now
```

As an alternative, use the [Now desktop client](https://zeit.co/download) and simply drag the unzipped project folder to the taskbar icon.

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public
```