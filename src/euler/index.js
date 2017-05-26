/**
The implementation of the Euler layout algorithm
*/

const Layout = require('../layout');
const assign = require('object-assign');
const defaults = require('./defaults');

class Euler extends Layout {
  constructor( options ){
    super( assign( {}, defaults, options ) );
  }

  preTick( state ){
    let s = state;

    // do something before each tick
  }

  tickNode( state, positionData ){
    let s = state;
    let p = positionData;

    p.x = Math.random() * 100;
    p.y = Math.random() * 100;
  }

  postTick( state ){
    let s = state;

    // do something after each tick
  }
}

module.exports = Euler;
