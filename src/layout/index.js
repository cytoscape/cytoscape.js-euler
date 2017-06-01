/**
A generic force-directed layout class
*/

const assign = require('object-assign');
const defaults = require('./defaults');
const makeBoundingBox = require('./make-bb');
const { setInitialNodePosition, refreshPositions, getNodePosition } = require('./position');
const { multitick } = require('./tick');

class Layout {
  constructor( options ){
    let o = this.options = assign( {}, defaults, options );

    this.state = assign( {}, o, {
      layout: this,
      nodes: o.eles.nodes(),
      animateEnd: o.animate && o.animate !== 'end',
      animateContinuously: o.animate && !o.animateEnd,
      tickIndex: 0,
      firstUpdate: true
    } );
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
      let onNotDone = () => {
        refreshPositions( s.nodes );

        requestAnimationFrame( frame );
      };

      let frame = function(){
        multitick( s, onNotDone, onDone );
      };

      let onDone = () => {
        s.running = false;

        l.emit('layoutstop');
      };

      l.emit('layoutstart');

      frame(); // kick off
    } else {
      multitick( s );

      s.eles.layoutPositions( this, s, getNodePosition );
    }

    return this; // chaining
  }

  stop(){
    this.state.running = false;

    return this; // chaining
  }

  // these functions would be overridden by subclasses
  preTick( state ){ // eslint-disable-line no-unused-vars
    // do something after all nodes ticked
  }

  postTick( state ){ // eslint-disable-line no-unused-vars
    // do something after all nodes ticked
  }

  tickNode( state, positionData ){ // eslint-disable-line no-unused-vars
    // modify { x, y } in positionData
  }

  destroy(){
    return this; // chaining
  }
}

module.exports = Layout;
