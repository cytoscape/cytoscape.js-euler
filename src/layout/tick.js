const { getNodePositionData } = require('./position');

let tick = function( state ){
  let s = state;
  let l = state.layout;

  if( s.tickIndex >= s.maxIterations ){ return true; }

  l.preTick( s );

  s.nodes.forEach( node => l.tickNode( s, getNodePositionData( node ) ) );

  l.postTick( s );

  if( s.firstUpdate ){
    if( s.animateContinuously ){ // indicate the initial positions have been set
      s.layout.emit('layoutready');
    }
    s.firstUpdate = false;
  }

  s.tickIndex++;
};

let multitick = function( state, onNotDone, onDone ){
  let done = false;
  let s = state;

  for( let i = 0; i < s.maxIterations; i++ ){
    done = !s.running || tick( s );

    if( done ){ break; }
  }

  if( s.fit && s.animateContinuously ){
    s.cy.fit( s.padding );
  }

  if( !done ){
    if( onNotDone != null ){ onNotDone(); }
  } else {
    if( onDone != null ){ onDone(); }
  }
};

module.exports = { tick, multitick };
