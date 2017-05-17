# cytoscape-euler


## Description

Euler is a fast, high-quality force-directed (physics simulation) layout for Cytoscape.js


## Contribution guidelines

Please refer to [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).


## Mozilla Global Sprint 2017 instructions

The goal of this project is to create a fast, high quality force-directed layout for Cytoscape.js.  Cytoscape.js has several force-directed layouts already, but there is a need for a small filesize, fast-running, high quality layout.  The existing layouts have tradeoffs, like prioritising speed over quality.

The layout should:

- be fast;
- give high quality results for non-compound graphs;
- have a relatively small filesize (ideally <10KB);
- have lots of options for configuring / fine-tuning the layout;
- have basic support for compound graphs;

These requirements would make Euler fit in a currently unfilled niche in the set of Cytoscape.js layouts.  A layout that meets these requirements would be very useful to scientists and commercial developers.

The [`ngraph.asyncforce`](https://github.com/anvaka/ngraph.asyncforce) package has an existing MIT-licensed layout algorithm.  Though the algorithm is good, it's not very customisable and it requires a build-step for users.  That means a lot of users (especially scientists) can't use it.  

[`ngraph.forcelayout`](https://github.com/Nickolasmv/cytoscape-ngraph.forcelayout) is a package that uses `ngraph.asyncforce` and packages it as a Cytoscape layout, but it has some tradeoffs that make that package not meet our requirements:  The layout is very large (500KB) and not very customisable, but it's fast and gives good results.

That means we could use the essential bits of the algorithm from [`ngraph.asyncforce`](https://github.com/anvaka/ngraph.asyncforce) to build the Euler layout, and we could use [`ngraph.forcelayout`](https://github.com/Nickolasmv/cytoscape-ngraph.forcelayout) as a test to make sure the algorithm is ported correctly.  By then adding springs to keep the descendants of each compound node together, we'll have met all of the project requirements.  Any additional time that's left can be used to add new features to the layout, probably features identified as nice-to-have during testing or ones that project participants think up.

The tasks to complete the layout project are in the [`mozsprint2017`](https://github.com/cytoscape/cytoscape.js-euler/milestone/1) milestone.


## Dependencies

 * Cytoscape.js ^3.0.0


## Usage instructions

Download the library:
 * via npm: `npm install cytoscape-euler`,
 * via bower: `bower install cytoscape-euler`, or
 * via direct download in the repository (probably from a tag).

`require()` the library as appropriate for your project:

CommonJS:
```js
var cytoscape = require('cytoscape');
var euler = require('cytoscape-euler');

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

TODO describe the options that the Euler layout supports.


## Publishing instructions

This project is set up to automatically be published to npm and bower.  To publish:

1. Set the version number environment variable: `export VERSION=1.2.3`
1. Publish: `gulp publish`
1. If publishing to bower for the first time, you'll need to run `bower register cytoscape-euler https://github.com/cytoscape/cytoscape.js-euler.git`
