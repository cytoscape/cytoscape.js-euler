const assign = require('../assign');

let setInitialNodePosition = function( node, state ){
  let p = node.position();
  let bb = state.currentBoundingBox;
  let scratch = node.scratch('euler');

  if( scratch == null ){
    scratch = {};

    node.scratch('euler', scratch);
  }

  assign( scratch, state.randomize ? {
    x: bb.x1 + Math.round( Math.random() * bb.w ),
    y: bb.y1 + Math.round( Math.random() * bb.h )
  } : {
    x: p.x,
    y: p.y
  } );

};

let getNodePositionData = function( node ){
  return node.scratch('euler');
};

let refreshPositions = function( nodes ){
  nodes.positions(function( node ){
    let scratch = node.scratch('euler');

    return {
      x: scratch.x,
      y: scratch.y
    };
  });
};

module.exports = { setInitialNodePosition, getNodePositionData, refreshPositions };
