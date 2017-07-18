# cytoscape-euler

[![Join the chat at https://gitter.im/cytoscape-js-euler/Lobby](https://badges.gitter.im/cytoscape-js-euler/Lobby.svg)](https://gitter.im/cytoscape-js-euler/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## Description

Euler is a fast, high-quality force-directed (physics simulation) layout for Cytoscape.js


## Dependencies

 * cytoscape@^3.0.0


## Usage instructions

Download the library:
 * via npm: `npm install cytoscape-euler`,
 * via bower: `bower install cytoscape-euler`, or
 * via direct download in the repository (probably from a tag).

Import the library as appropriate for your project:

ES import:
```js
import cytoscape from 'cytoscape';
import euler from 'cytoscape-euler';

cytoscape.use( euler );
```

CommonJS:
```js
let cytoscape = require('cytoscape');
let euler = require('cytoscape-euler');

cytoscape.use( euler );
```

AMD:
```js
require(['cytoscape', 'cytoscape-euler'], function( cytoscape, euler ){
  euler( cytoscape ); // register extension
});
```

Plain HTML/JS has the extension registered for you automatically, because no `require()` is needed.


## API

Specify an options object with `name: 'euler'` to run the layout.  All other fields are optional.  An example with the default options follows:

```js
let defaults = {
  name: 'euler',

  animate: true, // whether to show the layout as it's running; special 'end' value makes the layout animate like a discrete layout
  refresh: 10, // number of ticks per frame; higher is faster but more jerky
  maxIterations: 1000, // max iterations before the layout will bail out
  maxSimulationTime: 4000, // max length in ms to run the layout
  ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
  fit: true, // on every layout reposition of nodes, fit the viewport
  padding: 30, // padding around the simulation
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }

  // layout event callbacks
  ready: function(){}, // on layoutready
  stop: function(){}, // on layoutstop

  // positioning options
  randomize: false // use random node positions at beginning of layout
};

cy.layout( defaults ).run();
```


## Build instructions

* `npm run build` : Build `./src/**` into `cytoscape-euler.js`
* `npm run watch` : Automatically build on changes with live reloading (N.b. you must already have an HTTP server running)
* `npm run dev` : Automatically build on changes with live reloading with webpack dev server
* `npm run lint` : Run eslint on the source

N.b. all builds use babel, so modern ES features can be used in the `src`.


## Publishing instructions

This project is set up to automatically be published to npm and bower.  To publish:

1. Build the extension : `npm run build`
1. Bump the version number and tag: `npm version major|minor|patch`
1. Publish to npm: `npm publish .`
1. If publishing to bower for the first time, you'll need to run `bower register cytoscape-euler https://github.com/cytoscape/cytoscape.js-euler.git`
