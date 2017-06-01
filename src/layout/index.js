/**
A generic force-directed layout class
*/

const assign = require('../assign');
const defaults = require('./defaults');
const makeBoundingBox = require('./make-bb');
const { setInitialNodePosition, refreshPositions, getNodePositionData } = require('./position');
const { multitick } = require('./tick');

class Layout {
  constructor( options ){
    let o = this.options = assign( {}, defaults, options );

    let s = this.state = assign( {}, o, {
      layout: this,
      nodes: o.eles.nodes(),
      edges: o.eles.edges(),
      tickIndex: 0,
      firstUpdate: true
    } );

    s.animateEnd = o.animate && o.animate === 'end';
    s.animateContinuously = o.animate && !s.animateEnd;
  }

  run(){
    let l = this;
    let s = this.state;

    s.tickIndex = 0;
    s.firstUpdate = true;

    s.running = true;

    s.currentBoundingBox = makeBoundingBox( s.boundingBox, s.cy );

    if( s.ready ){ l.one( 'ready', s.ready ); }
    if( s.stop ){ l.one( 'stop', s.stop ); }

    s.nodes.forEach( n => setInitialNodePosition( n, s ) );

    if( s.animateContinuously ){
      let fit = () => {
        if( s.fit && s.animateContinuously ){
          s.cy.fit( s.padding );
        }
      };

      let onNotDone = () => {
        refreshPositions( s.nodes );
        fit();

        requestAnimationFrame( frame );
      };

      let frame = function(){
        multitick( s, onNotDone, onDone );
      };

      let onDone = () => {
        refreshPositions( s.nodes );
        fit();

        s.running = false;

        l.emit('layoutstop');
      };

      l.emit('layoutstart');

      frame(); // kick off
    } else {
      multitick( s );

      s.eles.layoutPositions( this, s, getNodePositionData );
    }

    return this; // chaining
  }

  stop(){
    this.state.running = false;

    return this; // chaining
  }

  destroy(){
    return this; // chaining
  }
}

module.exports = Layout;
