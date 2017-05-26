let setInitialNodePosition = function( node, state ){
  let p = node.position();
  let bb = state.currentBoundingBox;

  node.scratch('euler', state.randomize ? {
    x: bb.x + Math.round( Math.random() * bb.w ),
    y: bb.y + Math.round( Math.random() * bb.h )
  } : {
    x: p.x,
    y: p.y
  });
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
