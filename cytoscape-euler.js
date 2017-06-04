(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeEuler"] = factory();
	else
		root["cytoscapeEuler"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Object.assign != null ? Object.assign.bind(Object) : function (tgt) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  srcs.forEach(function (src) {
    Object.keys(src).forEach(function (k) {
      return tgt[k] = src[k];
    });
  });

  return tgt;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(0);

var defaults = Object.freeze({
  source: null,
  target: null,
  length: 80,
  coeff: 0.0002,
  weight: 1
});

function makeSpring(spring) {
  return assign({}, defaults, spring);
}

function applySpring(spring) {
  var body1 = spring.source,
      body2 = spring.target,
      length = spring.length < 0 ? defaults.length : spring.length,
      dx = body2.pos.x - body1.pos.x,
      dy = body2.pos.y - body1.pos.y,
      r = Math.sqrt(dx * dx + dy * dy);

  if (r === 0) {
    dx = (Math.random() - 0.5) / 50;
    dy = (Math.random() - 0.5) / 50;
    r = Math.sqrt(dx * dx + dy * dy);
  }

  var d = r - length;
  var coeff = (!spring.coeff || spring.coeff < 0 ? defaults.springCoeff : spring.coeff) * d / r * spring.weight;

  body1.force.x += coeff * dx;
  body1.force.y += coeff * dy;

  body2.force.x -= coeff * dx;
  body2.force.y -= coeff * dy;
}

module.exports = { makeSpring: makeSpring, applySpring: applySpring };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(0);

var setInitialNodePosition = function setInitialNodePosition(node, state) {
  var p = node.position();
  var bb = state.currentBoundingBox;
  var scratch = node.scratch('euler');

  if (scratch == null) {
    scratch = {};

    node.scratch('euler', scratch);
  }

  assign(scratch, state.randomize ? {
    x: bb.x1 + Math.round(Math.random() * bb.w),
    y: bb.y1 + Math.round(Math.random() * bb.h)
  } : {
    x: p.x,
    y: p.y
  });
};

var getNodePositionData = function getNodePositionData(node) {
  return node.scratch('euler');
};

var refreshPositions = function refreshPositions(nodes) {
  nodes.positions(function (node) {
    var scratch = node.scratch('euler');

    return {
      x: scratch.x,
      y: scratch.y
    };
  });
};

module.exports = { setInitialNodePosition: setInitialNodePosition, getNodePositionData: getNodePositionData, refreshPositions: refreshPositions };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
The implementation of the Euler layout algorithm
*/

var Layout = __webpack_require__(14);
var assign = __webpack_require__(0);
var defaults = __webpack_require__(5);

var _require = __webpack_require__(11),
    _tick = _require.tick;

var _require2 = __webpack_require__(8),
    makeQuadtree = _require2.makeQuadtree;

var _require3 = __webpack_require__(4),
    makeBody = _require3.makeBody;

var _require4 = __webpack_require__(1),
    makeSpring = _require4.makeSpring;

var isFn = function isFn(fn) {
  return typeof fn === 'function';
};
var isParent = function isParent(n) {
  return n.isParent();
};
var notIsParent = function notIsParent(n) {
  return !isParent(n);
};
var isLocked = function isLocked(n) {
  return n.locked();
};
var notIsLocked = function notIsLocked(n) {
  return !isLocked(n);
};
var isParentEdge = function isParentEdge(e) {
  return isParent(e.source()) || isParent(e.target());
};
var notIsParentEdge = function notIsParentEdge(e) {
  return !isParentEdge(e);
};
var getBody = function getBody(n) {
  return n.scratch('euler').body;
};
var getNonParentDescendants = function getNonParentDescendants(n) {
  return isParent(n) ? n.descendants().filter(notIsParent) : n;
};

var getScratch = function getScratch(el) {
  var scratch = el.scratch('euler');

  if (!scratch) {
    scratch = {};

    el.scratch('euler', scratch);
  }

  return scratch;
};

var optFn = function optFn(opt, ele) {
  if (isFn(opt)) {
    return opt(ele);
  } else {
    return opt;
  }
};

var Euler = function (_Layout) {
  _inherits(Euler, _Layout);

  function Euler(options) {
    _classCallCheck(this, Euler);

    return _possibleConstructorReturn(this, (Euler.__proto__ || Object.getPrototypeOf(Euler)).call(this, assign({}, defaults, options)));
  }

  _createClass(Euler, [{
    key: 'prerun',
    value: function prerun(state) {
      var s = state;

      s.quadtree = makeQuadtree();

      var bodies = s.bodies = [];

      // regular nodes
      s.nodes.filter(function (n) {
        return notIsParent(n) && notIsLocked(n);
      }).forEach(function (n) {
        var scratch = getScratch(n);

        var body = makeBody({
          pos: { x: scratch.x, y: scratch.y },
          mass: optFn(s.mass, n)
        });

        body._cyNode = n;

        scratch.body = body;

        body._scratch = scratch;

        bodies.push(body);
      });

      var springs = s.springs = [];

      // regular edge springs
      s.edges.filter(notIsParentEdge).forEach(function (e) {
        var spring = makeSpring({
          source: getBody(e.source()),
          target: getBody(e.target()),
          length: optFn(s.springLength, e),
          coeff: optFn(s.springCoeff, e)
        });

        spring._cyEdge = e;

        var scratch = getScratch(e);

        spring._scratch = scratch;

        scratch.spring = spring;

        springs.push(spring);
      });

      // compound edge springs
      s.edges.filter(isParentEdge).forEach(function (e) {
        var sources = getNonParentDescendants(e.source());
        var targets = getNonParentDescendants(e.target());

        // just add one spring for perf
        sources = [sources[0]];
        targets = [targets[0]];

        sources.forEach(function (src) {
          targets.forEach(function (tgt) {
            springs.push(makeSpring({
              source: getBody(src),
              target: getBody(tgt),
              length: optFn(s.springLength, e),
              coeff: optFn(s.springCoeff, e)
            }));
          });
        });
      });
    }
  }, {
    key: 'tick',
    value: function tick(state) {
      var movement = _tick(state);

      var isDone = movement <= state.movementThreshold;

      return isDone;
    }
  }]);

  return Euler;
}(Layout);

module.exports = Euler;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = Object.freeze({
  pos: { x: 0, y: 0 },
  prevPos: { x: 0, y: 0 },
  force: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  mass: 1
});

var copyVec = function copyVec(v) {
  return { x: v.x, y: v.y };
};
var getValue = function getValue(val, def) {
  return val != null ? val : def;
};
var getVec = function getVec(vec, def) {
  return copyVec(getValue(vec, def));
};

function makeBody(opts) {
  var b = {};

  b.pos = getVec(opts.pos, defaults.pos);
  b.prevPos = getVec(opts.prevPos, b.pos);
  b.force = getVec(opts.force, defaults.force);
  b.velocity = getVec(opts.velocity, defaults.velocity);
  b.mass = opts.mass != null ? opts.mass : defaults.mass;

  return b;
}

module.exports = { makeBody: makeBody };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// TODO default euler-specific options
var defaults = Object.freeze({
  // The ideal legth of a spring
  // - This acts as a hint for the edge length
  // - The edge length can be longer or shorter if the forces are set to extreme values
  springLength: function springLength(edge) {
    return 80;
  },

  // Hooke's law coefficient
  // - The value ranges on [0, 1]
  // - Lower values give looser springs
  // - Higher values give tighter springs
  springCoeff: function springCoeff(edge) {
    return 0.0008;
  },

  // The mass of the node in the physics simulation
  // - The mass affects the gravity node repulsion/attraction
  mass: function mass(node) {
    return 4;
  },

  // Coulomb's law coefficient
  // - Makes the nodes repel each other for negative values
  // - Makes the nodes attract each other for positive values
  gravity: -1.2,

  // Theta coefficient from Barnes-Hut simulation
  // - Value ranges on [0, 1]
  // - Performance is better with smaller values
  // - Very small values may not create enough force to give a good result
  theta: 0.666,

  // Friction / drag coefficient to make the system stabilise over time
  dragCoeff: 0.02,

  // When the total of the squared position deltas is less than this value, the simulation ends
  movementThreshold: 1,

  // The amount of time passed per tick
  // - Larger values result in faster runtimes but might spread things out too far
  // - Smaller values produce more accurate results
  timeStep: 20
});

module.exports = defaults;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaultCoeff = 0.02;

function applyDrag(body, manualDragCoeff) {
  var dragCoeff = void 0;

  if (manualDragCoeff != null) {
    dragCoeff = manualDragCoeff;
  } else if (body.dragCoeff != null) {
    dragCoeff = body.dragCoeff;
  } else {
    dragCoeff = defaultCoeff;
  }

  body.force.x -= dragCoeff * body.velocity.x;
  body.force.y -= dragCoeff * body.velocity.y;
}

module.exports = { applyDrag: applyDrag };

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// use euler method for force integration http://en.wikipedia.org/wiki/Euler_method
// return sum of squared position deltas
function integrate(bodies, timeStep) {
  var dx = 0,
      tx = 0,
      dy = 0,
      ty = 0,
      i,
      max = bodies.length;

  if (max === 0) {
    return 0;
  }

  for (i = 0; i < max; ++i) {
    var body = bodies[i],
        coeff = timeStep / body.mass;

    body.velocity.x += coeff * body.force.x;
    body.velocity.y += coeff * body.force.y;
    var vx = body.velocity.x,
        vy = body.velocity.y,
        v = Math.sqrt(vx * vx + vy * vy);

    if (v > 1) {
      body.velocity.x = vx / v;
      body.velocity.y = vy / v;
    }

    dx = timeStep * body.velocity.x;
    dy = timeStep * body.velocity.y;

    body.pos.x += dx;
    body.pos.y += dy;

    tx += Math.abs(dx);ty += Math.abs(dy);
  }

  return (tx * tx + ty * ty) / max;
}

module.exports = { integrate: integrate };

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// impl of barnes hut
// http://www.eecs.berkeley.edu/~demmel/cs267/lecture26/lecture26.html
// http://en.wikipedia.org/wiki/Barnes%E2%80%93Hut_simulation

var Node = __webpack_require__(10);
var InsertStack = __webpack_require__(9);

var resetVec = function resetVec(v) {
  v.x = 0;v.y = 0;
};

var isSamePosition = function isSamePosition(p1, p2) {
  var threshold = 1e-8;
  var dx = Math.abs(p1.x - p2.x);
  var dy = Math.abs(p1.y - p2.y);

  return dx < threshold && dy < threshold;
};

function makeQuadtree() {
  var updateQueue = [],
      insertStack = new InsertStack(),
      nodesCache = [],
      currentInCache = 0,
      root = newNode();

  function newNode() {
    // To avoid pressure on GC we reuse nodes.
    var node = nodesCache[currentInCache];
    if (node) {
      node.quad0 = null;
      node.quad1 = null;
      node.quad2 = null;
      node.quad3 = null;
      node.body = null;
      node.mass = node.massX = node.massY = 0;
      node.left = node.right = node.top = node.bottom = 0;
    } else {
      node = new Node();
      nodesCache[currentInCache] = node;
    }

    ++currentInCache;
    return node;
  }

  function update(sourceBody, gravity, theta) {
    var queue = updateQueue,
        v = void 0,
        dx = void 0,
        dy = void 0,
        r = void 0,
        fx = 0,
        fy = 0,
        queueLength = 1,
        shiftIdx = 0,
        pushIdx = 1;

    queue[0] = root;

    resetVec(sourceBody.force);

    while (queueLength) {
      var node = queue[shiftIdx],
          body = node.body;

      queueLength -= 1;
      shiftIdx += 1;
      var differentBody = body !== sourceBody;
      if (body && differentBody) {
        // If the current node is a leaf node (and it is not source body),
        // calculate the force exerted by the current node on body, and add this
        // amount to body's net force.
        dx = body.pos.x - sourceBody.pos.x;
        dy = body.pos.y - sourceBody.pos.y;
        r = Math.sqrt(dx * dx + dy * dy);

        if (r === 0) {
          // Poor man's protection against zero distance.
          dx = (Math.random() - 0.5) / 50;
          dy = (Math.random() - 0.5) / 50;
          r = Math.sqrt(dx * dx + dy * dy);
        }

        // This is standard gravition force calculation but we divide
        // by r^3 to save two operations when normalizing force vector.
        v = gravity * body.mass * sourceBody.mass / (r * r * r);
        fx += v * dx;
        fy += v * dy;
      } else if (differentBody) {
        // Otherwise, calculate the ratio s / r,  where s is the width of the region
        // represented by the internal node, and r is the distance between the body
        // and the node's center-of-mass
        dx = node.massX / node.mass - sourceBody.pos.x;
        dy = node.massY / node.mass - sourceBody.pos.y;
        r = Math.sqrt(dx * dx + dy * dy);

        if (r === 0) {
          // Sorry about code duplucation. I don't want to create many functions
          // right away. Just want to see performance first.
          dx = (Math.random() - 0.5) / 50;
          dy = (Math.random() - 0.5) / 50;
          r = Math.sqrt(dx * dx + dy * dy);
        }
        // If s / r < θ, treat this internal node as a single body, and calculate the
        // force it exerts on sourceBody, and add this amount to sourceBody's net force.
        if ((node.right - node.left) / r < theta) {
          // in the if statement above we consider node's width only
          // because the region was squarified during tree creation.
          // Thus there is no difference between using width or height.
          v = gravity * node.mass * sourceBody.mass / (r * r * r);
          fx += v * dx;
          fy += v * dy;
        } else {
          // Otherwise, run the procedure recursively on each of the current node's children.

          // I intentionally unfolded this loop, to save several CPU cycles.
          if (node.quad0) {
            queue[pushIdx] = node.quad0;
            queueLength += 1;
            pushIdx += 1;
          }
          if (node.quad1) {
            queue[pushIdx] = node.quad1;
            queueLength += 1;
            pushIdx += 1;
          }
          if (node.quad2) {
            queue[pushIdx] = node.quad2;
            queueLength += 1;
            pushIdx += 1;
          }
          if (node.quad3) {
            queue[pushIdx] = node.quad3;
            queueLength += 1;
            pushIdx += 1;
          }
        }
      }
    }

    sourceBody.force.x += fx;
    sourceBody.force.y += fy;
  }

  function insertBodies(bodies) {
    var x1 = Number.MAX_VALUE,
        y1 = Number.MAX_VALUE,
        x2 = Number.MIN_VALUE,
        y2 = Number.MIN_VALUE,
        i = void 0,
        max = bodies.length;

    // To reduce quad tree depth we are looking for exact bounding box of all particles.
    i = max;
    while (i--) {
      var x = bodies[i].pos.x;
      var y = bodies[i].pos.y;
      if (x < x1) {
        x1 = x;
      }
      if (x > x2) {
        x2 = x;
      }
      if (y < y1) {
        y1 = y;
      }
      if (y > y2) {
        y2 = y;
      }
    }

    // Squarify the bounds.
    var dx = x2 - x1,
        dy = y2 - y1;
    if (dx > dy) {
      y2 = y1 + dx;
    } else {
      x2 = x1 + dy;
    }

    currentInCache = 0;
    root = newNode();
    root.left = x1;
    root.right = x2;
    root.top = y1;
    root.bottom = y2;

    i = max - 1;
    if (i >= 0) {
      root.body = bodies[i];
    }
    while (i--) {
      insert(bodies[i], root);
    }
  }

  function insert(newBody) {
    insertStack.reset();
    insertStack.push(root, newBody);

    while (!insertStack.isEmpty()) {
      var stackItem = insertStack.pop(),
          node = stackItem.node,
          body = stackItem.body;

      if (!node.body) {
        // This is internal node. Update the total mass of the node and center-of-mass.
        var x = body.pos.x;
        var y = body.pos.y;
        node.mass = node.mass + body.mass;
        node.massX = node.massX + body.mass * x;
        node.massY = node.massY + body.mass * y;

        // Recursively insert the body in the appropriate quadrant.
        // But first find the appropriate quadrant.
        var quadIdx = 0,
            // Assume we are in the 0's quad.
        left = node.left,
            right = (node.right + left) / 2,
            top = node.top,
            bottom = (node.bottom + top) / 2;

        if (x > right) {
          // somewhere in the eastern part.
          quadIdx = quadIdx + 1;
          left = right;
          right = node.right;
        }
        if (y > bottom) {
          // and in south.
          quadIdx = quadIdx + 2;
          top = bottom;
          bottom = node.bottom;
        }

        var child = getChild(node, quadIdx);
        if (!child) {
          // The node is internal but this quadrant is not taken. Add
          // subnode to it.
          child = newNode();
          child.left = left;
          child.top = top;
          child.right = right;
          child.bottom = bottom;
          child.body = body;

          setChild(node, quadIdx, child);
        } else {
          // continue searching in this quadrant.
          insertStack.push(child, body);
        }
      } else {
        // We are trying to add to the leaf node.
        // We have to convert current leaf into internal node
        // and continue adding two nodes.
        var oldBody = node.body;
        node.body = null; // internal nodes do not cary bodies

        if (isSamePosition(oldBody.pos, body.pos)) {
          // Prevent infinite subdivision by bumping one node
          // anywhere in this quadrant
          var retriesCount = 3;
          do {
            var offset = Math.random();
            var dx = (node.right - node.left) * offset;
            var dy = (node.bottom - node.top) * offset;

            oldBody.pos.x = node.left + dx;
            oldBody.pos.y = node.top + dy;
            retriesCount -= 1;
            // Make sure we don't bump it out of the box. If we do, next iteration should fix it
          } while (retriesCount > 0 && isSamePosition(oldBody.pos, body.pos));

          if (retriesCount === 0 && isSamePosition(oldBody.pos, body.pos)) {
            // This is very bad, we ran out of precision.
            // if we do not return from the method we'll get into
            // infinite loop here. So we sacrifice correctness of layout, and keep the app running
            // Next layout iteration should get larger bounding box in the first step and fix this
            return;
          }
        }
        // Next iteration should subdivide node further.
        insertStack.push(node, oldBody);
        insertStack.push(node, body);
      }
    }
  }

  return {
    insertBodies: insertBodies,
    updateBodyForce: update
  };
}

function getChild(node, idx) {
  if (idx === 0) return node.quad0;
  if (idx === 1) return node.quad1;
  if (idx === 2) return node.quad2;
  if (idx === 3) return node.quad3;
  return null;
}

function setChild(node, idx, child) {
  if (idx === 0) node.quad0 = child;else if (idx === 1) node.quad1 = child;else if (idx === 2) node.quad2 = child;else if (idx === 3) node.quad3 = child;
}

module.exports = { makeQuadtree: makeQuadtree };

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = InsertStack;

/**
 * Our implmentation of QuadTree is non-recursive to avoid GC hit
 * This data structure represent stack of elements
 * which we are trying to insert into quad tree.
 */
function InsertStack() {
    this.stack = [];
    this.popIdx = 0;
}

InsertStack.prototype = {
    isEmpty: function isEmpty() {
        return this.popIdx === 0;
    },
    push: function push(node, body) {
        var item = this.stack[this.popIdx];
        if (!item) {
            // we are trying to avoid memory pressue: create new element
            // only when absolutely necessary
            this.stack[this.popIdx] = new InsertStackElement(node, body);
        } else {
            item.node = node;
            item.body = body;
        }
        ++this.popIdx;
    },
    pop: function pop() {
        if (this.popIdx > 0) {
            return this.stack[--this.popIdx];
        }
    },
    reset: function reset() {
        this.popIdx = 0;
    }
};

function InsertStackElement(node, body) {
    this.node = node; // QuadTree node
    this.body = body; // physical body which needs to be inserted to node
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Internal data structure to represent 2D QuadTree node
 */
module.exports = function Node() {
  // body stored inside this node. In quad tree only leaf nodes (by construction)
  // contain boides:
  this.body = null;

  // Child nodes are stored in quads. Each quad is presented by number:
  // 0 | 1
  // -----
  // 2 | 3
  this.quad0 = null;
  this.quad1 = null;
  this.quad2 = null;
  this.quad3 = null;

  // Total mass of current node
  this.mass = 0;

  // Center of mass coordinates
  this.massX = 0;
  this.massY = 0;

  // bounding box coordinates
  this.left = 0;
  this.top = 0;
  this.bottom = 0;
  this.right = 0;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(7),
    integrate = _require.integrate;

var _require2 = __webpack_require__(6),
    applyDrag = _require2.applyDrag;

var _require3 = __webpack_require__(1),
    applySpring = _require3.applySpring;

function tick(_ref) {
  var bodies = _ref.bodies,
      springs = _ref.springs,
      quadtree = _ref.quadtree,
      timeStep = _ref.timeStep,
      gravity = _ref.gravity,
      theta = _ref.theta,
      dragCoeff = _ref.dragCoeff;

  quadtree.insertBodies(bodies);

  for (var i = 0; i < bodies.length; i++) {
    var body = bodies[i];

    quadtree.updateBodyForce(body, gravity, theta);
    applyDrag(body, dragCoeff);
  }

  for (var _i = 0; _i < springs.length; _i++) {
    var spring = springs[_i];

    applySpring(spring);
  }

  var movement = integrate(bodies, timeStep);

  // update scratch positions from body positions
  bodies.forEach(function (body) {
    var p = body._scratch;

    if (!p) {
      return;
    }

    p.x = body.pos.x;
    p.y = body.pos.y;
  });

  return movement;
}

module.exports = { tick: tick };

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Euler = __webpack_require__(3);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  cytoscape('layout', 'euler', Euler); // register with cytoscape.js
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape);
}

module.exports = register;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// general default options for force-directed layout

module.exports = Object.freeze({
  animate: true, // whether to show the layout as it's running; special 'end' value makes the layout animate like a discrete layout
  refresh: 10, // number of ticks per frame; higher is faster but more jerky
  maxIterations: 1000, // max iterations before the layout will bail out
  maxSimulationTime: 4000, // max length in ms to run the layout
  ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
  fit: true, // on every layout reposition of nodes, fit the viewport
  padding: 30, // padding around the simulation
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }

  // layout event callbacks
  ready: function ready() {}, // on layoutready
  stop: function stop() {}, // on layoutstop

  // positioning options
  randomize: false, // use random node positions at beginning of layout

  // TODO other generic force-directed options

  // infinite layout options
  infinite: false // overrides all other options for a forces-all-the-time mode
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
A generic force-directed layout class
*/

var assign = __webpack_require__(0);
var defaults = __webpack_require__(13);
var makeBoundingBox = __webpack_require__(15);

var _require = __webpack_require__(2),
    setInitialNodePosition = _require.setInitialNodePosition,
    refreshPositions = _require.refreshPositions,
    getNodePositionData = _require.getNodePositionData;

var _require2 = __webpack_require__(16),
    multitick = _require2.multitick;

var Layout = function () {
  function Layout(options) {
    _classCallCheck(this, Layout);

    var o = this.options = assign({}, defaults, options);

    var s = this.state = assign({}, o, {
      layout: this,
      nodes: o.eles.nodes(),
      edges: o.eles.edges(),
      tickIndex: 0,
      firstUpdate: true
    });

    s.animateEnd = o.animate && o.animate === 'end';
    s.animateContinuously = o.animate && !s.animateEnd;
  }

  _createClass(Layout, [{
    key: 'run',
    value: function run() {
      var l = this;
      var s = this.state;

      s.tickIndex = 0;
      s.firstUpdate = true;

      s.running = true;

      s.currentBoundingBox = makeBoundingBox(s.boundingBox, s.cy);

      if (s.ready) {
        l.one('ready', s.ready);
      }
      if (s.stop) {
        l.one('stop', s.stop);
      }

      s.nodes.forEach(function (n) {
        return setInitialNodePosition(n, s);
      });

      l.prerun(s);

      if (s.animateContinuously) {
        var fit = function fit() {
          if (s.fit && s.animateContinuously) {
            s.cy.fit(s.padding);
          }
        };

        var onNotDone = function onNotDone() {
          refreshPositions(s.nodes);
          fit();

          requestAnimationFrame(_frame);
        };

        var _frame = function _frame() {
          multitick(s, onNotDone, _onDone);
        };

        var _onDone = function _onDone() {
          refreshPositions(s.nodes);
          fit();

          s.running = false;

          l.emit('layoutstop');
        };

        l.emit('layoutstart');

        _frame(); // kick off
      } else {
        multitick(s);

        s.eles.layoutPositions(this, s, getNodePositionData);
      }

      l.postrun(s);

      return this; // chaining
    }
  }, {
    key: 'prerun',
    value: function prerun() {}
  }, {
    key: 'postrun',
    value: function postrun() {}
  }, {
    key: 'tick',
    value: function tick() {}
  }, {
    key: 'stop',
    value: function stop() {
      this.state.running = false;

      return this; // chaining
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      return this; // chaining
    }
  }]);

  return Layout;
}();

module.exports = Layout;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (bb, cy) {
  if (bb == null) {
    bb = { x1: 0, y1: 0, w: cy.width(), h: cy.height() };
  } else {
    // copy
    bb = { x1: bb.x1, x2: bb.x2, y1: bb.y1, y2: bb.y2, w: bb.w, h: bb.h };
  }

  if (bb.x2 == null) {
    bb.x2 = bb.x1 + bb.w;
  }
  if (bb.w == null) {
    bb.w = bb.x2 - bb.x1;
  }
  if (bb.y2 == null) {
    bb.y2 = bb.y1 + bb.h;
  }
  if (bb.h == null) {
    bb.h = bb.y2 - bb.y1;
  }

  return bb;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(2),
    getNodePositionData = _require.getNodePositionData;

var nop = function nop() {};

var tick = function tick(state) {
  var s = state;
  var l = state.layout;

  if (s.tickIndex >= s.maxIterations) {
    return true;
  }

  var isDone = l.tick(s);

  if (s.firstUpdate) {
    if (s.animateContinuously) {
      // indicate the initial positions have been set
      s.layout.emit('layoutready');
    }
    s.firstUpdate = false;
  }

  s.tickIndex++;

  return isDone;
};

var multitick = function multitick(state) {
  var onNotDone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : nop;
  var onDone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : nop;

  var done = false;
  var s = state;

  for (var i = 0; i < s.maxIterations; i++) {
    done = !s.running || tick(s);

    if (done) {
      break;
    }
  }

  if (!done) {
    onNotDone();
  } else {
    onDone();
  }
};

module.exports = { tick: tick, multitick: multitick };

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2MWIzZjcyNWJhYzgwMTk3ODc5NyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9zcHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9wb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXVsZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V1bGVyL2JvZHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V1bGVyL2RlZmF1bHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9kcmFnLmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9pbnRlZ3JhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V1bGVyL3F1YWR0cmVlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9xdWFkdHJlZS9pbnNlcnRTdGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXVsZXIvcXVhZHRyZWUvbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXVsZXIvdGljay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9sYXlvdXQvbWFrZS1iYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L3RpY2suanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIk9iamVjdCIsImFzc2lnbiIsImJpbmQiLCJ0Z3QiLCJzcmNzIiwiZm9yRWFjaCIsImtleXMiLCJzcmMiLCJrIiwicmVxdWlyZSIsImRlZmF1bHRzIiwiZnJlZXplIiwic291cmNlIiwidGFyZ2V0IiwibGVuZ3RoIiwiY29lZmYiLCJ3ZWlnaHQiLCJtYWtlU3ByaW5nIiwic3ByaW5nIiwiYXBwbHlTcHJpbmciLCJib2R5MSIsImJvZHkyIiwiZHgiLCJwb3MiLCJ4IiwiZHkiLCJ5IiwiciIsIk1hdGgiLCJzcXJ0IiwicmFuZG9tIiwiZCIsInNwcmluZ0NvZWZmIiwiZm9yY2UiLCJzZXRJbml0aWFsTm9kZVBvc2l0aW9uIiwibm9kZSIsInN0YXRlIiwicCIsInBvc2l0aW9uIiwiYmIiLCJjdXJyZW50Qm91bmRpbmdCb3giLCJzY3JhdGNoIiwicmFuZG9taXplIiwieDEiLCJyb3VuZCIsInciLCJ5MSIsImgiLCJnZXROb2RlUG9zaXRpb25EYXRhIiwicmVmcmVzaFBvc2l0aW9ucyIsIm5vZGVzIiwicG9zaXRpb25zIiwiTGF5b3V0IiwidGljayIsIm1ha2VRdWFkdHJlZSIsIm1ha2VCb2R5IiwiaXNGbiIsImZuIiwiaXNQYXJlbnQiLCJuIiwibm90SXNQYXJlbnQiLCJpc0xvY2tlZCIsImxvY2tlZCIsIm5vdElzTG9ja2VkIiwiaXNQYXJlbnRFZGdlIiwiZSIsIm5vdElzUGFyZW50RWRnZSIsImdldEJvZHkiLCJib2R5IiwiZ2V0Tm9uUGFyZW50RGVzY2VuZGFudHMiLCJkZXNjZW5kYW50cyIsImZpbHRlciIsImdldFNjcmF0Y2giLCJlbCIsIm9wdEZuIiwib3B0IiwiZWxlIiwiRXVsZXIiLCJvcHRpb25zIiwicyIsInF1YWR0cmVlIiwiYm9kaWVzIiwibWFzcyIsIl9jeU5vZGUiLCJfc2NyYXRjaCIsInB1c2giLCJzcHJpbmdzIiwiZWRnZXMiLCJzcHJpbmdMZW5ndGgiLCJfY3lFZGdlIiwic291cmNlcyIsInRhcmdldHMiLCJtb3ZlbWVudCIsImlzRG9uZSIsIm1vdmVtZW50VGhyZXNob2xkIiwicHJldlBvcyIsInZlbG9jaXR5IiwiY29weVZlYyIsInYiLCJnZXRWYWx1ZSIsInZhbCIsImRlZiIsImdldFZlYyIsInZlYyIsIm9wdHMiLCJiIiwiZ3Jhdml0eSIsInRoZXRhIiwiZHJhZ0NvZWZmIiwidGltZVN0ZXAiLCJkZWZhdWx0Q29lZmYiLCJhcHBseURyYWciLCJtYW51YWxEcmFnQ29lZmYiLCJpbnRlZ3JhdGUiLCJ0eCIsInR5IiwiaSIsIm1heCIsInZ4IiwidnkiLCJhYnMiLCJOb2RlIiwiSW5zZXJ0U3RhY2siLCJyZXNldFZlYyIsImlzU2FtZVBvc2l0aW9uIiwicDEiLCJwMiIsInRocmVzaG9sZCIsInVwZGF0ZVF1ZXVlIiwiaW5zZXJ0U3RhY2siLCJub2Rlc0NhY2hlIiwiY3VycmVudEluQ2FjaGUiLCJyb290IiwibmV3Tm9kZSIsInF1YWQwIiwicXVhZDEiLCJxdWFkMiIsInF1YWQzIiwibWFzc1giLCJtYXNzWSIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsInVwZGF0ZSIsInNvdXJjZUJvZHkiLCJxdWV1ZSIsImZ4IiwiZnkiLCJxdWV1ZUxlbmd0aCIsInNoaWZ0SWR4IiwicHVzaElkeCIsImRpZmZlcmVudEJvZHkiLCJpbnNlcnRCb2RpZXMiLCJOdW1iZXIiLCJNQVhfVkFMVUUiLCJ4MiIsIk1JTl9WQUxVRSIsInkyIiwiaW5zZXJ0IiwibmV3Qm9keSIsInJlc2V0IiwiaXNFbXB0eSIsInN0YWNrSXRlbSIsInBvcCIsInF1YWRJZHgiLCJjaGlsZCIsImdldENoaWxkIiwic2V0Q2hpbGQiLCJvbGRCb2R5IiwicmV0cmllc0NvdW50Iiwib2Zmc2V0IiwidXBkYXRlQm9keUZvcmNlIiwiaWR4Iiwic3RhY2siLCJwb3BJZHgiLCJwcm90b3R5cGUiLCJpdGVtIiwiSW5zZXJ0U3RhY2tFbGVtZW50IiwicmVnaXN0ZXIiLCJjeXRvc2NhcGUiLCJhbmltYXRlIiwicmVmcmVzaCIsIm1heEl0ZXJhdGlvbnMiLCJtYXhTaW11bGF0aW9uVGltZSIsInVuZ3JhYmlmeVdoaWxlU2ltdWxhdGluZyIsImZpdCIsInBhZGRpbmciLCJib3VuZGluZ0JveCIsInVuZGVmaW5lZCIsInJlYWR5Iiwic3RvcCIsImluZmluaXRlIiwibWFrZUJvdW5kaW5nQm94IiwibXVsdGl0aWNrIiwibyIsImxheW91dCIsImVsZXMiLCJ0aWNrSW5kZXgiLCJmaXJzdFVwZGF0ZSIsImFuaW1hdGVFbmQiLCJhbmltYXRlQ29udGludW91c2x5IiwibCIsInJ1bm5pbmciLCJjeSIsIm9uZSIsInByZXJ1biIsIm9uTm90RG9uZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZyYW1lIiwib25Eb25lIiwiZW1pdCIsImxheW91dFBvc2l0aW9ucyIsInBvc3RydW4iLCJ3aWR0aCIsImhlaWdodCIsIm5vcCIsImRvbmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNoRUFBLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU9DLE1BQVAsSUFBaUIsSUFBakIsR0FBd0JELE9BQU9DLE1BQVAsQ0FBY0MsSUFBZCxDQUFvQkYsTUFBcEIsQ0FBeEIsR0FBdUQsVUFBVUcsR0FBVixFQUF3QjtBQUFBLG9DQUFOQyxJQUFNO0FBQU5BLFFBQU07QUFBQTs7QUFDOUZBLE9BQUtDLE9BQUwsQ0FBYyxlQUFPO0FBQ25CTCxXQUFPTSxJQUFQLENBQWFDLEdBQWIsRUFBbUJGLE9BQW5CLENBQTRCO0FBQUEsYUFBS0YsSUFBSUssQ0FBSixJQUFTRCxJQUFJQyxDQUFKLENBQWQ7QUFBQSxL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R0FBaUIsRUFBRXNELFVBQUYsRUFBUTZJLG9CQUFSLEVBQWpCLEMiLCJmaWxlIjoiY3l0b3NjYXBlLWV1bGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3l0b3NjYXBlRXVsZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiY3l0b3NjYXBlRXVsZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjFiM2Y3MjViYWM4MDE5Nzg3OTciLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gIT0gbnVsbCA/IE9iamVjdC5hc3NpZ24uYmluZCggT2JqZWN0ICkgOiBmdW5jdGlvbiggdGd0LCAuLi5zcmNzICl7XG4gIHNyY3MuZm9yRWFjaCggc3JjID0+IHtcbiAgICBPYmplY3Qua2V5cyggc3JjICkuZm9yRWFjaCggayA9PiB0Z3Rba10gPSBzcmNba10gKTtcbiAgfSApO1xuXG4gIHJldHVybiB0Z3Q7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzaWduLmpzIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi4vYXNzaWduJyk7XG5cbmNvbnN0IGRlZmF1bHRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIHNvdXJjZTogbnVsbCxcbiAgdGFyZ2V0OiBudWxsLFxuICBsZW5ndGg6IDgwLFxuICBjb2VmZjogMC4wMDAyLFxuICB3ZWlnaHQ6IDFcbn0pO1xuXG5mdW5jdGlvbiBtYWtlU3ByaW5nKCBzcHJpbmcgKXtcbiAgcmV0dXJuIGFzc2lnbigge30sIGRlZmF1bHRzLCBzcHJpbmcgKTtcbn1cblxuZnVuY3Rpb24gYXBwbHlTcHJpbmcoIHNwcmluZyApe1xuICBsZXQgYm9keTEgPSBzcHJpbmcuc291cmNlLFxuICAgICAgYm9keTIgPSBzcHJpbmcudGFyZ2V0LFxuICAgICAgbGVuZ3RoID0gc3ByaW5nLmxlbmd0aCA8IDAgPyBkZWZhdWx0cy5sZW5ndGggOiBzcHJpbmcubGVuZ3RoLFxuICAgICAgZHggPSBib2R5Mi5wb3MueCAtIGJvZHkxLnBvcy54LFxuICAgICAgZHkgPSBib2R5Mi5wb3MueSAtIGJvZHkxLnBvcy55LFxuICAgICAgciA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgaWYgKHIgPT09IDApIHtcbiAgICAgIGR4ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpIC8gNTA7XG4gICAgICBkeSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAvIDUwO1xuICAgICAgciA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gIH1cblxuICBsZXQgZCA9IHIgLSBsZW5ndGg7XG4gIGxldCBjb2VmZiA9ICgoIXNwcmluZy5jb2VmZiB8fCBzcHJpbmcuY29lZmYgPCAwKSA/IGRlZmF1bHRzLnNwcmluZ0NvZWZmIDogc3ByaW5nLmNvZWZmKSAqIGQgLyByICogc3ByaW5nLndlaWdodDtcblxuICBib2R5MS5mb3JjZS54ICs9IGNvZWZmICogZHg7XG4gIGJvZHkxLmZvcmNlLnkgKz0gY29lZmYgKiBkeTtcblxuICBib2R5Mi5mb3JjZS54IC09IGNvZWZmICogZHg7XG4gIGJvZHkyLmZvcmNlLnkgLT0gY29lZmYgKiBkeTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IG1ha2VTcHJpbmcsIGFwcGx5U3ByaW5nIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXVsZXIvc3ByaW5nLmpzIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi4vYXNzaWduJyk7XG5cbmxldCBzZXRJbml0aWFsTm9kZVBvc2l0aW9uID0gZnVuY3Rpb24oIG5vZGUsIHN0YXRlICl7XG4gIGxldCBwID0gbm9kZS5wb3NpdGlvbigpO1xuICBsZXQgYmIgPSBzdGF0ZS5jdXJyZW50Qm91bmRpbmdCb3g7XG4gIGxldCBzY3JhdGNoID0gbm9kZS5zY3JhdGNoKCdldWxlcicpO1xuXG4gIGlmKCBzY3JhdGNoID09IG51bGwgKXtcbiAgICBzY3JhdGNoID0ge307XG5cbiAgICBub2RlLnNjcmF0Y2goJ2V1bGVyJywgc2NyYXRjaCk7XG4gIH1cblxuICBhc3NpZ24oIHNjcmF0Y2gsIHN0YXRlLnJhbmRvbWl6ZSA/IHtcbiAgICB4OiBiYi54MSArIE1hdGgucm91bmQoIE1hdGgucmFuZG9tKCkgKiBiYi53ICksXG4gICAgeTogYmIueTEgKyBNYXRoLnJvdW5kKCBNYXRoLnJhbmRvbSgpICogYmIuaCApXG4gIH0gOiB7XG4gICAgeDogcC54LFxuICAgIHk6IHAueVxuICB9ICk7XG5cbn07XG5cbmxldCBnZXROb2RlUG9zaXRpb25EYXRhID0gZnVuY3Rpb24oIG5vZGUgKXtcbiAgcmV0dXJuIG5vZGUuc2NyYXRjaCgnZXVsZXInKTtcbn07XG5cbmxldCByZWZyZXNoUG9zaXRpb25zID0gZnVuY3Rpb24oIG5vZGVzICl7XG4gIG5vZGVzLnBvc2l0aW9ucyhmdW5jdGlvbiggbm9kZSApe1xuICAgIGxldCBzY3JhdGNoID0gbm9kZS5zY3JhdGNoKCdldWxlcicpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHNjcmF0Y2gueCxcbiAgICAgIHk6IHNjcmF0Y2gueVxuICAgIH07XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHNldEluaXRpYWxOb2RlUG9zaXRpb24sIGdldE5vZGVQb3NpdGlvbkRhdGEsIHJlZnJlc2hQb3NpdGlvbnMgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXlvdXQvcG9zaXRpb24uanMiLCIvKipcblRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgRXVsZXIgbGF5b3V0IGFsZ29yaXRobVxuKi9cblxuY29uc3QgTGF5b3V0ID0gcmVxdWlyZSgnLi4vbGF5b3V0Jyk7XG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCcuLi9hc3NpZ24nKTtcbmNvbnN0IGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuY29uc3QgeyB0aWNrIH0gPSByZXF1aXJlKCcuL3RpY2snKTtcbmNvbnN0IHsgbWFrZVF1YWR0cmVlIH0gPSByZXF1aXJlKCcuL3F1YWR0cmVlJyk7XG5jb25zdCB7IG1ha2VCb2R5IH0gPSByZXF1aXJlKCcuL2JvZHknKTtcbmNvbnN0IHsgbWFrZVNwcmluZyB9ID0gcmVxdWlyZSgnLi9zcHJpbmcnKTtcbmNvbnN0IGlzRm4gPSBmbiA9PiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbic7XG5jb25zdCBpc1BhcmVudCA9IG4gPT4gbi5pc1BhcmVudCgpO1xuY29uc3Qgbm90SXNQYXJlbnQgPSBuID0+ICFpc1BhcmVudChuKTtcbmNvbnN0IGlzTG9ja2VkID0gbiA9PiBuLmxvY2tlZCgpO1xuY29uc3Qgbm90SXNMb2NrZWQgPSBuID0+ICFpc0xvY2tlZChuKTtcbmNvbnN0IGlzUGFyZW50RWRnZSA9IGUgPT4gaXNQYXJlbnQoIGUuc291cmNlKCkgKSB8fCBpc1BhcmVudCggZS50YXJnZXQoKSApXG5jb25zdCBub3RJc1BhcmVudEVkZ2UgPSBlID0+ICFpc1BhcmVudEVkZ2UoZSk7XG5jb25zdCBnZXRCb2R5ID0gbiA9PiBuLnNjcmF0Y2goJ2V1bGVyJykuYm9keTtcbmNvbnN0IGdldE5vblBhcmVudERlc2NlbmRhbnRzID0gbiA9PiBpc1BhcmVudChuKSA/IG4uZGVzY2VuZGFudHMoKS5maWx0ZXIoIG5vdElzUGFyZW50ICkgOiBuO1xuXG5jb25zdCBnZXRTY3JhdGNoID0gZWwgPT4ge1xuICBsZXQgc2NyYXRjaCA9IGVsLnNjcmF0Y2goJ2V1bGVyJyk7XG5cbiAgaWYoICFzY3JhdGNoICl7XG4gICAgc2NyYXRjaCA9IHt9O1xuXG4gICAgZWwuc2NyYXRjaCgnZXVsZXInLCBzY3JhdGNoKTtcbiAgfVxuXG4gIHJldHVybiBzY3JhdGNoO1xufTtcblxuY29uc3Qgb3B0Rm4gPSAoIG9wdCwgZWxlICkgPT4ge1xuICBpZiggaXNGbiggb3B0ICkgKXtcbiAgICByZXR1cm4gb3B0KCBlbGUgKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb3B0O1xuICB9XG59O1xuXG5jbGFzcyBFdWxlciBleHRlbmRzIExheW91dCB7XG4gIGNvbnN0cnVjdG9yKCBvcHRpb25zICl7XG4gICAgc3VwZXIoIGFzc2lnbigge30sIGRlZmF1bHRzLCBvcHRpb25zICkgKTtcbiAgfVxuXG4gIHByZXJ1biggc3RhdGUgKXtcbiAgICBsZXQgcyA9IHN0YXRlO1xuXG4gICAgcy5xdWFkdHJlZSA9IG1ha2VRdWFkdHJlZSgpO1xuXG4gICAgbGV0IGJvZGllcyA9IHMuYm9kaWVzID0gW107XG5cbiAgICAvLyByZWd1bGFyIG5vZGVzXG4gICAgcy5ub2Rlcy5maWx0ZXIoIG4gPT4gbm90SXNQYXJlbnQobikgJiYgbm90SXNMb2NrZWQobikgKS5mb3JFYWNoKCBuID0+IHtcbiAgICAgIGxldCBzY3JhdGNoID0gZ2V0U2NyYXRjaCggbiApO1xuXG4gICAgICBsZXQgYm9keSA9IG1ha2VCb2R5KHtcbiAgICAgICAgcG9zOiB7IHg6IHNjcmF0Y2gueCwgeTogc2NyYXRjaC55IH0sXG4gICAgICAgIG1hc3M6IG9wdEZuKCBzLm1hc3MsIG4gKVxuICAgICAgfSk7XG5cbiAgICAgIGJvZHkuX2N5Tm9kZSA9IG47XG5cbiAgICAgIHNjcmF0Y2guYm9keSA9IGJvZHk7XG5cbiAgICAgIGJvZHkuX3NjcmF0Y2ggPSBzY3JhdGNoO1xuXG4gICAgICBib2RpZXMucHVzaCggYm9keSApO1xuICAgIH0gKTtcblxuICAgIGxldCBzcHJpbmdzID0gcy5zcHJpbmdzID0gW107XG5cbiAgICAvLyByZWd1bGFyIGVkZ2Ugc3ByaW5nc1xuICAgIHMuZWRnZXMuZmlsdGVyKCBub3RJc1BhcmVudEVkZ2UgKS5mb3JFYWNoKCBlID0+IHtcbiAgICAgIGxldCBzcHJpbmcgPSBtYWtlU3ByaW5nKHtcbiAgICAgICAgc291cmNlOiBnZXRCb2R5KCBlLnNvdXJjZSgpICksXG4gICAgICAgIHRhcmdldDogZ2V0Qm9keSggZS50YXJnZXQoKSApLFxuICAgICAgICBsZW5ndGg6IG9wdEZuKCBzLnNwcmluZ0xlbmd0aCwgZSApLFxuICAgICAgICBjb2VmZjogb3B0Rm4oIHMuc3ByaW5nQ29lZmYsIGUgKVxuICAgICAgfSk7XG5cbiAgICAgIHNwcmluZy5fY3lFZGdlID0gZTtcblxuICAgICAgbGV0IHNjcmF0Y2ggPSBnZXRTY3JhdGNoKCBlICk7XG5cbiAgICAgIHNwcmluZy5fc2NyYXRjaCA9IHNjcmF0Y2g7XG5cbiAgICAgIHNjcmF0Y2guc3ByaW5nID0gc3ByaW5nO1xuXG4gICAgICBzcHJpbmdzLnB1c2goIHNwcmluZyApO1xuICAgIH0gKTtcblxuICAgIC8vIGNvbXBvdW5kIGVkZ2Ugc3ByaW5nc1xuICAgIHMuZWRnZXMuZmlsdGVyKCBpc1BhcmVudEVkZ2UgKS5mb3JFYWNoKCBlID0+IHtcbiAgICAgIGxldCBzb3VyY2VzID0gZ2V0Tm9uUGFyZW50RGVzY2VuZGFudHMoIGUuc291cmNlKCkgKTtcbiAgICAgIGxldCB0YXJnZXRzID0gZ2V0Tm9uUGFyZW50RGVzY2VuZGFudHMoIGUudGFyZ2V0KCkgKTtcblxuICAgICAgLy8ganVzdCBhZGQgb25lIHNwcmluZyBmb3IgcGVyZlxuICAgICAgc291cmNlcyA9IFsgc291cmNlc1swXSBdO1xuICAgICAgdGFyZ2V0cyA9IFsgdGFyZ2V0c1swXSBdO1xuXG4gICAgICBzb3VyY2VzLmZvckVhY2goIHNyYyA9PiB7XG4gICAgICAgIHRhcmdldHMuZm9yRWFjaCggdGd0ID0+IHtcbiAgICAgICAgICBzcHJpbmdzLnB1c2goIG1ha2VTcHJpbmcoe1xuICAgICAgICAgICAgc291cmNlOiBnZXRCb2R5KCBzcmMgKSxcbiAgICAgICAgICAgIHRhcmdldDogZ2V0Qm9keSggdGd0ICksXG4gICAgICAgICAgICBsZW5ndGg6IG9wdEZuKCBzLnNwcmluZ0xlbmd0aCwgZSApLFxuICAgICAgICAgICAgY29lZmY6IG9wdEZuKCBzLnNwcmluZ0NvZWZmLCBlIClcbiAgICAgICAgICB9KSApO1xuICAgICAgICB9ICk7XG4gICAgICB9ICk7XG4gICAgfSApO1xuICB9XG5cbiAgdGljayggc3RhdGUgKXtcbiAgICBsZXQgbW92ZW1lbnQgPSB0aWNrKCBzdGF0ZSApO1xuXG4gICAgbGV0IGlzRG9uZSA9IG1vdmVtZW50IDw9IHN0YXRlLm1vdmVtZW50VGhyZXNob2xkO1xuXG4gICAgcmV0dXJuIGlzRG9uZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV1bGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V1bGVyL2luZGV4LmpzIiwiY29uc3QgZGVmYXVsdHMgPSBPYmplY3QuZnJlZXplKHtcbiAgcG9zOiB7IHg6IDAsIHk6IDAgfSxcbiAgcHJldlBvczogeyB4OiAwLCB5OiAwIH0sXG4gIGZvcmNlOiB7IHg6IDAsIHk6IDAgfSxcbiAgdmVsb2NpdHk6IHsgeDogMCwgeTogMCB9LFxuICBtYXNzOiAxXG59KTtcblxuY29uc3QgY29weVZlYyA9IHYgPT4gKHsgeDogdi54LCB5OiB2LnkgfSk7XG5jb25zdCBnZXRWYWx1ZSA9ICggdmFsLCBkZWYgKSA9PiB2YWwgIT0gbnVsbCA/IHZhbCA6IGRlZjtcbmNvbnN0IGdldFZlYyA9ICggdmVjLCBkZWYgKSA9PiBjb3B5VmVjKCBnZXRWYWx1ZSggdmVjLCBkZWYgKSApO1xuXG5mdW5jdGlvbiBtYWtlQm9keSggb3B0cyApe1xuICBsZXQgYiA9IHt9O1xuXG4gIGIucG9zID0gZ2V0VmVjKCBvcHRzLnBvcywgZGVmYXVsdHMucG9zICk7XG4gIGIucHJldlBvcyA9IGdldFZlYyggb3B0cy5wcmV2UG9zLCBiLnBvcyApO1xuICBiLmZvcmNlID0gZ2V0VmVjKCBvcHRzLmZvcmNlLCBkZWZhdWx0cy5mb3JjZSApO1xuICBiLnZlbG9jaXR5ID0gZ2V0VmVjKCBvcHRzLnZlbG9jaXR5LCBkZWZhdWx0cy52ZWxvY2l0eSApO1xuICBiLm1hc3MgPSBvcHRzLm1hc3MgIT0gbnVsbCA/IG9wdHMubWFzcyA6IGRlZmF1bHRzLm1hc3M7XG5cbiAgcmV0dXJuIGI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBtYWtlQm9keSB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V1bGVyL2JvZHkuanMiLCIvLyBUT0RPIGRlZmF1bHQgZXVsZXItc3BlY2lmaWMgb3B0aW9uc1xuY29uc3QgZGVmYXVsdHMgPSBPYmplY3QuZnJlZXplKHtcbiAgLy8gVGhlIGlkZWFsIGxlZ3RoIG9mIGEgc3ByaW5nXG4gIC8vIC0gVGhpcyBhY3RzIGFzIGEgaGludCBmb3IgdGhlIGVkZ2UgbGVuZ3RoXG4gIC8vIC0gVGhlIGVkZ2UgbGVuZ3RoIGNhbiBiZSBsb25nZXIgb3Igc2hvcnRlciBpZiB0aGUgZm9yY2VzIGFyZSBzZXQgdG8gZXh0cmVtZSB2YWx1ZXNcbiAgc3ByaW5nTGVuZ3RoOiBlZGdlID0+IDgwLFxuXG4gIC8vIEhvb2tlJ3MgbGF3IGNvZWZmaWNpZW50XG4gIC8vIC0gVGhlIHZhbHVlIHJhbmdlcyBvbiBbMCwgMV1cbiAgLy8gLSBMb3dlciB2YWx1ZXMgZ2l2ZSBsb29zZXIgc3ByaW5nc1xuICAvLyAtIEhpZ2hlciB2YWx1ZXMgZ2l2ZSB0aWdodGVyIHNwcmluZ3NcbiAgc3ByaW5nQ29lZmY6IGVkZ2UgPT4gMC4wMDA4LFxuXG4gIC8vIFRoZSBtYXNzIG9mIHRoZSBub2RlIGluIHRoZSBwaHlzaWNzIHNpbXVsYXRpb25cbiAgLy8gLSBUaGUgbWFzcyBhZmZlY3RzIHRoZSBncmF2aXR5IG5vZGUgcmVwdWxzaW9uL2F0dHJhY3Rpb25cbiAgbWFzczogbm9kZSA9PiA0LFxuXG4gIC8vIENvdWxvbWIncyBsYXcgY29lZmZpY2llbnRcbiAgLy8gLSBNYWtlcyB0aGUgbm9kZXMgcmVwZWwgZWFjaCBvdGhlciBmb3IgbmVnYXRpdmUgdmFsdWVzXG4gIC8vIC0gTWFrZXMgdGhlIG5vZGVzIGF0dHJhY3QgZWFjaCBvdGhlciBmb3IgcG9zaXRpdmUgdmFsdWVzXG4gIGdyYXZpdHk6IC0xLjIsXG5cbiAgLy8gVGhldGEgY29lZmZpY2llbnQgZnJvbSBCYXJuZXMtSHV0IHNpbXVsYXRpb25cbiAgLy8gLSBWYWx1ZSByYW5nZXMgb24gWzAsIDFdXG4gIC8vIC0gUGVyZm9ybWFuY2UgaXMgYmV0dGVyIHdpdGggc21hbGxlciB2YWx1ZXNcbiAgLy8gLSBWZXJ5IHNtYWxsIHZhbHVlcyBtYXkgbm90IGNyZWF0ZSBlbm91Z2ggZm9yY2UgdG8gZ2l2ZSBhIGdvb2QgcmVzdWx0XG4gIHRoZXRhOiAwLjY2NixcblxuICAvLyBGcmljdGlvbiAvIGRyYWcgY29lZmZpY2llbnQgdG8gbWFrZSB0aGUgc3lzdGVtIHN0YWJpbGlzZSBvdmVyIHRpbWVcbiAgZHJhZ0NvZWZmOiAwLjAyLFxuXG4gIC8vIFdoZW4gdGhlIHRvdGFsIG9mIHRoZSBzcXVhcmVkIHBvc2l0aW9uIGRlbHRhcyBpcyBsZXNzIHRoYW4gdGhpcyB2YWx1ZSwgdGhlIHNpbXVsYXRpb24gZW5kc1xuICBtb3ZlbWVudFRocmVzaG9sZDogMSxcblxuICAvLyBUaGUgYW1vdW50IG9mIHRpbWUgcGFzc2VkIHBlciB0aWNrXG4gIC8vIC0gTGFyZ2VyIHZhbHVlcyByZXN1bHQgaW4gZmFzdGVyIHJ1bnRpbWVzIGJ1dCBtaWdodCBzcHJlYWQgdGhpbmdzIG91dCB0b28gZmFyXG4gIC8vIC0gU21hbGxlciB2YWx1ZXMgcHJvZHVjZSBtb3JlIGFjY3VyYXRlIHJlc3VsdHNcbiAgdGltZVN0ZXA6IDIwXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldWxlci9kZWZhdWx0cy5qcyIsImNvbnN0IGRlZmF1bHRDb2VmZiA9IDAuMDI7XG5cbmZ1bmN0aW9uIGFwcGx5RHJhZyggYm9keSwgbWFudWFsRHJhZ0NvZWZmICl7XG4gIGxldCBkcmFnQ29lZmY7XG5cbiAgaWYoIG1hbnVhbERyYWdDb2VmZiAhPSBudWxsICl7XG4gICAgZHJhZ0NvZWZmID0gbWFudWFsRHJhZ0NvZWZmO1xuICB9IGVsc2UgaWYoIGJvZHkuZHJhZ0NvZWZmICE9IG51bGwgKXtcbiAgICBkcmFnQ29lZmYgPSBib2R5LmRyYWdDb2VmZjtcbiAgfSBlbHNlIHtcbiAgICBkcmFnQ29lZmYgPSBkZWZhdWx0Q29lZmY7XG4gIH1cblxuICBib2R5LmZvcmNlLnggLT0gZHJhZ0NvZWZmICogYm9keS52ZWxvY2l0eS54O1xuICBib2R5LmZvcmNlLnkgLT0gZHJhZ0NvZWZmICogYm9keS52ZWxvY2l0eS55O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgYXBwbHlEcmFnIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXVsZXIvZHJhZy5qcyIsIi8vIHVzZSBldWxlciBtZXRob2QgZm9yIGZvcmNlIGludGVncmF0aW9uIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRXVsZXJfbWV0aG9kXG4vLyByZXR1cm4gc3VtIG9mIHNxdWFyZWQgcG9zaXRpb24gZGVsdGFzXG5mdW5jdGlvbiBpbnRlZ3JhdGUoIGJvZGllcywgdGltZVN0ZXAgKXtcbiAgdmFyIGR4ID0gMCwgdHggPSAwLFxuICAgICAgZHkgPSAwLCB0eSA9IDAsXG4gICAgICBpLFxuICAgICAgbWF4ID0gYm9kaWVzLmxlbmd0aDtcblxuICBpZiAobWF4ID09PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgbWF4OyArK2kpIHtcbiAgICB2YXIgYm9keSA9IGJvZGllc1tpXSxcbiAgICAgICAgY29lZmYgPSB0aW1lU3RlcCAvIGJvZHkubWFzcztcblxuICAgIGJvZHkudmVsb2NpdHkueCArPSBjb2VmZiAqIGJvZHkuZm9yY2UueDtcbiAgICBib2R5LnZlbG9jaXR5LnkgKz0gY29lZmYgKiBib2R5LmZvcmNlLnk7XG4gICAgdmFyIHZ4ID0gYm9keS52ZWxvY2l0eS54LFxuICAgICAgICB2eSA9IGJvZHkudmVsb2NpdHkueSxcbiAgICAgICAgdiA9IE1hdGguc3FydCh2eCAqIHZ4ICsgdnkgKiB2eSk7XG5cbiAgICBpZiAodiA+IDEpIHtcbiAgICAgIGJvZHkudmVsb2NpdHkueCA9IHZ4IC8gdjtcbiAgICAgIGJvZHkudmVsb2NpdHkueSA9IHZ5IC8gdjtcbiAgICB9XG5cbiAgICBkeCA9IHRpbWVTdGVwICogYm9keS52ZWxvY2l0eS54O1xuICAgIGR5ID0gdGltZVN0ZXAgKiBib2R5LnZlbG9jaXR5Lnk7XG5cbiAgICBib2R5LnBvcy54ICs9IGR4O1xuICAgIGJvZHkucG9zLnkgKz0gZHk7XG5cbiAgICB0eCArPSBNYXRoLmFicyhkeCk7IHR5ICs9IE1hdGguYWJzKGR5KTtcbiAgfVxuXG4gIHJldHVybiAodHggKiB0eCArIHR5ICogdHkpL21heDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGludGVncmF0ZSB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V1bGVyL2ludGVncmF0ZS5qcyIsIi8vIGltcGwgb2YgYmFybmVzIGh1dFxuLy8gaHR0cDovL3d3dy5lZWNzLmJlcmtlbGV5LmVkdS9+ZGVtbWVsL2NzMjY3L2xlY3R1cmUyNi9sZWN0dXJlMjYuaHRtbFxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXJuZXMlRTIlODAlOTNIdXRfc2ltdWxhdGlvblxuXG5jb25zdCBOb2RlID0gcmVxdWlyZSgnLi9ub2RlJyk7XG5jb25zdCBJbnNlcnRTdGFjayA9IHJlcXVpcmUoJy4vaW5zZXJ0U3RhY2snKTtcblxuY29uc3QgcmVzZXRWZWMgPSB2ID0+IHsgdi54ID0gMDsgdi55ID0gMDsgfTtcblxuY29uc3QgaXNTYW1lUG9zaXRpb24gPSAocDEsIHAyKSA9PiB7XG4gIGxldCB0aHJlc2hvbGQgPSAxZS04O1xuICBsZXQgZHggPSBNYXRoLmFicyhwMS54IC0gcDIueCk7XG4gIGxldCBkeSA9IE1hdGguYWJzKHAxLnkgLSBwMi55KTtcblxuICByZXR1cm4gZHggPCB0aHJlc2hvbGQgJiYgZHkgPCB0aHJlc2hvbGQ7XG59O1xuXG5mdW5jdGlvbiBtYWtlUXVhZHRyZWUoKXtcbiAgbGV0IHVwZGF0ZVF1ZXVlID0gW10sXG4gICAgaW5zZXJ0U3RhY2sgPSBuZXcgSW5zZXJ0U3RhY2soKSxcbiAgICBub2Rlc0NhY2hlID0gW10sXG4gICAgY3VycmVudEluQ2FjaGUgPSAwLFxuICAgIHJvb3QgPSBuZXdOb2RlKCk7XG5cbiAgZnVuY3Rpb24gbmV3Tm9kZSgpIHtcbiAgICAvLyBUbyBhdm9pZCBwcmVzc3VyZSBvbiBHQyB3ZSByZXVzZSBub2Rlcy5cbiAgICBsZXQgbm9kZSA9IG5vZGVzQ2FjaGVbY3VycmVudEluQ2FjaGVdO1xuICAgIGlmIChub2RlKSB7XG4gICAgICBub2RlLnF1YWQwID0gbnVsbDtcbiAgICAgIG5vZGUucXVhZDEgPSBudWxsO1xuICAgICAgbm9kZS5xdWFkMiA9IG51bGw7XG4gICAgICBub2RlLnF1YWQzID0gbnVsbDtcbiAgICAgIG5vZGUuYm9keSA9IG51bGw7XG4gICAgICBub2RlLm1hc3MgPSBub2RlLm1hc3NYID0gbm9kZS5tYXNzWSA9IDA7XG4gICAgICBub2RlLmxlZnQgPSBub2RlLnJpZ2h0ID0gbm9kZS50b3AgPSBub2RlLmJvdHRvbSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSBuZXcgTm9kZSgpO1xuICAgICAgbm9kZXNDYWNoZVtjdXJyZW50SW5DYWNoZV0gPSBub2RlO1xuICAgIH1cblxuICAgICsrY3VycmVudEluQ2FjaGU7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoIHNvdXJjZUJvZHksIGdyYXZpdHksIHRoZXRhICkge1xuICAgIGxldCBxdWV1ZSA9IHVwZGF0ZVF1ZXVlLFxuICAgICAgdixcbiAgICAgIGR4LFxuICAgICAgZHksXG4gICAgICByLCBmeCA9IDAsXG4gICAgICBmeSA9IDAsXG4gICAgICBxdWV1ZUxlbmd0aCA9IDEsXG4gICAgICBzaGlmdElkeCA9IDAsXG4gICAgICBwdXNoSWR4ID0gMTtcblxuICAgIHF1ZXVlWzBdID0gcm9vdDtcblxuICAgIHJlc2V0VmVjKCBzb3VyY2VCb2R5LmZvcmNlICk7XG5cbiAgICB3aGlsZSAocXVldWVMZW5ndGgpIHtcbiAgICAgIGxldCBub2RlID0gcXVldWVbc2hpZnRJZHhdLFxuICAgICAgICBib2R5ID0gbm9kZS5ib2R5O1xuXG4gICAgICBxdWV1ZUxlbmd0aCAtPSAxO1xuICAgICAgc2hpZnRJZHggKz0gMTtcbiAgICAgIGxldCBkaWZmZXJlbnRCb2R5ID0gKGJvZHkgIT09IHNvdXJjZUJvZHkpO1xuICAgICAgaWYgKGJvZHkgJiYgZGlmZmVyZW50Qm9keSkge1xuICAgICAgICAvLyBJZiB0aGUgY3VycmVudCBub2RlIGlzIGEgbGVhZiBub2RlIChhbmQgaXQgaXMgbm90IHNvdXJjZSBib2R5KSxcbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBmb3JjZSBleGVydGVkIGJ5IHRoZSBjdXJyZW50IG5vZGUgb24gYm9keSwgYW5kIGFkZCB0aGlzXG4gICAgICAgIC8vIGFtb3VudCB0byBib2R5J3MgbmV0IGZvcmNlLlxuICAgICAgICBkeCA9IGJvZHkucG9zLnggLSBzb3VyY2VCb2R5LnBvcy54O1xuICAgICAgICBkeSA9IGJvZHkucG9zLnkgLSBzb3VyY2VCb2R5LnBvcy55O1xuICAgICAgICByID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuICAgICAgICBpZiAociA9PT0gMCkge1xuICAgICAgICAgIC8vIFBvb3IgbWFuJ3MgcHJvdGVjdGlvbiBhZ2FpbnN0IHplcm8gZGlzdGFuY2UuXG4gICAgICAgICAgZHggPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgLyA1MDtcbiAgICAgICAgICBkeSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAvIDUwO1xuICAgICAgICAgIHIgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhpcyBpcyBzdGFuZGFyZCBncmF2aXRpb24gZm9yY2UgY2FsY3VsYXRpb24gYnV0IHdlIGRpdmlkZVxuICAgICAgICAvLyBieSByXjMgdG8gc2F2ZSB0d28gb3BlcmF0aW9ucyB3aGVuIG5vcm1hbGl6aW5nIGZvcmNlIHZlY3Rvci5cbiAgICAgICAgdiA9IGdyYXZpdHkgKiBib2R5Lm1hc3MgKiBzb3VyY2VCb2R5Lm1hc3MgLyAociAqIHIgKiByKTtcbiAgICAgICAgZnggKz0gdiAqIGR4O1xuICAgICAgICBmeSArPSB2ICogZHk7XG4gICAgICB9IGVsc2UgaWYgKGRpZmZlcmVudEJvZHkpIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBjYWxjdWxhdGUgdGhlIHJhdGlvIHMgLyByLCAgd2hlcmUgcyBpcyB0aGUgd2lkdGggb2YgdGhlIHJlZ2lvblxuICAgICAgICAvLyByZXByZXNlbnRlZCBieSB0aGUgaW50ZXJuYWwgbm9kZSwgYW5kIHIgaXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGJvZHlcbiAgICAgICAgLy8gYW5kIHRoZSBub2RlJ3MgY2VudGVyLW9mLW1hc3NcbiAgICAgICAgZHggPSBub2RlLm1hc3NYIC8gbm9kZS5tYXNzIC0gc291cmNlQm9keS5wb3MueDtcbiAgICAgICAgZHkgPSBub2RlLm1hc3NZIC8gbm9kZS5tYXNzIC0gc291cmNlQm9keS5wb3MueTtcbiAgICAgICAgciA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgICAgICAgaWYgKHIgPT09IDApIHtcbiAgICAgICAgICAvLyBTb3JyeSBhYm91dCBjb2RlIGR1cGx1Y2F0aW9uLiBJIGRvbid0IHdhbnQgdG8gY3JlYXRlIG1hbnkgZnVuY3Rpb25zXG4gICAgICAgICAgLy8gcmlnaHQgYXdheS4gSnVzdCB3YW50IHRvIHNlZSBwZXJmb3JtYW5jZSBmaXJzdC5cbiAgICAgICAgICBkeCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAvIDUwO1xuICAgICAgICAgIGR5ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpIC8gNTA7XG4gICAgICAgICAgciA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgcyAvIHIgPCDOuCwgdHJlYXQgdGhpcyBpbnRlcm5hbCBub2RlIGFzIGEgc2luZ2xlIGJvZHksIGFuZCBjYWxjdWxhdGUgdGhlXG4gICAgICAgIC8vIGZvcmNlIGl0IGV4ZXJ0cyBvbiBzb3VyY2VCb2R5LCBhbmQgYWRkIHRoaXMgYW1vdW50IHRvIHNvdXJjZUJvZHkncyBuZXQgZm9yY2UuXG4gICAgICAgIGlmICgobm9kZS5yaWdodCAtIG5vZGUubGVmdCkgLyByIDwgdGhldGEpIHtcbiAgICAgICAgICAvLyBpbiB0aGUgaWYgc3RhdGVtZW50IGFib3ZlIHdlIGNvbnNpZGVyIG5vZGUncyB3aWR0aCBvbmx5XG4gICAgICAgICAgLy8gYmVjYXVzZSB0aGUgcmVnaW9uIHdhcyBzcXVhcmlmaWVkIGR1cmluZyB0cmVlIGNyZWF0aW9uLlxuICAgICAgICAgIC8vIFRodXMgdGhlcmUgaXMgbm8gZGlmZmVyZW5jZSBiZXR3ZWVuIHVzaW5nIHdpZHRoIG9yIGhlaWdodC5cbiAgICAgICAgICB2ID0gZ3Jhdml0eSAqIG5vZGUubWFzcyAqIHNvdXJjZUJvZHkubWFzcyAvIChyICogciAqIHIpO1xuICAgICAgICAgIGZ4ICs9IHYgKiBkeDtcbiAgICAgICAgICBmeSArPSB2ICogZHk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlLCBydW4gdGhlIHByb2NlZHVyZSByZWN1cnNpdmVseSBvbiBlYWNoIG9mIHRoZSBjdXJyZW50IG5vZGUncyBjaGlsZHJlbi5cblxuICAgICAgICAgIC8vIEkgaW50ZW50aW9uYWxseSB1bmZvbGRlZCB0aGlzIGxvb3AsIHRvIHNhdmUgc2V2ZXJhbCBDUFUgY3ljbGVzLlxuICAgICAgICAgIGlmIChub2RlLnF1YWQwKSB7XG4gICAgICAgICAgICBxdWV1ZVtwdXNoSWR4XSA9IG5vZGUucXVhZDA7XG4gICAgICAgICAgICBxdWV1ZUxlbmd0aCArPSAxO1xuICAgICAgICAgICAgcHVzaElkeCArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobm9kZS5xdWFkMSkge1xuICAgICAgICAgICAgcXVldWVbcHVzaElkeF0gPSBub2RlLnF1YWQxO1xuICAgICAgICAgICAgcXVldWVMZW5ndGggKz0gMTtcbiAgICAgICAgICAgIHB1c2hJZHggKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG5vZGUucXVhZDIpIHtcbiAgICAgICAgICAgIHF1ZXVlW3B1c2hJZHhdID0gbm9kZS5xdWFkMjtcbiAgICAgICAgICAgIHF1ZXVlTGVuZ3RoICs9IDE7XG4gICAgICAgICAgICBwdXNoSWR4ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChub2RlLnF1YWQzKSB7XG4gICAgICAgICAgICBxdWV1ZVtwdXNoSWR4XSA9IG5vZGUucXVhZDM7XG4gICAgICAgICAgICBxdWV1ZUxlbmd0aCArPSAxO1xuICAgICAgICAgICAgcHVzaElkeCArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHNvdXJjZUJvZHkuZm9yY2UueCArPSBmeDtcbiAgICBzb3VyY2VCb2R5LmZvcmNlLnkgKz0gZnk7XG4gIH1cblxuICBmdW5jdGlvbiBpbnNlcnRCb2RpZXMoYm9kaWVzKSB7XG4gICAgbGV0IHgxID0gTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgIHkxID0gTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgIHgyID0gTnVtYmVyLk1JTl9WQUxVRSxcbiAgICAgIHkyID0gTnVtYmVyLk1JTl9WQUxVRSxcbiAgICAgIGksXG4gICAgICBtYXggPSBib2RpZXMubGVuZ3RoO1xuXG4gICAgLy8gVG8gcmVkdWNlIHF1YWQgdHJlZSBkZXB0aCB3ZSBhcmUgbG9va2luZyBmb3IgZXhhY3QgYm91bmRpbmcgYm94IG9mIGFsbCBwYXJ0aWNsZXMuXG4gICAgaSA9IG1heDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBsZXQgeCA9IGJvZGllc1tpXS5wb3MueDtcbiAgICAgIGxldCB5ID0gYm9kaWVzW2ldLnBvcy55O1xuICAgICAgaWYgKHggPCB4MSkge1xuICAgICAgICB4MSA9IHg7XG4gICAgICB9XG4gICAgICBpZiAoeCA+IHgyKSB7XG4gICAgICAgIHgyID0geDtcbiAgICAgIH1cbiAgICAgIGlmICh5IDwgeTEpIHtcbiAgICAgICAgeTEgPSB5O1xuICAgICAgfVxuICAgICAgaWYgKHkgPiB5Mikge1xuICAgICAgICB5MiA9IHk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3F1YXJpZnkgdGhlIGJvdW5kcy5cbiAgICBsZXQgZHggPSB4MiAtIHgxLFxuICAgICAgZHkgPSB5MiAtIHkxO1xuICAgIGlmIChkeCA+IGR5KSB7XG4gICAgICB5MiA9IHkxICsgZHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHgyID0geDEgKyBkeTtcbiAgICB9XG5cbiAgICBjdXJyZW50SW5DYWNoZSA9IDA7XG4gICAgcm9vdCA9IG5ld05vZGUoKTtcbiAgICByb290LmxlZnQgPSB4MTtcbiAgICByb290LnJpZ2h0ID0geDI7XG4gICAgcm9vdC50b3AgPSB5MTtcbiAgICByb290LmJvdHRvbSA9IHkyO1xuXG4gICAgaSA9IG1heCAtIDE7XG4gICAgaWYgKGkgPj0gMCkge1xuICAgICAgcm9vdC5ib2R5ID0gYm9kaWVzW2ldO1xuICAgIH1cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpbnNlcnQoYm9kaWVzW2ldLCByb290KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbnNlcnQobmV3Qm9keSkge1xuICAgIGluc2VydFN0YWNrLnJlc2V0KCk7XG4gICAgaW5zZXJ0U3RhY2sucHVzaChyb290LCBuZXdCb2R5KTtcblxuICAgIHdoaWxlICghaW5zZXJ0U3RhY2suaXNFbXB0eSgpKSB7XG4gICAgICBsZXQgc3RhY2tJdGVtID0gaW5zZXJ0U3RhY2sucG9wKCksXG4gICAgICAgIG5vZGUgPSBzdGFja0l0ZW0ubm9kZSxcbiAgICAgICAgYm9keSA9IHN0YWNrSXRlbS5ib2R5O1xuXG4gICAgICBpZiAoIW5vZGUuYm9keSkge1xuICAgICAgICAvLyBUaGlzIGlzIGludGVybmFsIG5vZGUuIFVwZGF0ZSB0aGUgdG90YWwgbWFzcyBvZiB0aGUgbm9kZSBhbmQgY2VudGVyLW9mLW1hc3MuXG4gICAgICAgIGxldCB4ID0gYm9keS5wb3MueDtcbiAgICAgICAgbGV0IHkgPSBib2R5LnBvcy55O1xuICAgICAgICBub2RlLm1hc3MgPSBub2RlLm1hc3MgKyBib2R5Lm1hc3M7XG4gICAgICAgIG5vZGUubWFzc1ggPSBub2RlLm1hc3NYICsgYm9keS5tYXNzICogeDtcbiAgICAgICAgbm9kZS5tYXNzWSA9IG5vZGUubWFzc1kgKyBib2R5Lm1hc3MgKiB5O1xuXG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGluc2VydCB0aGUgYm9keSBpbiB0aGUgYXBwcm9wcmlhdGUgcXVhZHJhbnQuXG4gICAgICAgIC8vIEJ1dCBmaXJzdCBmaW5kIHRoZSBhcHByb3ByaWF0ZSBxdWFkcmFudC5cbiAgICAgICAgbGV0IHF1YWRJZHggPSAwLCAvLyBBc3N1bWUgd2UgYXJlIGluIHRoZSAwJ3MgcXVhZC5cbiAgICAgICAgICBsZWZ0ID0gbm9kZS5sZWZ0LFxuICAgICAgICAgIHJpZ2h0ID0gKG5vZGUucmlnaHQgKyBsZWZ0KSAvIDIsXG4gICAgICAgICAgdG9wID0gbm9kZS50b3AsXG4gICAgICAgICAgYm90dG9tID0gKG5vZGUuYm90dG9tICsgdG9wKSAvIDI7XG5cbiAgICAgICAgaWYgKHggPiByaWdodCkgeyAvLyBzb21ld2hlcmUgaW4gdGhlIGVhc3Rlcm4gcGFydC5cbiAgICAgICAgICBxdWFkSWR4ID0gcXVhZElkeCArIDE7XG4gICAgICAgICAgbGVmdCA9IHJpZ2h0O1xuICAgICAgICAgIHJpZ2h0ID0gbm9kZS5yaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeSA+IGJvdHRvbSkgeyAvLyBhbmQgaW4gc291dGguXG4gICAgICAgICAgcXVhZElkeCA9IHF1YWRJZHggKyAyO1xuICAgICAgICAgIHRvcCA9IGJvdHRvbTtcbiAgICAgICAgICBib3R0b20gPSBub2RlLmJvdHRvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjaGlsZCA9IGdldENoaWxkKG5vZGUsIHF1YWRJZHgpO1xuICAgICAgICBpZiAoIWNoaWxkKSB7XG4gICAgICAgICAgLy8gVGhlIG5vZGUgaXMgaW50ZXJuYWwgYnV0IHRoaXMgcXVhZHJhbnQgaXMgbm90IHRha2VuLiBBZGRcbiAgICAgICAgICAvLyBzdWJub2RlIHRvIGl0LlxuICAgICAgICAgIGNoaWxkID0gbmV3Tm9kZSgpO1xuICAgICAgICAgIGNoaWxkLmxlZnQgPSBsZWZ0O1xuICAgICAgICAgIGNoaWxkLnRvcCA9IHRvcDtcbiAgICAgICAgICBjaGlsZC5yaWdodCA9IHJpZ2h0O1xuICAgICAgICAgIGNoaWxkLmJvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgICBjaGlsZC5ib2R5ID0gYm9keTtcblxuICAgICAgICAgIHNldENoaWxkKG5vZGUsIHF1YWRJZHgsIGNoaWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBjb250aW51ZSBzZWFyY2hpbmcgaW4gdGhpcyBxdWFkcmFudC5cbiAgICAgICAgICBpbnNlcnRTdGFjay5wdXNoKGNoaWxkLCBib2R5KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV2UgYXJlIHRyeWluZyB0byBhZGQgdG8gdGhlIGxlYWYgbm9kZS5cbiAgICAgICAgLy8gV2UgaGF2ZSB0byBjb252ZXJ0IGN1cnJlbnQgbGVhZiBpbnRvIGludGVybmFsIG5vZGVcbiAgICAgICAgLy8gYW5kIGNvbnRpbnVlIGFkZGluZyB0d28gbm9kZXMuXG4gICAgICAgIGxldCBvbGRCb2R5ID0gbm9kZS5ib2R5O1xuICAgICAgICBub2RlLmJvZHkgPSBudWxsOyAvLyBpbnRlcm5hbCBub2RlcyBkbyBub3QgY2FyeSBib2RpZXNcblxuICAgICAgICBpZiAoaXNTYW1lUG9zaXRpb24ob2xkQm9keS5wb3MsIGJvZHkucG9zKSkge1xuICAgICAgICAgIC8vIFByZXZlbnQgaW5maW5pdGUgc3ViZGl2aXNpb24gYnkgYnVtcGluZyBvbmUgbm9kZVxuICAgICAgICAgIC8vIGFueXdoZXJlIGluIHRoaXMgcXVhZHJhbnRcbiAgICAgICAgICBsZXQgcmV0cmllc0NvdW50ID0gMztcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgIGxldCBkeCA9IChub2RlLnJpZ2h0IC0gbm9kZS5sZWZ0KSAqIG9mZnNldDtcbiAgICAgICAgICAgIGxldCBkeSA9IChub2RlLmJvdHRvbSAtIG5vZGUudG9wKSAqIG9mZnNldDtcblxuICAgICAgICAgICAgb2xkQm9keS5wb3MueCA9IG5vZGUubGVmdCArIGR4O1xuICAgICAgICAgICAgb2xkQm9keS5wb3MueSA9IG5vZGUudG9wICsgZHk7XG4gICAgICAgICAgICByZXRyaWVzQ291bnQgLT0gMTtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBkb24ndCBidW1wIGl0IG91dCBvZiB0aGUgYm94LiBJZiB3ZSBkbywgbmV4dCBpdGVyYXRpb24gc2hvdWxkIGZpeCBpdFxuICAgICAgICAgIH0gd2hpbGUgKHJldHJpZXNDb3VudCA+IDAgJiYgaXNTYW1lUG9zaXRpb24ob2xkQm9keS5wb3MsIGJvZHkucG9zKSk7XG5cbiAgICAgICAgICBpZiAocmV0cmllc0NvdW50ID09PSAwICYmIGlzU2FtZVBvc2l0aW9uKG9sZEJvZHkucG9zLCBib2R5LnBvcykpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdmVyeSBiYWQsIHdlIHJhbiBvdXQgb2YgcHJlY2lzaW9uLlxuICAgICAgICAgICAgLy8gaWYgd2UgZG8gbm90IHJldHVybiBmcm9tIHRoZSBtZXRob2Qgd2UnbGwgZ2V0IGludG9cbiAgICAgICAgICAgIC8vIGluZmluaXRlIGxvb3AgaGVyZS4gU28gd2Ugc2FjcmlmaWNlIGNvcnJlY3RuZXNzIG9mIGxheW91dCwgYW5kIGtlZXAgdGhlIGFwcCBydW5uaW5nXG4gICAgICAgICAgICAvLyBOZXh0IGxheW91dCBpdGVyYXRpb24gc2hvdWxkIGdldCBsYXJnZXIgYm91bmRpbmcgYm94IGluIHRoZSBmaXJzdCBzdGVwIGFuZCBmaXggdGhpc1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBOZXh0IGl0ZXJhdGlvbiBzaG91bGQgc3ViZGl2aWRlIG5vZGUgZnVydGhlci5cbiAgICAgICAgaW5zZXJ0U3RhY2sucHVzaChub2RlLCBvbGRCb2R5KTtcbiAgICAgICAgaW5zZXJ0U3RhY2sucHVzaChub2RlLCBib2R5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluc2VydEJvZGllczogaW5zZXJ0Qm9kaWVzLFxuICAgIHVwZGF0ZUJvZHlGb3JjZTogdXBkYXRlXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldENoaWxkKG5vZGUsIGlkeCkge1xuICBpZiAoaWR4ID09PSAwKSByZXR1cm4gbm9kZS5xdWFkMDtcbiAgaWYgKGlkeCA9PT0gMSkgcmV0dXJuIG5vZGUucXVhZDE7XG4gIGlmIChpZHggPT09IDIpIHJldHVybiBub2RlLnF1YWQyO1xuICBpZiAoaWR4ID09PSAzKSByZXR1cm4gbm9kZS5xdWFkMztcbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHNldENoaWxkKG5vZGUsIGlkeCwgY2hpbGQpIHtcbiAgaWYgKGlkeCA9PT0gMCkgbm9kZS5xdWFkMCA9IGNoaWxkO1xuICBlbHNlIGlmIChpZHggPT09IDEpIG5vZGUucXVhZDEgPSBjaGlsZDtcbiAgZWxzZSBpZiAoaWR4ID09PSAyKSBub2RlLnF1YWQyID0gY2hpbGQ7XG4gIGVsc2UgaWYgKGlkeCA9PT0gMykgbm9kZS5xdWFkMyA9IGNoaWxkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgbWFrZVF1YWR0cmVlIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXVsZXIvcXVhZHRyZWUvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IEluc2VydFN0YWNrO1xuXG4vKipcbiAqIE91ciBpbXBsbWVudGF0aW9uIG9mIFF1YWRUcmVlIGlzIG5vbi1yZWN1cnNpdmUgdG8gYXZvaWQgR0MgaGl0XG4gKiBUaGlzIGRhdGEgc3RydWN0dXJlIHJlcHJlc2VudCBzdGFjayBvZiBlbGVtZW50c1xuICogd2hpY2ggd2UgYXJlIHRyeWluZyB0byBpbnNlcnQgaW50byBxdWFkIHRyZWUuXG4gKi9cbmZ1bmN0aW9uIEluc2VydFN0YWNrICgpIHtcbiAgICB0aGlzLnN0YWNrID0gW107XG4gICAgdGhpcy5wb3BJZHggPSAwO1xufVxuXG5JbnNlcnRTdGFjay5wcm90b3R5cGUgPSB7XG4gICAgaXNFbXB0eTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcElkeCA9PT0gMDtcbiAgICB9LFxuICAgIHB1c2g6IGZ1bmN0aW9uIChub2RlLCBib2R5KSB7XG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5zdGFja1t0aGlzLnBvcElkeF07XG4gICAgICAgIGlmICghaXRlbSkge1xuICAgICAgICAgICAgLy8gd2UgYXJlIHRyeWluZyB0byBhdm9pZCBtZW1vcnkgcHJlc3N1ZTogY3JlYXRlIG5ldyBlbGVtZW50XG4gICAgICAgICAgICAvLyBvbmx5IHdoZW4gYWJzb2x1dGVseSBuZWNlc3NhcnlcbiAgICAgICAgICAgIHRoaXMuc3RhY2tbdGhpcy5wb3BJZHhdID0gbmV3IEluc2VydFN0YWNrRWxlbWVudChub2RlLCBib2R5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0ubm9kZSA9IG5vZGU7XG4gICAgICAgICAgICBpdGVtLmJvZHkgPSBib2R5O1xuICAgICAgICB9XG4gICAgICAgICsrdGhpcy5wb3BJZHg7XG4gICAgfSxcbiAgICBwb3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucG9wSWR4ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhY2tbLS10aGlzLnBvcElkeF07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucG9wSWR4ID0gMDtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBJbnNlcnRTdGFja0VsZW1lbnQobm9kZSwgYm9keSkge1xuICAgIHRoaXMubm9kZSA9IG5vZGU7IC8vIFF1YWRUcmVlIG5vZGVcbiAgICB0aGlzLmJvZHkgPSBib2R5OyAvLyBwaHlzaWNhbCBib2R5IHdoaWNoIG5lZWRzIHRvIGJlIGluc2VydGVkIHRvIG5vZGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldWxlci9xdWFkdHJlZS9pbnNlcnRTdGFjay5qcyIsIi8qKlxuICogSW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmUgdG8gcmVwcmVzZW50IDJEIFF1YWRUcmVlIG5vZGVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBOb2RlKCkge1xuICAvLyBib2R5IHN0b3JlZCBpbnNpZGUgdGhpcyBub2RlLiBJbiBxdWFkIHRyZWUgb25seSBsZWFmIG5vZGVzIChieSBjb25zdHJ1Y3Rpb24pXG4gIC8vIGNvbnRhaW4gYm9pZGVzOlxuICB0aGlzLmJvZHkgPSBudWxsO1xuXG4gIC8vIENoaWxkIG5vZGVzIGFyZSBzdG9yZWQgaW4gcXVhZHMuIEVhY2ggcXVhZCBpcyBwcmVzZW50ZWQgYnkgbnVtYmVyOlxuICAvLyAwIHwgMVxuICAvLyAtLS0tLVxuICAvLyAyIHwgM1xuICB0aGlzLnF1YWQwID0gbnVsbDtcbiAgdGhpcy5xdWFkMSA9IG51bGw7XG4gIHRoaXMucXVhZDIgPSBudWxsO1xuICB0aGlzLnF1YWQzID0gbnVsbDtcblxuICAvLyBUb3RhbCBtYXNzIG9mIGN1cnJlbnQgbm9kZVxuICB0aGlzLm1hc3MgPSAwO1xuXG4gIC8vIENlbnRlciBvZiBtYXNzIGNvb3JkaW5hdGVzXG4gIHRoaXMubWFzc1ggPSAwO1xuICB0aGlzLm1hc3NZID0gMDtcblxuICAvLyBib3VuZGluZyBib3ggY29vcmRpbmF0ZXNcbiAgdGhpcy5sZWZ0ID0gMDtcbiAgdGhpcy50b3AgPSAwO1xuICB0aGlzLmJvdHRvbSA9IDA7XG4gIHRoaXMucmlnaHQgPSAwO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldWxlci9xdWFkdHJlZS9ub2RlLmpzIiwiY29uc3QgeyBpbnRlZ3JhdGUgfSA9IHJlcXVpcmUoJy4vaW50ZWdyYXRlJyk7XG5jb25zdCB7IGFwcGx5RHJhZyB9ID0gcmVxdWlyZSgnLi9kcmFnJyk7XG5jb25zdCB7IGFwcGx5U3ByaW5nIH0gPSByZXF1aXJlKCcuL3NwcmluZycpO1xuXG5mdW5jdGlvbiB0aWNrKHsgYm9kaWVzLCBzcHJpbmdzLCBxdWFkdHJlZSwgdGltZVN0ZXAsIGdyYXZpdHksIHRoZXRhLCBkcmFnQ29lZmYgfSl7XG4gIHF1YWR0cmVlLmluc2VydEJvZGllcyggYm9kaWVzICk7XG5cbiAgZm9yKCBsZXQgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKysgKXtcbiAgICBsZXQgYm9keSA9IGJvZGllc1tpXTtcblxuICAgIHF1YWR0cmVlLnVwZGF0ZUJvZHlGb3JjZSggYm9keSwgZ3Jhdml0eSwgdGhldGEgKTtcbiAgICBhcHBseURyYWcoIGJvZHksIGRyYWdDb2VmZiApO1xuICB9XG5cbiAgZm9yKCBsZXQgaSA9IDA7IGkgPCBzcHJpbmdzLmxlbmd0aDsgaSsrICl7XG4gICAgbGV0IHNwcmluZyA9IHNwcmluZ3NbaV07XG5cbiAgICBhcHBseVNwcmluZyggc3ByaW5nICk7XG4gIH1cblxuICBsZXQgbW92ZW1lbnQgPSBpbnRlZ3JhdGUoIGJvZGllcywgdGltZVN0ZXAgKTtcblxuICAvLyB1cGRhdGUgc2NyYXRjaCBwb3NpdGlvbnMgZnJvbSBib2R5IHBvc2l0aW9uc1xuICBib2RpZXMuZm9yRWFjaCggYm9keSA9PiB7XG4gICAgbGV0IHAgPSBib2R5Ll9zY3JhdGNoO1xuXG4gICAgaWYoICFwICl7IHJldHVybjsgfVxuXG4gICAgcC54ID0gYm9keS5wb3MueDtcbiAgICBwLnkgPSBib2R5LnBvcy55O1xuICB9ICk7XG5cbiAgcmV0dXJuIG1vdmVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgdGljayB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V1bGVyL3RpY2suanMiLCJjb25zdCBFdWxlciA9IHJlcXVpcmUoJy4vZXVsZXInKTtcblxuLy8gcmVnaXN0ZXJzIHRoZSBleHRlbnNpb24gb24gYSBjeXRvc2NhcGUgbGliIHJlZlxubGV0IHJlZ2lzdGVyID0gZnVuY3Rpb24oIGN5dG9zY2FwZSApe1xuICBpZiggIWN5dG9zY2FwZSApeyByZXR1cm47IH0gLy8gY2FuJ3QgcmVnaXN0ZXIgaWYgY3l0b3NjYXBlIHVuc3BlY2lmaWVkXG5cbiAgY3l0b3NjYXBlKCAnbGF5b3V0JywgJ2V1bGVyJywgRXVsZXIgKTsgLy8gcmVnaXN0ZXIgd2l0aCBjeXRvc2NhcGUuanNcbn07XG5cbmlmKCB0eXBlb2YgY3l0b3NjYXBlICE9PSAndW5kZWZpbmVkJyApeyAvLyBleHBvc2UgdG8gZ2xvYmFsIGN5dG9zY2FwZSAoaS5lLiB3aW5kb3cuY3l0b3NjYXBlKVxuICByZWdpc3RlciggY3l0b3NjYXBlICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVnaXN0ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIvLyBnZW5lcmFsIGRlZmF1bHQgb3B0aW9ucyBmb3IgZm9yY2UtZGlyZWN0ZWQgbGF5b3V0XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIGFuaW1hdGU6IHRydWUsIC8vIHdoZXRoZXIgdG8gc2hvdyB0aGUgbGF5b3V0IGFzIGl0J3MgcnVubmluZzsgc3BlY2lhbCAnZW5kJyB2YWx1ZSBtYWtlcyB0aGUgbGF5b3V0IGFuaW1hdGUgbGlrZSBhIGRpc2NyZXRlIGxheW91dFxuICByZWZyZXNoOiAxMCwgLy8gbnVtYmVyIG9mIHRpY2tzIHBlciBmcmFtZTsgaGlnaGVyIGlzIGZhc3RlciBidXQgbW9yZSBqZXJreVxuICBtYXhJdGVyYXRpb25zOiAxMDAwLCAvLyBtYXggaXRlcmF0aW9ucyBiZWZvcmUgdGhlIGxheW91dCB3aWxsIGJhaWwgb3V0XG4gIG1heFNpbXVsYXRpb25UaW1lOiA0MDAwLCAvLyBtYXggbGVuZ3RoIGluIG1zIHRvIHJ1biB0aGUgbGF5b3V0XG4gIHVuZ3JhYmlmeVdoaWxlU2ltdWxhdGluZzogZmFsc2UsIC8vIHNvIHlvdSBjYW4ndCBkcmFnIG5vZGVzIGR1cmluZyBsYXlvdXRcbiAgZml0OiB0cnVlLCAvLyBvbiBldmVyeSBsYXlvdXQgcmVwb3NpdGlvbiBvZiBub2RlcywgZml0IHRoZSB2aWV3cG9ydFxuICBwYWRkaW5nOiAzMCwgLy8gcGFkZGluZyBhcm91bmQgdGhlIHNpbXVsYXRpb25cbiAgYm91bmRpbmdCb3g6IHVuZGVmaW5lZCwgLy8gY29uc3RyYWluIGxheW91dCBib3VuZHM7IHsgeDEsIHkxLCB4MiwgeTIgfSBvciB7IHgxLCB5MSwgdywgaCB9XG5cbiAgLy8gbGF5b3V0IGV2ZW50IGNhbGxiYWNrc1xuICByZWFkeTogZnVuY3Rpb24oKXt9LCAvLyBvbiBsYXlvdXRyZWFkeVxuICBzdG9wOiBmdW5jdGlvbigpe30sIC8vIG9uIGxheW91dHN0b3BcblxuICAvLyBwb3NpdGlvbmluZyBvcHRpb25zXG4gIHJhbmRvbWl6ZTogZmFsc2UsIC8vIHVzZSByYW5kb20gbm9kZSBwb3NpdGlvbnMgYXQgYmVnaW5uaW5nIG9mIGxheW91dFxuXG4gIC8vIFRPRE8gb3RoZXIgZ2VuZXJpYyBmb3JjZS1kaXJlY3RlZCBvcHRpb25zXG5cbiAgLy8gaW5maW5pdGUgbGF5b3V0IG9wdGlvbnNcbiAgaW5maW5pdGU6IGZhbHNlIC8vIG92ZXJyaWRlcyBhbGwgb3RoZXIgb3B0aW9ucyBmb3IgYSBmb3JjZXMtYWxsLXRoZS10aW1lIG1vZGVcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xheW91dC9kZWZhdWx0cy5qcyIsIi8qKlxuQSBnZW5lcmljIGZvcmNlLWRpcmVjdGVkIGxheW91dCBjbGFzc1xuKi9cblxuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi4vYXNzaWduJyk7XG5jb25zdCBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcbmNvbnN0IG1ha2VCb3VuZGluZ0JveCA9IHJlcXVpcmUoJy4vbWFrZS1iYicpO1xuY29uc3QgeyBzZXRJbml0aWFsTm9kZVBvc2l0aW9uLCByZWZyZXNoUG9zaXRpb25zLCBnZXROb2RlUG9zaXRpb25EYXRhIH0gPSByZXF1aXJlKCcuL3Bvc2l0aW9uJyk7XG5jb25zdCB7IG11bHRpdGljayB9ID0gcmVxdWlyZSgnLi90aWNrJyk7XG5cbmNsYXNzIExheW91dCB7XG4gIGNvbnN0cnVjdG9yKCBvcHRpb25zICl7XG4gICAgbGV0IG8gPSB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApO1xuXG4gICAgbGV0IHMgPSB0aGlzLnN0YXRlID0gYXNzaWduKCB7fSwgbywge1xuICAgICAgbGF5b3V0OiB0aGlzLFxuICAgICAgbm9kZXM6IG8uZWxlcy5ub2RlcygpLFxuICAgICAgZWRnZXM6IG8uZWxlcy5lZGdlcygpLFxuICAgICAgdGlja0luZGV4OiAwLFxuICAgICAgZmlyc3RVcGRhdGU6IHRydWVcbiAgICB9ICk7XG5cbiAgICBzLmFuaW1hdGVFbmQgPSBvLmFuaW1hdGUgJiYgby5hbmltYXRlID09PSAnZW5kJztcbiAgICBzLmFuaW1hdGVDb250aW51b3VzbHkgPSBvLmFuaW1hdGUgJiYgIXMuYW5pbWF0ZUVuZDtcbiAgfVxuXG4gIHJ1bigpe1xuICAgIGxldCBsID0gdGhpcztcbiAgICBsZXQgcyA9IHRoaXMuc3RhdGU7XG5cbiAgICBzLnRpY2tJbmRleCA9IDA7XG4gICAgcy5maXJzdFVwZGF0ZSA9IHRydWU7XG5cbiAgICBzLnJ1bm5pbmcgPSB0cnVlO1xuXG4gICAgcy5jdXJyZW50Qm91bmRpbmdCb3ggPSBtYWtlQm91bmRpbmdCb3goIHMuYm91bmRpbmdCb3gsIHMuY3kgKTtcblxuICAgIGlmKCBzLnJlYWR5ICl7IGwub25lKCAncmVhZHknLCBzLnJlYWR5ICk7IH1cbiAgICBpZiggcy5zdG9wICl7IGwub25lKCAnc3RvcCcsIHMuc3RvcCApOyB9XG5cbiAgICBzLm5vZGVzLmZvckVhY2goIG4gPT4gc2V0SW5pdGlhbE5vZGVQb3NpdGlvbiggbiwgcyApICk7XG5cbiAgICBsLnByZXJ1biggcyApO1xuXG4gICAgaWYoIHMuYW5pbWF0ZUNvbnRpbnVvdXNseSApe1xuICAgICAgbGV0IGZpdCA9ICgpID0+IHtcbiAgICAgICAgaWYoIHMuZml0ICYmIHMuYW5pbWF0ZUNvbnRpbnVvdXNseSApe1xuICAgICAgICAgIHMuY3kuZml0KCBzLnBhZGRpbmcgKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgbGV0IG9uTm90RG9uZSA9ICgpID0+IHtcbiAgICAgICAgcmVmcmVzaFBvc2l0aW9ucyggcy5ub2RlcyApO1xuICAgICAgICBmaXQoKTtcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGZyYW1lICk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgZnJhbWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBtdWx0aXRpY2soIHMsIG9uTm90RG9uZSwgb25Eb25lICk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgb25Eb25lID0gKCkgPT4ge1xuICAgICAgICByZWZyZXNoUG9zaXRpb25zKCBzLm5vZGVzICk7XG4gICAgICAgIGZpdCgpO1xuXG4gICAgICAgIHMucnVubmluZyA9IGZhbHNlO1xuXG4gICAgICAgIGwuZW1pdCgnbGF5b3V0c3RvcCcpO1xuICAgICAgfTtcblxuICAgICAgbC5lbWl0KCdsYXlvdXRzdGFydCcpO1xuXG4gICAgICBmcmFtZSgpOyAvLyBraWNrIG9mZlxuICAgIH0gZWxzZSB7XG4gICAgICBtdWx0aXRpY2soIHMgKTtcblxuICAgICAgcy5lbGVzLmxheW91dFBvc2l0aW9ucyggdGhpcywgcywgZ2V0Tm9kZVBvc2l0aW9uRGF0YSApO1xuICAgIH1cblxuICAgIGwucG9zdHJ1biggcyApO1xuXG4gICAgcmV0dXJuIHRoaXM7IC8vIGNoYWluaW5nXG4gIH1cblxuICBwcmVydW4oKXt9XG4gIHBvc3RydW4oKXt9XG4gIHRpY2soKXt9XG5cbiAgc3RvcCgpe1xuICAgIHRoaXMuc3RhdGUucnVubmluZyA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIHRoaXM7IC8vIGNoYWluaW5nXG4gIH1cblxuICBkZXN0cm95KCl7XG4gICAgcmV0dXJuIHRoaXM7IC8vIGNoYWluaW5nXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMYXlvdXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGF5b3V0L2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiggYmIsIGN5ICl7XG4gIGlmKCBiYiA9PSBudWxsICl7XG4gICAgYmIgPSB7IHgxOiAwLCB5MTogMCwgdzogY3kud2lkdGgoKSwgaDogY3kuaGVpZ2h0KCkgfTtcbiAgfSBlbHNlIHsgLy8gY29weVxuICAgIGJiID0geyB4MTogYmIueDEsIHgyOiBiYi54MiwgeTE6IGJiLnkxLCB5MjogYmIueTIsIHc6IGJiLncsIGg6IGJiLmggfTtcbiAgfVxuXG4gIGlmKCBiYi54MiA9PSBudWxsICl7IGJiLngyID0gYmIueDEgKyBiYi53OyB9XG4gIGlmKCBiYi53ID09IG51bGwgKXsgYmIudyA9IGJiLngyIC0gYmIueDE7IH1cbiAgaWYoIGJiLnkyID09IG51bGwgKXsgYmIueTIgPSBiYi55MSArIGJiLmg7IH1cbiAgaWYoIGJiLmggPT0gbnVsbCApeyBiYi5oID0gYmIueTIgLSBiYi55MTsgfVxuXG4gIHJldHVybiBiYjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGF5b3V0L21ha2UtYmIuanMiLCJjb25zdCB7IGdldE5vZGVQb3NpdGlvbkRhdGEgfSA9IHJlcXVpcmUoJy4vcG9zaXRpb24nKTtcbmNvbnN0IG5vcCA9IGZ1bmN0aW9uKCl7fTtcblxubGV0IHRpY2sgPSBmdW5jdGlvbiggc3RhdGUgKXtcbiAgbGV0IHMgPSBzdGF0ZTtcbiAgbGV0IGwgPSBzdGF0ZS5sYXlvdXQ7XG5cbiAgaWYoIHMudGlja0luZGV4ID49IHMubWF4SXRlcmF0aW9ucyApeyByZXR1cm4gdHJ1ZTsgfVxuXG4gIGxldCBpc0RvbmUgPSBsLnRpY2soIHMgKTtcblxuICBpZiggcy5maXJzdFVwZGF0ZSApe1xuICAgIGlmKCBzLmFuaW1hdGVDb250aW51b3VzbHkgKXsgLy8gaW5kaWNhdGUgdGhlIGluaXRpYWwgcG9zaXRpb25zIGhhdmUgYmVlbiBzZXRcbiAgICAgIHMubGF5b3V0LmVtaXQoJ2xheW91dHJlYWR5Jyk7XG4gICAgfVxuICAgIHMuZmlyc3RVcGRhdGUgPSBmYWxzZTtcbiAgfVxuXG4gIHMudGlja0luZGV4Kys7XG5cbiAgcmV0dXJuIGlzRG9uZTtcbn07XG5cbmxldCBtdWx0aXRpY2sgPSBmdW5jdGlvbiggc3RhdGUsIG9uTm90RG9uZSA9IG5vcCwgb25Eb25lID0gbm9wICl7XG4gIGxldCBkb25lID0gZmFsc2U7XG4gIGxldCBzID0gc3RhdGU7XG5cbiAgZm9yKCBsZXQgaSA9IDA7IGkgPCBzLm1heEl0ZXJhdGlvbnM7IGkrKyApe1xuICAgIGRvbmUgPSAhcy5ydW5uaW5nIHx8IHRpY2soIHMgKTtcblxuICAgIGlmKCBkb25lICl7IGJyZWFrOyB9XG4gIH1cblxuICBpZiggIWRvbmUgKXtcbiAgICBvbk5vdERvbmUoKTtcbiAgfSBlbHNlIHtcbiAgICBvbkRvbmUoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHRpY2ssIG11bHRpdGljayB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xheW91dC90aWNrLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==