/**
A generic continuous layout class
*/

const assign = require('../assign');
const defaults = require('./defaults');
const makeBoundingBox = require('./make-bb');
const { setInitialPositionState, refreshPositions, getNodePositionData } = require('./position');
const { multitick } = require('./tick');

class Layout {
  constructor( options ){
    let o = this.options = assign( {}, defaults, options );

		let nodes = o.eles.nodes();
		// prevent infinite loop and memory overflow when nodes occupy the same position
		if(!o.randomize)
		{
			nodes = nodes.sort((a,b)=>a.position().x-b.position().x);
			const prev = {x: 0, y: 0};
			const pos = {};
			nodes.forEach(n=>
			{
				Object.assign(pos,n.position());
				if(Math.abs(prev.x - pos.x) < o.theta && Math.abs(prev.y - pos.y) < o.theta)
				{
					n.position({x: Math.random()*100, y: Math.random()*100});
				}
				Object.assign(prev,pos);
			});
		}

    let s = this.state = assign( {}, o, {
      layout: this,
      nodes,
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
    s.startTime = Date.now();
    s.running = true;

    s.currentBoundingBox = makeBoundingBox( s.boundingBox, s.cy );

    if( s.ready ){ l.one( 'ready', s.ready ); }
    if( s.stop ){ l.one( 'stop', s.stop ); }

    s.nodes.forEach( n => setInitialPositionState( n, s ) );

    l.prerun( s );

    if( s.animateContinuously ){
      let ungrabify = node => {
        if( !s.ungrabifyWhileSimulating ){ return; }

        let grabbable = getNodePositionData( node, s ).grabbable = node.grabbable();

        if( grabbable ){
          node.ungrabify();
        }
      };

      let regrabify = node => {
        if( !s.ungrabifyWhileSimulating ){ return; }

        let grabbable = getNodePositionData( node, s ).grabbable;

        if( grabbable ){
          node.grabify();
        }
      };

      let updateGrabState = node => getNodePositionData( node, s ).grabbed = node.grabbed();

      let onGrab = function({ target }){
        updateGrabState( target );
      };

      let onFree = onGrab;

      let onDrag = function({ target }){
        let p = getNodePositionData( target, s );
        let tp = target.position();

        p.x = tp.x;
        p.y = tp.y;
      };

      let listenToGrab = node => {
        node.on('grab', onGrab);
        node.on('free', onFree);
        node.on('drag', onDrag);
      };

      let unlistenToGrab = node => {
        node.removeListener('grab', onGrab);
        node.removeListener('free', onFree);
        node.removeListener('drag', onDrag);
      };

      let fit = () => {
        if( s.fit && s.animateContinuously ){
          s.cy.fit( s.padding );
        }
      };

      let onNotDone = () => {
        refreshPositions( s.nodes, s );
        fit();

        requestAnimationFrame( frame );
      };

      let frame = function(){
        multitick( s, onNotDone, onDone );
      };

      let onDone = () => {
        refreshPositions( s.nodes, s );
        fit();

        s.nodes.forEach( n => {
          regrabify( n );
          unlistenToGrab( n );
        } );

        s.running = false;

        l.emit('layoutstop');
      };

      l.emit('layoutstart');

      s.nodes.forEach( n => {
        ungrabify( n );
        listenToGrab( n );
      } );

      frame(); // kick off
    } else {
      let done = false;
      let onNotDone = () => {};
      let onDone = () => done = true;

      while( !done ){
        multitick( s, onNotDone, onDone );
      }

      s.eles.layoutPositions( this, s, node => {
        let pd = getNodePositionData( node, s );

        return { x: pd.x, y: pd.y };
      } );
    }

    l.postrun( s );

    return this; // chaining
  }

  prerun(){}
  postrun(){}
  tick(){}

  stop(){
    this.state.running = false;

    return this; // chaining
  }

  destroy(){
    return this; // chaining
  }
}

module.exports = Layout;
