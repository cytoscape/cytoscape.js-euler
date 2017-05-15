;(function(){ 'use strict';

  // registers the extension on a cytoscape lib ref
  let register = function( cytoscape, weaver ){

    if( !cytoscape ){ return; } // can't register if cytoscape unspecified

    let defaults = {
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
      randomize: false, // use random node positions at beginning of layout

      // TODO other options

      // infinite layout options
      infinite: false // overrides all other options for a forces-all-the-time mode
    };

    let extend = Object.assign || function( tgt ){
      for( let i = 1; i < arguments.length; i++ ){
        let obj = arguments[i];
        let keys = Object.keys( obj );

        for( let k = 0; k < keys.length; k++ ){
          let key = keys[k];

          tgt[ key ] = obj[ key ];
        }
      }

      return tgt;
    };

    function Layout( options ){
      this.options = extend( {}, defaults, options );
    }

    Layout.prototype.run = function(){
      let layout = this;
      let options = this.options;
      let cy = options.cy;
      let eles = options.eles;
      let nodes = eles.nodes();
      let animate = options.animate;
      let animateEnd = animate && options.animate !== 'end';
      let animateContinuously = animate && !animateEnd;
      let tickIndex = 0;
      let nop = function(){};

      let bb = options.boundingBox || { x1: 0, y1: 0, w: cy.width(), h: cy.height() };
      if( bb.x2 === undefined ){ bb.x2 = bb.x1 + bb.w; }
      if( bb.w === undefined ){ bb.w = bb.x2 - bb.x1; }
      if( bb.y2 === undefined ){ bb.y2 = bb.y1 + bb.h; }
      if( bb.h === undefined ){ bb.h = bb.y2 - bb.y1; }

      let setInitialNodePosition = function( node ){
        let p = node.position();

        node.scratch('euler', options.randomize ? {
          x: bb.x + Math.round( Math.random() * bb.w ),
          y: bb.y + Math.round( Math.random() * bb.h )
        } : {
          x: p.x,
          y: p.y
        });
      };

      let getNodePosition = function( node ){
        return node.scratch('euler');
      };

      // TODO apply forces to this node
      let tickNode = function( node ){
        let p = node.scratch('euler');

        p.x = Math.random();
        p.y = Math.random();
      };

      let tick = function(){
        if( tickIndex >= options.maxIterations ){ return true; }

        nodes.forEach( tickNode );

        if( firstUpdate ){
          if( animateContinuously ){ // indicate the initial positions have been set
            layout.emit('layoutready');
          }
          firstUpdate = false;
        }

        tickIndex++;
      };

      let updatePositions = function(){
        nodes.positions(function( node ){
          let scratch = node.scratch('euler');

          return {
            x: scratch.x,
            y: scratch.y
          };
        });
      };

      let multitick = function( maxTicks, onNotDone, onDone ){
        let done = false;

        for( let i = 0; i < maxTicks; i++ ){
          done = tick();

          if( done ){ break; }
        }

        if( options.fit && animateContinuously ){
          cy.fit( options.padding );
        }

        if( !done ){
          if( onNotDone != null ){ onNotDone(); }
        } else if(  ) {
          if( onDone != null ){ onDone(); }
        }
      };

      if( options.ready ){ layout.one( 'ready', options.ready ); }
      if( options.stop ){ layout.one( 'stop', options.stop ); }

      nodes.forEach( setInitialNodePosition );

      if( animateContinuously ){
        let enqueueNextFrame = function(){
          requestAnimationFrame( frame );
        };

        let frame = function(){
          multitick( options.maxIterations, enqueueNextFrame, onDone );
        };

        let onDone = function(){
          layout.emit('layoutstop');
        };

        layout.emit('layoutstart');

        frame(); // kick off
      } else {
        multitick( options.maxIterations );

        eles.layoutPositions( this, options, getNodePosition );
      }

      return this; // chaining
    };

    Layout.prototype.stop = function(){
      return this; // chaining
    };

    Layout.prototype.destroy = function(){
      return this; // chaining
    };

    cytoscape( 'layout', 'euler', Layout ); // register with cytoscape.js

  };

  if( typeof module !== 'undefined' && module.exports ){ // expose as a commonjs module
    module.exports = function( cytoscape, weaver ){
      register( cytoscape, weaver || require('weaverjs') );
    };
  } else if( typeof define !== 'undefined' && define.amd ){ // expose as an amd/requirejs module
    define('cytoscape-euler', function(){
      return register;
    });
  }

  if( typeof cytoscape !== 'undefined' ){ // expose to global cytoscape (i.e. window.cytoscape)
    register( cytoscape );
  }

})();
