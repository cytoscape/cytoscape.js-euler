/**
The implementation of the Euler layout algorithm
*/

const Layout = require('../layout');
const assign = require('../assign');
const defaults = require('./defaults');
const { tick } = require('./tick');
const { makeQuadtree } = require('./quadtree');
const { makeBody } = require('./body');
const { makeSpring } = require('./spring');
const isFn = fn => typeof fn === 'function';
const notIsParent = n => !n.isParent();
const notIsParentEdge = e => notIsParent( e.source() ) && notIsParent( e.target() );
const getBody = n => n.scratch('euler').body;

const getScratch = el => {
  let scratch = el.scratch('euler');

  if( !scratch ){
    scratch = {};

    el.scratch('euler', scratch);
  }

  return scratch;
};

const optFn = ( opt, ele ) => {
  if( isFn( opt ) ){
    return opt( ele );
  } else {
    return opt;
  }
};

class Euler extends Layout {
  constructor( options ){
    super( assign( {}, defaults, options ) );

    let s = this.state;

    s.quadtree = makeQuadtree();

    let bodies = s.bodies = [];

    s.nodes.filter( notIsParent ).forEach( n => {
      let body = makeBody({
        pos: n.position(),
        mass: optFn( s.mass, n )
      });

      body._cyNode = n;

      let scratch = getScratch( n );

      scratch.body = body;

      body._scratch = scratch;

      bodies.push( body );
    } );

    let springs = s.springs = [];

    s.edges.filter( notIsParentEdge ).map( e => {
      let spring = makeSpring({
        source: getBody( e.source() ),
        target: getBody( e.target() ),
        length: optFn( s.springLength, e ),
        coeff: optFn( s.springCoeff, e )
      });

      spring._cyEdge = e;

      let scratch = getScratch( e );

      spring._scratch = scratch;

      scratch.spring = spring;

      springs.push( spring );
    } );
  }

  tick( state ){
    let movement = tick( state );

    let isDone = movement <= state.movementThreshold;

    return isDone;
  }
}

module.exports = Euler;
