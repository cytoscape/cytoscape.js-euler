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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
The implementation of the Euler layout algorithm
*/

var Layout = __webpack_require__(13);
var assign = __webpack_require__(0);
var defaults = __webpack_require__(4);

var _require = __webpack_require__(10),
    _tick = _require.tick;

var _require2 = __webpack_require__(7),
    makeQuadtree = _require2.makeQuadtree;

var _require3 = __webpack_require__(3),
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
        return notIsParent(n);
      }).forEach(function (n) {
        var scratch = getScratch(n);

        var body = makeBody({
          pos: { x: scratch.x, y: scratch.y },
          mass: optFn(s.mass, n),
          locked: scratch.locked
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
/* 3 */
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
  b.locked = opts.locked;

  return b;
}

module.exports = { makeBody: makeBody };

/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
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

    if (body.grabbed) {
      continue;
    }

    if (body.locked) {
      body.velocity.x = 0;
      body.velocity.y = 0;
    } else {
      body.velocity.x += coeff * body.force.x;
      body.velocity.y += coeff * body.force.y;
    }

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// impl of barnes hut
// http://www.eecs.berkeley.edu/~demmel/cs267/lecture26/lecture26.html
// http://en.wikipedia.org/wiki/Barnes%E2%80%93Hut_simulation

var Node = __webpack_require__(9);
var InsertStack = __webpack_require__(8);

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
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(6),
    integrate = _require.integrate;

var _require2 = __webpack_require__(5),
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

  // update body from scratch in case of any changes
  bodies.forEach(function (body) {
    var p = body._scratch;

    if (!p) {
      return;
    }

    if (p.grabbed) {
      console.log('grabbed');
    }

    body.locked = p.locked;
    body.grabbed = p.grabbed;
    body.pos.x = p.x;
    body.pos.y = p.y;
  });

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Euler = __webpack_require__(2);

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
/* 12 */
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

  // infinite layout options
  infinite: false // overrides all other options for a forces-all-the-time mode
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
A generic continuous layout class
*/

var assign = __webpack_require__(0);
var defaults = __webpack_require__(12);
var makeBoundingBox = __webpack_require__(14);

var _require = __webpack_require__(15),
    setInitialPositionState = _require.setInitialPositionState,
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
        return setInitialPositionState(n, s);
      });

      l.prerun(s);

      if (s.animateContinuously) {
        var ungrabify = function ungrabify(node) {
          if (!s.ungrabifyWhileSimulating) {
            return;
          }

          var grabbable = getNodePositionData(node, s).grabbable = node.grabbable();

          if (grabbable) {
            node.ungrabify();
          }
        };

        var regrabify = function regrabify(node) {
          if (!s.ungrabifyWhileSimulating) {
            return;
          }

          var grabbable = getNodePositionData(node, s).grabbable;

          if (grabbable) {
            node.grabify();
          }
        };

        var updateGrabState = function updateGrabState(node) {
          return getNodePositionData(node, s).grabbed = node.grabbed();
        };

        var onGrab = function onGrab(_ref) {
          var target = _ref.target;

          updateGrabState(target);
        };

        var onFree = onGrab;

        var onDrag = function onDrag(_ref2) {
          var target = _ref2.target;

          var p = getNodePositionData(target, s);
          var tp = target.position();

          p.x = tp.x;
          p.y = tp.y;
        };

        var listenToGrab = function listenToGrab(node) {
          node.on('grab', onGrab);
          node.on('free', onFree);
          node.on('drag', onDrag);
        };

        var unlistenToGrab = function unlistenToGrab(node) {
          node.removeListener('grab', onGrab);
          node.removeListener('free', onFree);
          node.removeListener('drag', onDrag);
        };

        var fit = function fit() {
          if (s.fit && s.animateContinuously) {
            s.cy.fit(s.padding);
          }
        };

        var onNotDone = function onNotDone() {
          refreshPositions(s.nodes, s);
          fit();

          requestAnimationFrame(_frame);
        };

        var _frame = function _frame() {
          multitick(s, onNotDone, _onDone);
        };

        var _onDone = function _onDone() {
          refreshPositions(s.nodes, s);
          fit();

          s.nodes.forEach(function (n) {
            regrabify(n);
            unlistenToGrab(n);
          });

          s.running = false;

          l.emit('layoutstop');
        };

        s.startTime = Date.now();

        l.emit('layoutstart');

        s.nodes.forEach(function (n) {
          ungrabify(n);
          listenToGrab(n);
        });

        _frame(); // kick off
      } else {
        multitick(s);

        s.eles.layoutPositions(this, s, function (node) {
          return getNodePositionData(node, s);
        });
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(0);

var setInitialPositionState = function setInitialPositionState(node, state) {
  var p = node.position();
  var bb = state.currentBoundingBox;
  var scratch = node.scratch(state.name);

  if (scratch == null) {
    scratch = {};

    node.scratch(state.name, scratch);
  }

  assign(scratch, state.randomize ? {
    x: bb.x1 + Math.round(Math.random() * bb.w),
    y: bb.y1 + Math.round(Math.random() * bb.h)
  } : {
    x: p.x,
    y: p.y
  });

  scratch.locked = node.locked();
};

var getNodePositionData = function getNodePositionData(node, state) {
  return node.scratch(state.name);
};

var refreshPositions = function refreshPositions(nodes, state) {
  nodes.positions(function (node) {
    var scratch = node.scratch(state.name);

    return {
      x: scratch.x,
      y: scratch.y
    };
  });
};

module.exports = { setInitialPositionState: setInitialPositionState, getNodePositionData: getNodePositionData, refreshPositions: refreshPositions };

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nop = function nop() {};

var tick = function tick(state) {
  var s = state;
  var l = state.layout;

  var tickIndicatesDone = l.tick(s);

  if (s.firstUpdate) {
    if (s.animateContinuously) {
      // indicate the initial positions have been set
      s.layout.emit('layoutready');
    }
    s.firstUpdate = false;
  }

  s.tickIndex++;

  var duration = s.startTime - Date.now();

  return !s.infinite && (tickIndicatesDone || s.tickIndex >= s.maxIterations || duration >= s.maxSimulationTime);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0NGJjOGVjMzI1ZWIwZGM4Njg5MyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9zcHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V1bGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9ib2R5LmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXVsZXIvZHJhZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXVsZXIvaW50ZWdyYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9xdWFkdHJlZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXVsZXIvcXVhZHRyZWUvaW5zZXJ0U3RhY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V1bGVyL3F1YWR0cmVlL25vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V1bGVyL3RpY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9sYXlvdXQvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L21ha2UtYmIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9wb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L3RpY2suanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIk9iamVjdCIsImFzc2lnbiIsImJpbmQiLCJ0Z3QiLCJzcmNzIiwiZm9yRWFjaCIsImtleXMiLCJzcmMiLCJrIiwicmVxdWlyZSIsImRlZmF1bHRzIiwiZnJlZXplIiwic291cmNlIiwidGFyZ2V0IiwibGVuZ3RoIiwiY29lZmYiLCJ3ZWlnaHQiLCJtYWtlU3ByaW5nIiwic3ByaW5nIiwiYXBwbHlTcHJpbmciLCJib2R5MSIsImJvZHkyIiwiZHgiLCJwb3MiLCJ4IiwiZHkiLCJ5IiwiciIsIk1hdGgiLCJzcXJ0IiwicmFuZG9tIiwiZCIsInNwcmluZ0NvZWZmIiwiZm9yY2UiLCJMYXlvdXQiLCJ0aWNrIiwibWFrZVF1YWR0cmVlIiwibWFrZUJvZHkiLCJpc0ZuIiwiZm4iLCJpc1BhcmVudCIsIm4iLCJub3RJc1BhcmVudCIsImlzTG9ja2VkIiwibG9ja2VkIiwibm90SXNMb2NrZWQiLCJpc1BhcmVudEVkZ2UiLCJlIiwibm90SXNQYXJlbnRFZGdlIiwiZ2V0Qm9keSIsInNjcmF0Y2giLCJib2R5IiwiZ2V0Tm9uUGFyZW50RGVzY2VuZGFudHMiLCJkZXNjZW5kYW50cyIsImZpbHRlciIsImdldFNjcmF0Y2giLCJlbCIsIm9wdEZuIiwib3B0IiwiZWxlIiwiRXVsZXIiLCJvcHRpb25zIiwic3RhdGUiLCJzIiwicXVhZHRyZWUiLCJib2RpZXMiLCJub2RlcyIsIm1hc3MiLCJfY3lOb2RlIiwiX3NjcmF0Y2giLCJwdXNoIiwic3ByaW5ncyIsImVkZ2VzIiwic3ByaW5nTGVuZ3RoIiwiX2N5RWRnZSIsInNvdXJjZXMiLCJ0YXJnZXRzIiwibW92ZW1lbnQiLCJpc0RvbmUiLCJtb3ZlbWVudFRocmVzaG9sZCIsInByZXZQb3MiLCJ2ZWxvY2l0eSIsImNvcHlWZWMiLCJ2IiwiZ2V0VmFsdWUiLCJ2YWwiLCJkZWYiLCJnZXRWZWMiLCJ2ZWMiLCJvcHRzIiwiYiIsImdyYXZpdHkiLCJ0aGV0YSIsImRyYWdDb2VmZiIsInRpbWVTdGVwIiwiZGVmYXVsdENvZWZmIiwiYXBwbHlEcmFnIiwibWFudWFsRHJhZ0NvZWZmIiwiaW50ZWdyYXRlIiwidHgiLCJ0eSIsImkiLCJtYXgiLCJncmFiYmVkIiwidngiLCJ2eSIsImFicyIsIk5vZGUiLCJJbnNlcnRTdGFjayIsInJlc2V0VmVjIiwiaXNTYW1lUG9zaXRpb24iLCJwMSIsInAyIiwidGhyZXNob2xkIiwidXBkYXRlUXVldWUiLCJpbnNlcnRTdGFjayIsIm5vZGVzQ2FjaGUiLCJjdXJyZW50SW5DYWNoZSIsInJvb3QiLCJuZXdOb2RlIiwibm9kZSIsInF1YWQwIiwicXVhZDEiLCJxdWFkMiIsInF1YWQzIiwibWFzc1giLCJtYXNzWSIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsInVwZGF0ZSIsInNvdXJjZUJvZHkiLCJxdWV1ZSIsImZ4IiwiZnkiLCJxdWV1ZUxlbmd0aCIsInNoaWZ0SWR4IiwicHVzaElkeCIsImRpZmZlcmVudEJvZHkiLCJpbnNlcnRCb2RpZXMiLCJ4MSIsIk51bWJlciIsIk1BWF9WQUxVRSIsInkxIiwieDIiLCJNSU5fVkFMVUUiLCJ5MiIsImluc2VydCIsIm5ld0JvZHkiLCJyZXNldCIsImlzRW1wdHkiLCJzdGFja0l0ZW0iLCJwb3AiLCJxdWFkSWR4IiwiY2hpbGQiLCJnZXRDaGlsZCIsInNldENoaWxkIiwib2xkQm9keSIsInJldHJpZXNDb3VudCIsIm9mZnNldCIsInVwZGF0ZUJvZHlGb3JjZSIsImlkeCIsInN0YWNrIiwicG9wSWR4IiwicHJvdG90eXBlIiwiaXRlbSIsIkluc2VydFN0YWNrRWxlbWVudCIsInAiLCJjb25zb2xlIiwibG9nIiwicmVnaXN0ZXIiLCJjeXRvc2NhcGUiLCJhbmltYXRlIiwicmVmcmVzaCIsIm1heEl0ZXJhdGlvbnMiLCJtYXhTaW11bGF0aW9uVGltZSIsInVuZ3JhYmlmeVdoaWxlU2ltdWxhdGluZyIsImZpdCIsInBhZGRpbmciLCJib3VuZGluZ0JveCIsInVuZGVmaW5lZCIsInJlYWR5Iiwic3RvcCIsInJhbmRvbWl6ZSIsImluZmluaXRlIiwibWFrZUJvdW5kaW5nQm94Iiwic2V0SW5pdGlhbFBvc2l0aW9uU3RhdGUiLCJyZWZyZXNoUG9zaXRpb25zIiwiZ2V0Tm9kZVBvc2l0aW9uRGF0YSIsIm11bHRpdGljayIsIm8iLCJsYXlvdXQiLCJlbGVzIiwidGlja0luZGV4IiwiZmlyc3RVcGRhdGUiLCJhbmltYXRlRW5kIiwiYW5pbWF0ZUNvbnRpbnVvdXNseSIsImwiLCJydW5uaW5nIiwiY3VycmVudEJvdW5kaW5nQm94IiwiY3kiLCJvbmUiLCJwcmVydW4iLCJ1bmdyYWJpZnkiLCJncmFiYmFibGUiLCJyZWdyYWJpZnkiLCJncmFiaWZ5IiwidXBkYXRlR3JhYlN0YXRlIiwib25HcmFiIiwib25GcmVlIiwib25EcmFnIiwidHAiLCJwb3NpdGlvbiIsImxpc3RlblRvR3JhYiIsIm9uIiwidW5saXN0ZW5Ub0dyYWIiLCJyZW1vdmVMaXN0ZW5lciIsIm9uTm90RG9uZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZyYW1lIiwib25Eb25lIiwiZW1pdCIsInN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJsYXlvdXRQb3NpdGlvbnMiLCJwb3N0cnVuIiwiYmIiLCJ3Iiwid2lkdGgiLCJoIiwiaGVpZ2h0IiwibmFtZSIsInJvdW5kIiwicG9zaXRpb25zIiwibm9wIiwidGlja0luZGljYXRlc0RvbmUiLCJkdXJhdGlvbiIsImRvbmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNoRUFBLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU9DLE1BQVAsSUFB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RWlJLE1BQUYsQ0FBUzhCLElBQVQsQ0FBYyxhQUFkO0FBQ0Q7QUFDRC9KLE1BQUVvSSxXQUFGLEdBQWdCLEtBQWhCO0FBQ0Q7O0FBRURwSSxJQUFFbUksU0FBRjs7QUFFQSxNQUFJNEMsV0FBVy9LLEVBQUVnSyxTQUFGLEdBQWNDLEtBQUtDLEdBQUwsRUFBN0I7O0FBRUEsU0FBTyxDQUFDbEssRUFBRTBILFFBQUgsS0FBaUJvRCxxQkFBcUI5SyxFQUFFbUksU0FBRixJQUFlbkksRUFBRWdILGFBQXRDLElBQXVEK0QsWUFBWS9LLEVBQUVpSCxpQkFBdEYsQ0FBUDtBQUNELENBbEJEOztBQW9CQSxJQUFJYyxZQUFZLFNBQVpBLFNBQVksQ0FBVWhJLEtBQVYsRUFBZ0Q7QUFBQSxNQUEvQjRKLFNBQStCLHVFQUFuQmtCLEdBQW1CO0FBQUEsTUFBZGYsTUFBYyx1RUFBTGUsR0FBSzs7QUFDOUQsTUFBSUcsT0FBTyxLQUFYO0FBQ0EsTUFBSWhMLElBQUlELEtBQVI7O0FBRUEsT0FBSyxJQUFJdUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJdEMsRUFBRWdILGFBQXRCLEVBQXFDMUUsR0FBckMsRUFBMEM7QUFDeEMwSSxXQUFPLENBQUNoTCxFQUFFd0ksT0FBSCxJQUFjcEssS0FBTTRCLENBQU4sQ0FBckI7O0FBRUEsUUFBSWdMLElBQUosRUFBVTtBQUFFO0FBQVE7QUFDckI7O0FBRUQsTUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDVHJCO0FBQ0QsR0FGRCxNQUVPO0FBQ0xHO0FBQ0Q7QUFDRixDQWZEOztBQWlCQS9OLE9BQU9DLE9BQVAsR0FBaUIsRUFBRW9DLFVBQUYsRUFBUTJKLG9CQUFSLEVBQWpCLEMiLCJmaWxlIjoiY3l0b3NjYXBlLWV1bGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3l0b3NjYXBlRXVsZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiY3l0b3NjYXBlRXVsZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDRiYzhlYzMyNWViMGRjODY4OTMiLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gIT0gbnVsbCA/IE9iamVjdC5hc3NpZ24uYmluZCggT2JqZWN0ICkgOiBmdW5jdGlvbiggdGd0LCAuLi5zcmNzICl7XG4gIHNyY3MuZm9yRWFjaCggc3JjID0+IHtcbiAgICBPYmplY3Qua2V5cyggc3JjICkuZm9yRWFjaCggayA9PiB0Z3Rba10gPSBzcmNba10gKTtcbiAgfSApO1xuXG4gIHJldHVybiB0Z3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2lnbi5qcyIsImNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJy4uL2Fzc2lnbicpO1xuXG5jb25zdCBkZWZhdWx0cyA9IE9iamVjdC5mcmVlemUoe1xuICBzb3VyY2U6IG51bGwsXG4gIHRhcmdldDogbnVsbCxcbiAgbGVuZ3RoOiA4MCxcbiAgY29lZmY6IDAuMDAwMixcbiAgd2VpZ2h0OiAxXG59KTtcblxuZnVuY3Rpb24gbWFrZVNwcmluZyggc3ByaW5nICl7XG4gIHJldHVybiBhc3NpZ24oIHt9LCBkZWZhdWx0cywgc3ByaW5nICk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5U3ByaW5nKCBzcHJpbmcgKXtcbiAgbGV0IGJvZHkxID0gc3ByaW5nLnNvdXJjZSxcbiAgICAgIGJvZHkyID0gc3ByaW5nLnRhcmdldCxcbiAgICAgIGxlbmd0aCA9IHNwcmluZy5sZW5ndGggPCAwID8gZGVmYXVsdHMubGVuZ3RoIDogc3ByaW5nLmxlbmd0aCxcbiAgICAgIGR4ID0gYm9keTIucG9zLnggLSBib2R5MS5wb3MueCxcbiAgICAgIGR5ID0gYm9keTIucG9zLnkgLSBib2R5MS5wb3MueSxcbiAgICAgIHIgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG4gIGlmIChyID09PSAwKSB7XG4gICAgICBkeCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAvIDUwO1xuICAgICAgZHkgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgLyA1MDtcbiAgICAgIHIgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICB9XG5cbiAgbGV0IGQgPSByIC0gbGVuZ3RoO1xuICBsZXQgY29lZmYgPSAoKCFzcHJpbmcuY29lZmYgfHwgc3ByaW5nLmNvZWZmIDwgMCkgPyBkZWZhdWx0cy5zcHJpbmdDb2VmZiA6IHNwcmluZy5jb2VmZikgKiBkIC8gciAqIHNwcmluZy53ZWlnaHQ7XG5cbiAgYm9keTEuZm9yY2UueCArPSBjb2VmZiAqIGR4O1xuICBib2R5MS5mb3JjZS55ICs9IGNvZWZmICogZHk7XG5cbiAgYm9keTIuZm9yY2UueCAtPSBjb2VmZiAqIGR4O1xuICBib2R5Mi5mb3JjZS55IC09IGNvZWZmICogZHk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBtYWtlU3ByaW5nLCBhcHBseVNwcmluZyB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V1bGVyL3NwcmluZy5qcyIsIi8qKlxuVGhlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBFdWxlciBsYXlvdXQgYWxnb3JpdGhtXG4qL1xuXG5jb25zdCBMYXlvdXQgPSByZXF1aXJlKCcuLi9sYXlvdXQnKTtcbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJy4uL2Fzc2lnbicpO1xuY29uc3QgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5jb25zdCB7IHRpY2sgfSA9IHJlcXVpcmUoJy4vdGljaycpO1xuY29uc3QgeyBtYWtlUXVhZHRyZWUgfSA9IHJlcXVpcmUoJy4vcXVhZHRyZWUnKTtcbmNvbnN0IHsgbWFrZUJvZHkgfSA9IHJlcXVpcmUoJy4vYm9keScpO1xuY29uc3QgeyBtYWtlU3ByaW5nIH0gPSByZXF1aXJlKCcuL3NwcmluZycpO1xuY29uc3QgaXNGbiA9IGZuID0+IHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJztcbmNvbnN0IGlzUGFyZW50ID0gbiA9PiBuLmlzUGFyZW50KCk7XG5jb25zdCBub3RJc1BhcmVudCA9IG4gPT4gIWlzUGFyZW50KG4pO1xuY29uc3QgaXNMb2NrZWQgPSBuID0+IG4ubG9ja2VkKCk7XG5jb25zdCBub3RJc0xvY2tlZCA9IG4gPT4gIWlzTG9ja2VkKG4pO1xuY29uc3QgaXNQYXJlbnRFZGdlID0gZSA9PiBpc1BhcmVudCggZS5zb3VyY2UoKSApIHx8IGlzUGFyZW50KCBlLnRhcmdldCgpICk7XG5jb25zdCBub3RJc1BhcmVudEVkZ2UgPSBlID0+ICFpc1BhcmVudEVkZ2UoZSk7XG5jb25zdCBnZXRCb2R5ID0gbiA9PiBuLnNjcmF0Y2goJ2V1bGVyJykuYm9keTtcbmNvbnN0IGdldE5vblBhcmVudERlc2NlbmRhbnRzID0gbiA9PiBpc1BhcmVudChuKSA/IG4uZGVzY2VuZGFudHMoKS5maWx0ZXIoIG5vdElzUGFyZW50ICkgOiBuO1xuXG5jb25zdCBnZXRTY3JhdGNoID0gZWwgPT4ge1xuICBsZXQgc2NyYXRjaCA9IGVsLnNjcmF0Y2goJ2V1bGVyJyk7XG5cbiAgaWYoICFzY3JhdGNoICl7XG4gICAgc2NyYXRjaCA9IHt9O1xuXG4gICAgZWwuc2NyYXRjaCgnZXVsZXInLCBzY3JhdGNoKTtcbiAgfVxuXG4gIHJldHVybiBzY3JhdGNoO1xufTtcblxuY29uc3Qgb3B0Rm4gPSAoIG9wdCwgZWxlICkgPT4ge1xuICBpZiggaXNGbiggb3B0ICkgKXtcbiAgICByZXR1cm4gb3B0KCBlbGUgKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb3B0O1xuICB9XG59O1xuXG5jbGFzcyBFdWxlciBleHRlbmRzIExheW91dCB7XG4gIGNvbnN0cnVjdG9yKCBvcHRpb25zICl7XG4gICAgc3VwZXIoIGFzc2lnbigge30sIGRlZmF1bHRzLCBvcHRpb25zICkgKTtcbiAgfVxuXG4gIHByZXJ1biggc3RhdGUgKXtcbiAgICBsZXQgcyA9IHN0YXRlO1xuXG4gICAgcy5xdWFkdHJlZSA9IG1ha2VRdWFkdHJlZSgpO1xuXG4gICAgbGV0IGJvZGllcyA9IHMuYm9kaWVzID0gW107XG5cbiAgICAvLyByZWd1bGFyIG5vZGVzXG4gICAgcy5ub2Rlcy5maWx0ZXIoIG4gPT4gbm90SXNQYXJlbnQobikgKS5mb3JFYWNoKCBuID0+IHtcbiAgICAgIGxldCBzY3JhdGNoID0gZ2V0U2NyYXRjaCggbiApO1xuXG4gICAgICBsZXQgYm9keSA9IG1ha2VCb2R5KHtcbiAgICAgICAgcG9zOiB7IHg6IHNjcmF0Y2gueCwgeTogc2NyYXRjaC55IH0sXG4gICAgICAgIG1hc3M6IG9wdEZuKCBzLm1hc3MsIG4gKSxcbiAgICAgICAgbG9ja2VkOiBzY3JhdGNoLmxvY2tlZFxuICAgICAgfSk7XG5cbiAgICAgIGJvZHkuX2N5Tm9kZSA9IG47XG5cbiAgICAgIHNjcmF0Y2guYm9keSA9IGJvZHk7XG5cbiAgICAgIGJvZHkuX3NjcmF0Y2ggPSBzY3JhdGNoO1xuXG4gICAgICBib2RpZXMucHVzaCggYm9keSApO1xuICAgIH0gKTtcblxuICAgIGxldCBzcHJpbmdzID0gcy5zcHJpbmdzID0gW107XG5cbiAgICAvLyByZWd1bGFyIGVkZ2Ugc3ByaW5nc1xuICAgIHMuZWRnZXMuZmlsdGVyKCBub3RJc1BhcmVudEVkZ2UgKS5mb3JFYWNoKCBlID0+IHtcbiAgICAgIGxldCBzcHJpbmcgPSBtYWtlU3ByaW5nKHtcbiAgICAgICAgc291cmNlOiBnZXRCb2R5KCBlLnNvdXJjZSgpICksXG4gICAgICAgIHRhcmdldDogZ2V0Qm9keSggZS50YXJnZXQoKSApLFxuICAgICAgICBsZW5ndGg6IG9wdEZuKCBzLnNwcmluZ0xlbmd0aCwgZSApLFxuICAgICAgICBjb2VmZjogb3B0Rm4oIHMuc3ByaW5nQ29lZmYsIGUgKVxuICAgICAgfSk7XG5cbiAgICAgIHNwcmluZy5fY3lFZGdlID0gZTtcblxuICAgICAgbGV0IHNjcmF0Y2ggPSBnZXRTY3JhdGNoKCBlICk7XG5cbiAgICAgIHNwcmluZy5fc2NyYXRjaCA9IHNjcmF0Y2g7XG5cbiAgICAgIHNjcmF0Y2guc3ByaW5nID0gc3ByaW5nO1xuXG4gICAgICBzcHJpbmdzLnB1c2goIHNwcmluZyApO1xuICAgIH0gKTtcblxuICAgIC8vIGNvbXBvdW5kIGVkZ2Ugc3ByaW5nc1xuICAgIHMuZWRnZXMuZmlsdGVyKCBpc1BhcmVudEVkZ2UgKS5mb3JFYWNoKCBlID0+IHtcbiAgICAgIGxldCBzb3VyY2VzID0gZ2V0Tm9uUGFyZW50RGVzY2VuZGFudHMoIGUuc291cmNlKCkgKTtcbiAgICAgIGxldCB0YXJnZXRzID0gZ2V0Tm9uUGFyZW50RGVzY2VuZGFudHMoIGUudGFyZ2V0KCkgKTtcblxuICAgICAgLy8ganVzdCBhZGQgb25lIHNwcmluZyBmb3IgcGVyZlxuICAgICAgc291cmNlcyA9IFsgc291cmNlc1swXSBdO1xuICAgICAgdGFyZ2V0cyA9IFsgdGFyZ2V0c1swXSBdO1xuXG4gICAgICBzb3VyY2VzLmZvckVhY2goIHNyYyA9PiB7XG4gICAgICAgIHRhcmdldHMuZm9yRWFjaCggdGd0ID0+IHtcbiAgICAgICAgICBzcHJpbmdzLnB1c2goIG1ha2VTcHJpbmcoe1xuICAgICAgICAgICAgc291cmNlOiBnZXRCb2R5KCBzcmMgKSxcbiAgICAgICAgICAgIHRhcmdldDogZ2V0Qm9keSggdGd0ICksXG4gICAgICAgICAgICBsZW5ndGg6IG9wdEZuKCBzLnNwcmluZ0xlbmd0aCwgZSApLFxuICAgICAgICAgICAgY29lZmY6IG9wdEZuKCBzLnNwcmluZ0NvZWZmLCBlIClcbiAgICAgICAgICB9KSApO1xuICAgICAgICB9ICk7XG4gICAgICB9ICk7XG4gICAgfSApO1xuICB9XG5cbiAgdGljayggc3RhdGUgKXtcbiAgICBsZXQgbW92ZW1lbnQgPSB0aWNrKCBzdGF0ZSApO1xuXG4gICAgbGV0IGlzRG9uZSA9IG1vdmVtZW50IDw9IHN0YXRlLm1vdmVtZW50VGhyZXNob2xkO1xuXG4gICAgcmV0dXJuIGlzRG9uZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV1bGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V1bGVyL2luZGV4LmpzIiwiY29uc3QgZGVmYXVsdHMgPSBPYmplY3QuZnJlZXplKHtcbiAgcG9zOiB7IHg6IDAsIHk6IDAgfSxcbiAgcHJldlBvczogeyB4OiAwLCB5OiAwIH0sXG4gIGZvcmNlOiB7IHg6IDAsIHk6IDAgfSxcbiAgdmVsb2NpdHk6IHsgeDogMCwgeTogMCB9LFxuICBtYXNzOiAxXG59KTtcblxuY29uc3QgY29weVZlYyA9IHYgPT4gKHsgeDogdi54LCB5OiB2LnkgfSk7XG5jb25zdCBnZXRWYWx1ZSA9ICggdmFsLCBkZWYgKSA9PiB2YWwgIT0gbnVsbCA/IHZhbCA6IGRlZjtcbmNvbnN0IGdldFZlYyA9ICggdmVjLCBkZWYgKSA9PiBjb3B5VmVjKCBnZXRWYWx1ZSggdmVjLCBkZWYgKSApO1xuXG5mdW5jdGlvbiBtYWtlQm9keSggb3B0cyApe1xuICBsZXQgYiA9IHt9O1xuXG4gIGIucG9zID0gZ2V0VmVjKCBvcHRzLnBvcywgZGVmYXVsdHMucG9zICk7XG4gIGIucHJldlBvcyA9IGdldFZlYyggb3B0cy5wcmV2UG9zLCBiLnBvcyApO1xuICBiLmZvcmNlID0gZ2V0VmVjKCBvcHRzLmZvcmNlLCBkZWZhdWx0cy5mb3JjZSApO1xuICBiLnZlbG9jaXR5ID0gZ2V0VmVjKCBvcHRzLnZlbG9jaXR5LCBkZWZhdWx0cy52ZWxvY2l0eSApO1xuICBiLm1hc3MgPSBvcHRzLm1hc3MgIT0gbnVsbCA/IG9wdHMubWFzcyA6IGRlZmF1bHRzLm1hc3M7XG4gIGIubG9ja2VkID0gb3B0cy5sb2NrZWQ7XG5cbiAgcmV0dXJuIGI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBtYWtlQm9keSB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V1bGVyL2JvZHkuanMiLCIvLyBUT0RPIGRlZmF1bHQgZXVsZXItc3BlY2lmaWMgb3B0aW9uc1xuY29uc3QgZGVmYXVsdHMgPSBPYmplY3QuZnJlZXplKHtcbiAgLy8gVGhlIGlkZWFsIGxlZ3RoIG9mIGEgc3ByaW5nXG4gIC8vIC0gVGhpcyBhY3RzIGFzIGEgaGludCBmb3IgdGhlIGVkZ2UgbGVuZ3RoXG4gIC8vIC0gVGhlIGVkZ2UgbGVuZ3RoIGNhbiBiZSBsb25nZXIgb3Igc2hvcnRlciBpZiB0aGUgZm9yY2VzIGFyZSBzZXQgdG8gZXh0cmVtZSB2YWx1ZXNcbiAgc3ByaW5nTGVuZ3RoOiBlZGdlID0+IDgwLFxuXG4gIC8vIEhvb2tlJ3MgbGF3IGNvZWZmaWNpZW50XG4gIC8vIC0gVGhlIHZhbHVlIHJhbmdlcyBvbiBbMCwgMV1cbiAgLy8gLSBMb3dlciB2YWx1ZXMgZ2l2ZSBsb29zZXIgc3ByaW5nc1xuICAvLyAtIEhpZ2hlciB2YWx1ZXMgZ2l2ZSB0aWdodGVyIHNwcmluZ3NcbiAgc3ByaW5nQ29lZmY6IGVkZ2UgPT4gMC4wMDA4LFxuXG4gIC8vIFRoZSBtYXNzIG9mIHRoZSBub2RlIGluIHRoZSBwaHlzaWNzIHNpbXVsYXRpb25cbiAgLy8gLSBUaGUgbWFzcyBhZmZlY3RzIHRoZSBncmF2aXR5IG5vZGUgcmVwdWxzaW9uL2F0dHJhY3Rpb25cbiAgbWFzczogbm9kZSA9PiA0LFxuXG4gIC8vIENvdWxvbWIncyBsYXcgY29lZmZpY2llbnRcbiAgLy8gLSBNYWtlcyB0aGUgbm9kZXMgcmVwZWwgZWFjaCBvdGhlciBmb3IgbmVnYXRpdmUgdmFsdWVzXG4gIC8vIC0gTWFrZXMgdGhlIG5vZGVzIGF0dHJhY3QgZWFjaCBvdGhlciBmb3IgcG9zaXRpdmUgdmFsdWVzXG4gIGdyYXZpdHk6IC0xLjIsXG5cbiAgLy8gVGhldGEgY29lZmZpY2llbnQgZnJvbSBCYXJuZXMtSHV0IHNpbXVsYXRpb25cbiAgLy8gLSBWYWx1ZSByYW5nZXMgb24gWzAsIDFdXG4gIC8vIC0gUGVyZm9ybWFuY2UgaXMgYmV0dGVyIHdpdGggc21hbGxlciB2YWx1ZXNcbiAgLy8gLSBWZXJ5IHNtYWxsIHZhbHVlcyBtYXkgbm90IGNyZWF0ZSBlbm91Z2ggZm9yY2UgdG8gZ2l2ZSBhIGdvb2QgcmVzdWx0XG4gIHRoZXRhOiAwLjY2NixcblxuICAvLyBGcmljdGlvbiAvIGRyYWcgY29lZmZpY2llbnQgdG8gbWFrZSB0aGUgc3lzdGVtIHN0YWJpbGlzZSBvdmVyIHRpbWVcbiAgZHJhZ0NvZWZmOiAwLjAyLFxuXG4gIC8vIFdoZW4gdGhlIHRvdGFsIG9mIHRoZSBzcXVhcmVkIHBvc2l0aW9uIGRlbHRhcyBpcyBsZXNzIHRoYW4gdGhpcyB2YWx1ZSwgdGhlIHNpbXVsYXRpb24gZW5kc1xuICBtb3ZlbWVudFRocmVzaG9sZDogMSxcblxuICAvLyBUaGUgYW1vdW50IG9mIHRpbWUgcGFzc2VkIHBlciB0aWNrXG4gIC8vIC0gTGFyZ2VyIHZhbHVlcyByZXN1bHQgaW4gZmFzdGVyIHJ1bnRpbWVzIGJ1dCBtaWdodCBzcHJlYWQgdGhpbmdzIG91dCB0b28gZmFyXG4gIC8vIC0gU21hbGxlciB2YWx1ZXMgcHJvZHVjZSBtb3JlIGFjY3VyYXRlIHJlc3VsdHNcbiAgdGltZVN0ZXA6IDIwXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldWxlci9kZWZhdWx0cy5qcyIsImNvbnN0IGRlZmF1bHRDb2VmZiA9IDAuMDI7XG5cbmZ1bmN0aW9uIGFwcGx5RHJhZyggYm9keSwgbWFudWFsRHJhZ0NvZWZmICl7XG4gIGxldCBkcmFnQ29lZmY7XG5cbiAgaWYoIG1hbnVhbERyYWdDb2VmZiAhPSBudWxsICl7XG4gICAgZHJhZ0NvZWZmID0gbWFudWFsRHJhZ0NvZWZmO1xuICB9IGVsc2UgaWYoIGJvZHkuZHJhZ0NvZWZmICE9IG51bGwgKXtcbiAgICBkcmFnQ29lZmYgPSBib2R5LmRyYWdDb2VmZjtcbiAgfSBlbHNlIHtcbiAgICBkcmFnQ29lZmYgPSBkZWZhdWx0Q29lZmY7XG4gIH1cblxuICBib2R5LmZvcmNlLnggLT0gZHJhZ0NvZWZmICogYm9keS52ZWxvY2l0eS54O1xuICBib2R5LmZvcmNlLnkgLT0gZHJhZ0NvZWZmICogYm9keS52ZWxvY2l0eS55O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgYXBwbHlEcmFnIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXVsZXIvZHJhZy5qcyIsIi8vIHVzZSBldWxlciBtZXRob2QgZm9yIGZvcmNlIGludGVncmF0aW9uIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRXVsZXJfbWV0aG9kXG4vLyByZXR1cm4gc3VtIG9mIHNxdWFyZWQgcG9zaXRpb24gZGVsdGFzXG5mdW5jdGlvbiBpbnRlZ3JhdGUoIGJvZGllcywgdGltZVN0ZXAgKXtcbiAgdmFyIGR4ID0gMCwgdHggPSAwLFxuICAgICAgZHkgPSAwLCB0eSA9IDAsXG4gICAgICBpLFxuICAgICAgbWF4ID0gYm9kaWVzLmxlbmd0aDtcblxuICBpZiAobWF4ID09PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgbWF4OyArK2kpIHtcbiAgICB2YXIgYm9keSA9IGJvZGllc1tpXSxcbiAgICAgICAgY29lZmYgPSB0aW1lU3RlcCAvIGJvZHkubWFzcztcblxuICAgIGlmKCBib2R5LmdyYWJiZWQgKXsgY29udGludWU7IH1cblxuICAgIGlmKCBib2R5LmxvY2tlZCApe1xuICAgICAgYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgICAgIGJvZHkudmVsb2NpdHkueSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvZHkudmVsb2NpdHkueCArPSBjb2VmZiAqIGJvZHkuZm9yY2UueDtcbiAgICAgIGJvZHkudmVsb2NpdHkueSArPSBjb2VmZiAqIGJvZHkuZm9yY2UueTtcbiAgICB9XG5cbiAgICB2YXIgdnggPSBib2R5LnZlbG9jaXR5LngsXG4gICAgICAgIHZ5ID0gYm9keS52ZWxvY2l0eS55LFxuICAgICAgICB2ID0gTWF0aC5zcXJ0KHZ4ICogdnggKyB2eSAqIHZ5KTtcblxuICAgIGlmICh2ID4gMSkge1xuICAgICAgYm9keS52ZWxvY2l0eS54ID0gdnggLyB2O1xuICAgICAgYm9keS52ZWxvY2l0eS55ID0gdnkgLyB2O1xuICAgIH1cblxuICAgIGR4ID0gdGltZVN0ZXAgKiBib2R5LnZlbG9jaXR5Lng7XG4gICAgZHkgPSB0aW1lU3RlcCAqIGJvZHkudmVsb2NpdHkueTtcblxuICAgIGJvZHkucG9zLnggKz0gZHg7XG4gICAgYm9keS5wb3MueSArPSBkeTtcblxuICAgIHR4ICs9IE1hdGguYWJzKGR4KTsgdHkgKz0gTWF0aC5hYnMoZHkpO1xuICB9XG5cbiAgcmV0dXJuICh0eCAqIHR4ICsgdHkgKiB0eSkvbWF4O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgaW50ZWdyYXRlIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXVsZXIvaW50ZWdyYXRlLmpzIiwiLy8gaW1wbCBvZiBiYXJuZXMgaHV0XG4vLyBodHRwOi8vd3d3LmVlY3MuYmVya2VsZXkuZWR1L35kZW1tZWwvY3MyNjcvbGVjdHVyZTI2L2xlY3R1cmUyNi5odG1sXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhcm5lcyVFMiU4MCU5M0h1dF9zaW11bGF0aW9uXG5cbmNvbnN0IE5vZGUgPSByZXF1aXJlKCcuL25vZGUnKTtcbmNvbnN0IEluc2VydFN0YWNrID0gcmVxdWlyZSgnLi9pbnNlcnRTdGFjaycpO1xuXG5jb25zdCByZXNldFZlYyA9IHYgPT4geyB2LnggPSAwOyB2LnkgPSAwOyB9O1xuXG5jb25zdCBpc1NhbWVQb3NpdGlvbiA9IChwMSwgcDIpID0+IHtcbiAgbGV0IHRocmVzaG9sZCA9IDFlLTg7XG4gIGxldCBkeCA9IE1hdGguYWJzKHAxLnggLSBwMi54KTtcbiAgbGV0IGR5ID0gTWF0aC5hYnMocDEueSAtIHAyLnkpO1xuXG4gIHJldHVybiBkeCA8IHRocmVzaG9sZCAmJiBkeSA8IHRocmVzaG9sZDtcbn07XG5cbmZ1bmN0aW9uIG1ha2VRdWFkdHJlZSgpe1xuICBsZXQgdXBkYXRlUXVldWUgPSBbXSxcbiAgICBpbnNlcnRTdGFjayA9IG5ldyBJbnNlcnRTdGFjaygpLFxuICAgIG5vZGVzQ2FjaGUgPSBbXSxcbiAgICBjdXJyZW50SW5DYWNoZSA9IDAsXG4gICAgcm9vdCA9IG5ld05vZGUoKTtcblxuICBmdW5jdGlvbiBuZXdOb2RlKCkge1xuICAgIC8vIFRvIGF2b2lkIHByZXNzdXJlIG9uIEdDIHdlIHJldXNlIG5vZGVzLlxuICAgIGxldCBub2RlID0gbm9kZXNDYWNoZVtjdXJyZW50SW5DYWNoZV07XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIG5vZGUucXVhZDAgPSBudWxsO1xuICAgICAgbm9kZS5xdWFkMSA9IG51bGw7XG4gICAgICBub2RlLnF1YWQyID0gbnVsbDtcbiAgICAgIG5vZGUucXVhZDMgPSBudWxsO1xuICAgICAgbm9kZS5ib2R5ID0gbnVsbDtcbiAgICAgIG5vZGUubWFzcyA9IG5vZGUubWFzc1ggPSBub2RlLm1hc3NZID0gMDtcbiAgICAgIG5vZGUubGVmdCA9IG5vZGUucmlnaHQgPSBub2RlLnRvcCA9IG5vZGUuYm90dG9tID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IG5ldyBOb2RlKCk7XG4gICAgICBub2Rlc0NhY2hlW2N1cnJlbnRJbkNhY2hlXSA9IG5vZGU7XG4gICAgfVxuXG4gICAgKytjdXJyZW50SW5DYWNoZTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSggc291cmNlQm9keSwgZ3Jhdml0eSwgdGhldGEgKSB7XG4gICAgbGV0IHF1ZXVlID0gdXBkYXRlUXVldWUsXG4gICAgICB2LFxuICAgICAgZHgsXG4gICAgICBkeSxcbiAgICAgIHIsIGZ4ID0gMCxcbiAgICAgIGZ5ID0gMCxcbiAgICAgIHF1ZXVlTGVuZ3RoID0gMSxcbiAgICAgIHNoaWZ0SWR4ID0gMCxcbiAgICAgIHB1c2hJZHggPSAxO1xuXG4gICAgcXVldWVbMF0gPSByb290O1xuXG4gICAgcmVzZXRWZWMoIHNvdXJjZUJvZHkuZm9yY2UgKTtcblxuICAgIHdoaWxlIChxdWV1ZUxlbmd0aCkge1xuICAgICAgbGV0IG5vZGUgPSBxdWV1ZVtzaGlmdElkeF0sXG4gICAgICAgIGJvZHkgPSBub2RlLmJvZHk7XG5cbiAgICAgIHF1ZXVlTGVuZ3RoIC09IDE7XG4gICAgICBzaGlmdElkeCArPSAxO1xuICAgICAgbGV0IGRpZmZlcmVudEJvZHkgPSAoYm9keSAhPT0gc291cmNlQm9keSk7XG4gICAgICBpZiAoYm9keSAmJiBkaWZmZXJlbnRCb2R5KSB7XG4gICAgICAgIC8vIElmIHRoZSBjdXJyZW50IG5vZGUgaXMgYSBsZWFmIG5vZGUgKGFuZCBpdCBpcyBub3Qgc291cmNlIGJvZHkpLFxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGZvcmNlIGV4ZXJ0ZWQgYnkgdGhlIGN1cnJlbnQgbm9kZSBvbiBib2R5LCBhbmQgYWRkIHRoaXNcbiAgICAgICAgLy8gYW1vdW50IHRvIGJvZHkncyBuZXQgZm9yY2UuXG4gICAgICAgIGR4ID0gYm9keS5wb3MueCAtIHNvdXJjZUJvZHkucG9zLng7XG4gICAgICAgIGR5ID0gYm9keS5wb3MueSAtIHNvdXJjZUJvZHkucG9zLnk7XG4gICAgICAgIHIgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG4gICAgICAgIGlmIChyID09PSAwKSB7XG4gICAgICAgICAgLy8gUG9vciBtYW4ncyBwcm90ZWN0aW9uIGFnYWluc3QgemVybyBkaXN0YW5jZS5cbiAgICAgICAgICBkeCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAvIDUwO1xuICAgICAgICAgIGR5ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpIC8gNTA7XG4gICAgICAgICAgciA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGlzIGlzIHN0YW5kYXJkIGdyYXZpdGlvbiBmb3JjZSBjYWxjdWxhdGlvbiBidXQgd2UgZGl2aWRlXG4gICAgICAgIC8vIGJ5IHJeMyB0byBzYXZlIHR3byBvcGVyYXRpb25zIHdoZW4gbm9ybWFsaXppbmcgZm9yY2UgdmVjdG9yLlxuICAgICAgICB2ID0gZ3Jhdml0eSAqIGJvZHkubWFzcyAqIHNvdXJjZUJvZHkubWFzcyAvIChyICogciAqIHIpO1xuICAgICAgICBmeCArPSB2ICogZHg7XG4gICAgICAgIGZ5ICs9IHYgKiBkeTtcbiAgICAgIH0gZWxzZSBpZiAoZGlmZmVyZW50Qm9keSkge1xuICAgICAgICAvLyBPdGhlcndpc2UsIGNhbGN1bGF0ZSB0aGUgcmF0aW8gcyAvIHIsICB3aGVyZSBzIGlzIHRoZSB3aWR0aCBvZiB0aGUgcmVnaW9uXG4gICAgICAgIC8vIHJlcHJlc2VudGVkIGJ5IHRoZSBpbnRlcm5hbCBub2RlLCBhbmQgciBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgYm9keVxuICAgICAgICAvLyBhbmQgdGhlIG5vZGUncyBjZW50ZXItb2YtbWFzc1xuICAgICAgICBkeCA9IG5vZGUubWFzc1ggLyBub2RlLm1hc3MgLSBzb3VyY2VCb2R5LnBvcy54O1xuICAgICAgICBkeSA9IG5vZGUubWFzc1kgLyBub2RlLm1hc3MgLSBzb3VyY2VCb2R5LnBvcy55O1xuICAgICAgICByID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuICAgICAgICBpZiAociA9PT0gMCkge1xuICAgICAgICAgIC8vIFNvcnJ5IGFib3V0IGNvZGUgZHVwbHVjYXRpb24uIEkgZG9uJ3Qgd2FudCB0byBjcmVhdGUgbWFueSBmdW5jdGlvbnNcbiAgICAgICAgICAvLyByaWdodCBhd2F5LiBKdXN0IHdhbnQgdG8gc2VlIHBlcmZvcm1hbmNlIGZpcnN0LlxuICAgICAgICAgIGR4ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpIC8gNTA7XG4gICAgICAgICAgZHkgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgLyA1MDtcbiAgICAgICAgICByID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBzIC8gciA8IM64LCB0cmVhdCB0aGlzIGludGVybmFsIG5vZGUgYXMgYSBzaW5nbGUgYm9keSwgYW5kIGNhbGN1bGF0ZSB0aGVcbiAgICAgICAgLy8gZm9yY2UgaXQgZXhlcnRzIG9uIHNvdXJjZUJvZHksIGFuZCBhZGQgdGhpcyBhbW91bnQgdG8gc291cmNlQm9keSdzIG5ldCBmb3JjZS5cbiAgICAgICAgaWYgKChub2RlLnJpZ2h0IC0gbm9kZS5sZWZ0KSAvIHIgPCB0aGV0YSkge1xuICAgICAgICAgIC8vIGluIHRoZSBpZiBzdGF0ZW1lbnQgYWJvdmUgd2UgY29uc2lkZXIgbm9kZSdzIHdpZHRoIG9ubHlcbiAgICAgICAgICAvLyBiZWNhdXNlIHRoZSByZWdpb24gd2FzIHNxdWFyaWZpZWQgZHVyaW5nIHRyZWUgY3JlYXRpb24uXG4gICAgICAgICAgLy8gVGh1cyB0aGVyZSBpcyBubyBkaWZmZXJlbmNlIGJldHdlZW4gdXNpbmcgd2lkdGggb3IgaGVpZ2h0LlxuICAgICAgICAgIHYgPSBncmF2aXR5ICogbm9kZS5tYXNzICogc291cmNlQm9keS5tYXNzIC8gKHIgKiByICogcik7XG4gICAgICAgICAgZnggKz0gdiAqIGR4O1xuICAgICAgICAgIGZ5ICs9IHYgKiBkeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UsIHJ1biB0aGUgcHJvY2VkdXJlIHJlY3Vyc2l2ZWx5IG9uIGVhY2ggb2YgdGhlIGN1cnJlbnQgbm9kZSdzIGNoaWxkcmVuLlxuXG4gICAgICAgICAgLy8gSSBpbnRlbnRpb25hbGx5IHVuZm9sZGVkIHRoaXMgbG9vcCwgdG8gc2F2ZSBzZXZlcmFsIENQVSBjeWNsZXMuXG4gICAgICAgICAgaWYgKG5vZGUucXVhZDApIHtcbiAgICAgICAgICAgIHF1ZXVlW3B1c2hJZHhdID0gbm9kZS5xdWFkMDtcbiAgICAgICAgICAgIHF1ZXVlTGVuZ3RoICs9IDE7XG4gICAgICAgICAgICBwdXNoSWR4ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChub2RlLnF1YWQxKSB7XG4gICAgICAgICAgICBxdWV1ZVtwdXNoSWR4XSA9IG5vZGUucXVhZDE7XG4gICAgICAgICAgICBxdWV1ZUxlbmd0aCArPSAxO1xuICAgICAgICAgICAgcHVzaElkeCArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobm9kZS5xdWFkMikge1xuICAgICAgICAgICAgcXVldWVbcHVzaElkeF0gPSBub2RlLnF1YWQyO1xuICAgICAgICAgICAgcXVldWVMZW5ndGggKz0gMTtcbiAgICAgICAgICAgIHB1c2hJZHggKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG5vZGUucXVhZDMpIHtcbiAgICAgICAgICAgIHF1ZXVlW3B1c2hJZHhdID0gbm9kZS5xdWFkMztcbiAgICAgICAgICAgIHF1ZXVlTGVuZ3RoICs9IDE7XG4gICAgICAgICAgICBwdXNoSWR4ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc291cmNlQm9keS5mb3JjZS54ICs9IGZ4O1xuICAgIHNvdXJjZUJvZHkuZm9yY2UueSArPSBmeTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluc2VydEJvZGllcyhib2RpZXMpIHtcbiAgICBsZXQgeDEgPSBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgeTEgPSBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgeDIgPSBOdW1iZXIuTUlOX1ZBTFVFLFxuICAgICAgeTIgPSBOdW1iZXIuTUlOX1ZBTFVFLFxuICAgICAgaSxcbiAgICAgIG1heCA9IGJvZGllcy5sZW5ndGg7XG5cbiAgICAvLyBUbyByZWR1Y2UgcXVhZCB0cmVlIGRlcHRoIHdlIGFyZSBsb29raW5nIGZvciBleGFjdCBib3VuZGluZyBib3ggb2YgYWxsIHBhcnRpY2xlcy5cbiAgICBpID0gbWF4O1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGxldCB4ID0gYm9kaWVzW2ldLnBvcy54O1xuICAgICAgbGV0IHkgPSBib2RpZXNbaV0ucG9zLnk7XG4gICAgICBpZiAoeCA8IHgxKSB7XG4gICAgICAgIHgxID0geDtcbiAgICAgIH1cbiAgICAgIGlmICh4ID4geDIpIHtcbiAgICAgICAgeDIgPSB4O1xuICAgICAgfVxuICAgICAgaWYgKHkgPCB5MSkge1xuICAgICAgICB5MSA9IHk7XG4gICAgICB9XG4gICAgICBpZiAoeSA+IHkyKSB7XG4gICAgICAgIHkyID0geTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTcXVhcmlmeSB0aGUgYm91bmRzLlxuICAgIGxldCBkeCA9IHgyIC0geDEsXG4gICAgICBkeSA9IHkyIC0geTE7XG4gICAgaWYgKGR4ID4gZHkpIHtcbiAgICAgIHkyID0geTEgKyBkeDtcbiAgICB9IGVsc2Uge1xuICAgICAgeDIgPSB4MSArIGR5O1xuICAgIH1cblxuICAgIGN1cnJlbnRJbkNhY2hlID0gMDtcbiAgICByb290ID0gbmV3Tm9kZSgpO1xuICAgIHJvb3QubGVmdCA9IHgxO1xuICAgIHJvb3QucmlnaHQgPSB4MjtcbiAgICByb290LnRvcCA9IHkxO1xuICAgIHJvb3QuYm90dG9tID0geTI7XG5cbiAgICBpID0gbWF4IC0gMTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICByb290LmJvZHkgPSBib2RpZXNbaV07XG4gICAgfVxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGluc2VydChib2RpZXNbaV0sIHJvb3QpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluc2VydChuZXdCb2R5KSB7XG4gICAgaW5zZXJ0U3RhY2sucmVzZXQoKTtcbiAgICBpbnNlcnRTdGFjay5wdXNoKHJvb3QsIG5ld0JvZHkpO1xuXG4gICAgd2hpbGUgKCFpbnNlcnRTdGFjay5pc0VtcHR5KCkpIHtcbiAgICAgIGxldCBzdGFja0l0ZW0gPSBpbnNlcnRTdGFjay5wb3AoKSxcbiAgICAgICAgbm9kZSA9IHN0YWNrSXRlbS5ub2RlLFxuICAgICAgICBib2R5ID0gc3RhY2tJdGVtLmJvZHk7XG5cbiAgICAgIGlmICghbm9kZS5ib2R5KSB7XG4gICAgICAgIC8vIFRoaXMgaXMgaW50ZXJuYWwgbm9kZS4gVXBkYXRlIHRoZSB0b3RhbCBtYXNzIG9mIHRoZSBub2RlIGFuZCBjZW50ZXItb2YtbWFzcy5cbiAgICAgICAgbGV0IHggPSBib2R5LnBvcy54O1xuICAgICAgICBsZXQgeSA9IGJvZHkucG9zLnk7XG4gICAgICAgIG5vZGUubWFzcyA9IG5vZGUubWFzcyArIGJvZHkubWFzcztcbiAgICAgICAgbm9kZS5tYXNzWCA9IG5vZGUubWFzc1ggKyBib2R5Lm1hc3MgKiB4O1xuICAgICAgICBub2RlLm1hc3NZID0gbm9kZS5tYXNzWSArIGJvZHkubWFzcyAqIHk7XG5cbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgaW5zZXJ0IHRoZSBib2R5IGluIHRoZSBhcHByb3ByaWF0ZSBxdWFkcmFudC5cbiAgICAgICAgLy8gQnV0IGZpcnN0IGZpbmQgdGhlIGFwcHJvcHJpYXRlIHF1YWRyYW50LlxuICAgICAgICBsZXQgcXVhZElkeCA9IDAsIC8vIEFzc3VtZSB3ZSBhcmUgaW4gdGhlIDAncyBxdWFkLlxuICAgICAgICAgIGxlZnQgPSBub2RlLmxlZnQsXG4gICAgICAgICAgcmlnaHQgPSAobm9kZS5yaWdodCArIGxlZnQpIC8gMixcbiAgICAgICAgICB0b3AgPSBub2RlLnRvcCxcbiAgICAgICAgICBib3R0b20gPSAobm9kZS5ib3R0b20gKyB0b3ApIC8gMjtcblxuICAgICAgICBpZiAoeCA+IHJpZ2h0KSB7IC8vIHNvbWV3aGVyZSBpbiB0aGUgZWFzdGVybiBwYXJ0LlxuICAgICAgICAgIHF1YWRJZHggPSBxdWFkSWR4ICsgMTtcbiAgICAgICAgICBsZWZ0ID0gcmlnaHQ7XG4gICAgICAgICAgcmlnaHQgPSBub2RlLnJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh5ID4gYm90dG9tKSB7IC8vIGFuZCBpbiBzb3V0aC5cbiAgICAgICAgICBxdWFkSWR4ID0gcXVhZElkeCArIDI7XG4gICAgICAgICAgdG9wID0gYm90dG9tO1xuICAgICAgICAgIGJvdHRvbSA9IG5vZGUuYm90dG9tO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNoaWxkID0gZ2V0Q2hpbGQobm9kZSwgcXVhZElkeCk7XG4gICAgICAgIGlmICghY2hpbGQpIHtcbiAgICAgICAgICAvLyBUaGUgbm9kZSBpcyBpbnRlcm5hbCBidXQgdGhpcyBxdWFkcmFudCBpcyBub3QgdGFrZW4uIEFkZFxuICAgICAgICAgIC8vIHN1Ym5vZGUgdG8gaXQuXG4gICAgICAgICAgY2hpbGQgPSBuZXdOb2RlKCk7XG4gICAgICAgICAgY2hpbGQubGVmdCA9IGxlZnQ7XG4gICAgICAgICAgY2hpbGQudG9wID0gdG9wO1xuICAgICAgICAgIGNoaWxkLnJpZ2h0ID0gcmlnaHQ7XG4gICAgICAgICAgY2hpbGQuYm90dG9tID0gYm90dG9tO1xuICAgICAgICAgIGNoaWxkLmJvZHkgPSBib2R5O1xuXG4gICAgICAgICAgc2V0Q2hpbGQobm9kZSwgcXVhZElkeCwgY2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGNvbnRpbnVlIHNlYXJjaGluZyBpbiB0aGlzIHF1YWRyYW50LlxuICAgICAgICAgIGluc2VydFN0YWNrLnB1c2goY2hpbGQsIGJvZHkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBhcmUgdHJ5aW5nIHRvIGFkZCB0byB0aGUgbGVhZiBub2RlLlxuICAgICAgICAvLyBXZSBoYXZlIHRvIGNvbnZlcnQgY3VycmVudCBsZWFmIGludG8gaW50ZXJuYWwgbm9kZVxuICAgICAgICAvLyBhbmQgY29udGludWUgYWRkaW5nIHR3byBub2Rlcy5cbiAgICAgICAgbGV0IG9sZEJvZHkgPSBub2RlLmJvZHk7XG4gICAgICAgIG5vZGUuYm9keSA9IG51bGw7IC8vIGludGVybmFsIG5vZGVzIGRvIG5vdCBjYXJ5IGJvZGllc1xuXG4gICAgICAgIGlmIChpc1NhbWVQb3NpdGlvbihvbGRCb2R5LnBvcywgYm9keS5wb3MpKSB7XG4gICAgICAgICAgLy8gUHJldmVudCBpbmZpbml0ZSBzdWJkaXZpc2lvbiBieSBidW1waW5nIG9uZSBub2RlXG4gICAgICAgICAgLy8gYW55d2hlcmUgaW4gdGhpcyBxdWFkcmFudFxuICAgICAgICAgIGxldCByZXRyaWVzQ291bnQgPSAzO1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICAgICAgbGV0IGR4ID0gKG5vZGUucmlnaHQgLSBub2RlLmxlZnQpICogb2Zmc2V0O1xuICAgICAgICAgICAgbGV0IGR5ID0gKG5vZGUuYm90dG9tIC0gbm9kZS50b3ApICogb2Zmc2V0O1xuXG4gICAgICAgICAgICBvbGRCb2R5LnBvcy54ID0gbm9kZS5sZWZ0ICsgZHg7XG4gICAgICAgICAgICBvbGRCb2R5LnBvcy55ID0gbm9kZS50b3AgKyBkeTtcbiAgICAgICAgICAgIHJldHJpZXNDb3VudCAtPSAxO1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGRvbid0IGJ1bXAgaXQgb3V0IG9mIHRoZSBib3guIElmIHdlIGRvLCBuZXh0IGl0ZXJhdGlvbiBzaG91bGQgZml4IGl0XG4gICAgICAgICAgfSB3aGlsZSAocmV0cmllc0NvdW50ID4gMCAmJiBpc1NhbWVQb3NpdGlvbihvbGRCb2R5LnBvcywgYm9keS5wb3MpKTtcblxuICAgICAgICAgIGlmIChyZXRyaWVzQ291bnQgPT09IDAgJiYgaXNTYW1lUG9zaXRpb24ob2xkQm9keS5wb3MsIGJvZHkucG9zKSkge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyB2ZXJ5IGJhZCwgd2UgcmFuIG91dCBvZiBwcmVjaXNpb24uXG4gICAgICAgICAgICAvLyBpZiB3ZSBkbyBub3QgcmV0dXJuIGZyb20gdGhlIG1ldGhvZCB3ZSdsbCBnZXQgaW50b1xuICAgICAgICAgICAgLy8gaW5maW5pdGUgbG9vcCBoZXJlLiBTbyB3ZSBzYWNyaWZpY2UgY29ycmVjdG5lc3Mgb2YgbGF5b3V0LCBhbmQga2VlcCB0aGUgYXBwIHJ1bm5pbmdcbiAgICAgICAgICAgIC8vIE5leHQgbGF5b3V0IGl0ZXJhdGlvbiBzaG91bGQgZ2V0IGxhcmdlciBib3VuZGluZyBib3ggaW4gdGhlIGZpcnN0IHN0ZXAgYW5kIGZpeCB0aGlzXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE5leHQgaXRlcmF0aW9uIHNob3VsZCBzdWJkaXZpZGUgbm9kZSBmdXJ0aGVyLlxuICAgICAgICBpbnNlcnRTdGFjay5wdXNoKG5vZGUsIG9sZEJvZHkpO1xuICAgICAgICBpbnNlcnRTdGFjay5wdXNoKG5vZGUsIGJvZHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5zZXJ0Qm9kaWVzOiBpbnNlcnRCb2RpZXMsXG4gICAgdXBkYXRlQm9keUZvcmNlOiB1cGRhdGVcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hpbGQobm9kZSwgaWR4KSB7XG4gIGlmIChpZHggPT09IDApIHJldHVybiBub2RlLnF1YWQwO1xuICBpZiAoaWR4ID09PSAxKSByZXR1cm4gbm9kZS5xdWFkMTtcbiAgaWYgKGlkeCA9PT0gMikgcmV0dXJuIG5vZGUucXVhZDI7XG4gIGlmIChpZHggPT09IDMpIHJldHVybiBub2RlLnF1YWQzO1xuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gc2V0Q2hpbGQobm9kZSwgaWR4LCBjaGlsZCkge1xuICBpZiAoaWR4ID09PSAwKSBub2RlLnF1YWQwID0gY2hpbGQ7XG4gIGVsc2UgaWYgKGlkeCA9PT0gMSkgbm9kZS5xdWFkMSA9IGNoaWxkO1xuICBlbHNlIGlmIChpZHggPT09IDIpIG5vZGUucXVhZDIgPSBjaGlsZDtcbiAgZWxzZSBpZiAoaWR4ID09PSAzKSBub2RlLnF1YWQzID0gY2hpbGQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBtYWtlUXVhZHRyZWUgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldWxlci9xdWFkdHJlZS9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gSW5zZXJ0U3RhY2s7XG5cbi8qKlxuICogT3VyIGltcGxtZW50YXRpb24gb2YgUXVhZFRyZWUgaXMgbm9uLXJlY3Vyc2l2ZSB0byBhdm9pZCBHQyBoaXRcbiAqIFRoaXMgZGF0YSBzdHJ1Y3R1cmUgcmVwcmVzZW50IHN0YWNrIG9mIGVsZW1lbnRzXG4gKiB3aGljaCB3ZSBhcmUgdHJ5aW5nIHRvIGluc2VydCBpbnRvIHF1YWQgdHJlZS5cbiAqL1xuZnVuY3Rpb24gSW5zZXJ0U3RhY2sgKCkge1xuICAgIHRoaXMuc3RhY2sgPSBbXTtcbiAgICB0aGlzLnBvcElkeCA9IDA7XG59XG5cbkluc2VydFN0YWNrLnByb3RvdHlwZSA9IHtcbiAgICBpc0VtcHR5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wSWR4ID09PSAwO1xuICAgIH0sXG4gICAgcHVzaDogZnVuY3Rpb24gKG5vZGUsIGJvZHkpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnN0YWNrW3RoaXMucG9wSWR4XTtcbiAgICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgICAgICAvLyB3ZSBhcmUgdHJ5aW5nIHRvIGF2b2lkIG1lbW9yeSBwcmVzc3VlOiBjcmVhdGUgbmV3IGVsZW1lbnRcbiAgICAgICAgICAgIC8vIG9ubHkgd2hlbiBhYnNvbHV0ZWx5IG5lY2Vzc2FyeVxuICAgICAgICAgICAgdGhpcy5zdGFja1t0aGlzLnBvcElkeF0gPSBuZXcgSW5zZXJ0U3RhY2tFbGVtZW50KG5vZGUsIGJvZHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5ub2RlID0gbm9kZTtcbiAgICAgICAgICAgIGl0ZW0uYm9keSA9IGJvZHk7XG4gICAgICAgIH1cbiAgICAgICAgKyt0aGlzLnBvcElkeDtcbiAgICB9LFxuICAgIHBvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5wb3BJZHggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGFja1stLXRoaXMucG9wSWR4XTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wb3BJZHggPSAwO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIEluc2VydFN0YWNrRWxlbWVudChub2RlLCBib2R5KSB7XG4gICAgdGhpcy5ub2RlID0gbm9kZTsgLy8gUXVhZFRyZWUgbm9kZVxuICAgIHRoaXMuYm9keSA9IGJvZHk7IC8vIHBoeXNpY2FsIGJvZHkgd2hpY2ggbmVlZHMgdG8gYmUgaW5zZXJ0ZWQgdG8gbm9kZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V1bGVyL3F1YWR0cmVlL2luc2VydFN0YWNrLmpzIiwiLyoqXG4gKiBJbnRlcm5hbCBkYXRhIHN0cnVjdHVyZSB0byByZXByZXNlbnQgMkQgUXVhZFRyZWUgbm9kZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIE5vZGUoKSB7XG4gIC8vIGJvZHkgc3RvcmVkIGluc2lkZSB0aGlzIG5vZGUuIEluIHF1YWQgdHJlZSBvbmx5IGxlYWYgbm9kZXMgKGJ5IGNvbnN0cnVjdGlvbilcbiAgLy8gY29udGFpbiBib2lkZXM6XG4gIHRoaXMuYm9keSA9IG51bGw7XG5cbiAgLy8gQ2hpbGQgbm9kZXMgYXJlIHN0b3JlZCBpbiBxdWFkcy4gRWFjaCBxdWFkIGlzIHByZXNlbnRlZCBieSBudW1iZXI6XG4gIC8vIDAgfCAxXG4gIC8vIC0tLS0tXG4gIC8vIDIgfCAzXG4gIHRoaXMucXVhZDAgPSBudWxsO1xuICB0aGlzLnF1YWQxID0gbnVsbDtcbiAgdGhpcy5xdWFkMiA9IG51bGw7XG4gIHRoaXMucXVhZDMgPSBudWxsO1xuXG4gIC8vIFRvdGFsIG1hc3Mgb2YgY3VycmVudCBub2RlXG4gIHRoaXMubWFzcyA9IDA7XG5cbiAgLy8gQ2VudGVyIG9mIG1hc3MgY29vcmRpbmF0ZXNcbiAgdGhpcy5tYXNzWCA9IDA7XG4gIHRoaXMubWFzc1kgPSAwO1xuXG4gIC8vIGJvdW5kaW5nIGJveCBjb29yZGluYXRlc1xuICB0aGlzLmxlZnQgPSAwO1xuICB0aGlzLnRvcCA9IDA7XG4gIHRoaXMuYm90dG9tID0gMDtcbiAgdGhpcy5yaWdodCA9IDA7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V1bGVyL3F1YWR0cmVlL25vZGUuanMiLCJjb25zdCB7IGludGVncmF0ZSB9ID0gcmVxdWlyZSgnLi9pbnRlZ3JhdGUnKTtcbmNvbnN0IHsgYXBwbHlEcmFnIH0gPSByZXF1aXJlKCcuL2RyYWcnKTtcbmNvbnN0IHsgYXBwbHlTcHJpbmcgfSA9IHJlcXVpcmUoJy4vc3ByaW5nJyk7XG5cbmZ1bmN0aW9uIHRpY2soeyBib2RpZXMsIHNwcmluZ3MsIHF1YWR0cmVlLCB0aW1lU3RlcCwgZ3Jhdml0eSwgdGhldGEsIGRyYWdDb2VmZiB9KXtcbiAgLy8gdXBkYXRlIGJvZHkgZnJvbSBzY3JhdGNoIGluIGNhc2Ugb2YgYW55IGNoYW5nZXNcbiAgYm9kaWVzLmZvckVhY2goIGJvZHkgPT4ge1xuICAgIGxldCBwID0gYm9keS5fc2NyYXRjaDtcblxuICAgIGlmKCAhcCApeyByZXR1cm47IH1cblxuICAgIGlmKCBwLmdyYWJiZWQgKXtcbiAgICAgIGNvbnNvbGUubG9nKCAnZ3JhYmJlZCcgKTtcbiAgICB9XG5cbiAgICBib2R5LmxvY2tlZCA9IHAubG9ja2VkO1xuICAgIGJvZHkuZ3JhYmJlZCA9IHAuZ3JhYmJlZDtcbiAgICBib2R5LnBvcy54ID0gcC54O1xuICAgIGJvZHkucG9zLnkgPSBwLnk7XG4gIH0gKTtcblxuICBxdWFkdHJlZS5pbnNlcnRCb2RpZXMoIGJvZGllcyApO1xuXG4gIGZvciggbGV0IGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrICl7XG4gICAgbGV0IGJvZHkgPSBib2RpZXNbaV07XG5cbiAgICBxdWFkdHJlZS51cGRhdGVCb2R5Rm9yY2UoIGJvZHksIGdyYXZpdHksIHRoZXRhICk7XG4gICAgYXBwbHlEcmFnKCBib2R5LCBkcmFnQ29lZmYgKTtcbiAgfVxuXG4gIGZvciggbGV0IGkgPSAwOyBpIDwgc3ByaW5ncy5sZW5ndGg7IGkrKyApe1xuICAgIGxldCBzcHJpbmcgPSBzcHJpbmdzW2ldO1xuXG4gICAgYXBwbHlTcHJpbmcoIHNwcmluZyApO1xuICB9XG5cbiAgbGV0IG1vdmVtZW50ID0gaW50ZWdyYXRlKCBib2RpZXMsIHRpbWVTdGVwICk7XG5cbiAgLy8gdXBkYXRlIHNjcmF0Y2ggcG9zaXRpb25zIGZyb20gYm9keSBwb3NpdGlvbnNcbiAgYm9kaWVzLmZvckVhY2goIGJvZHkgPT4ge1xuICAgIGxldCBwID0gYm9keS5fc2NyYXRjaDtcblxuICAgIGlmKCAhcCApeyByZXR1cm47IH1cblxuICAgIHAueCA9IGJvZHkucG9zLng7XG4gICAgcC55ID0gYm9keS5wb3MueTtcbiAgfSApO1xuXG4gIHJldHVybiBtb3ZlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IHRpY2sgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldWxlci90aWNrLmpzIiwiY29uc3QgRXVsZXIgPSByZXF1aXJlKCcuL2V1bGVyJyk7XG5cbi8vIHJlZ2lzdGVycyB0aGUgZXh0ZW5zaW9uIG9uIGEgY3l0b3NjYXBlIGxpYiByZWZcbmxldCByZWdpc3RlciA9IGZ1bmN0aW9uKCBjeXRvc2NhcGUgKXtcbiAgaWYoICFjeXRvc2NhcGUgKXsgcmV0dXJuOyB9IC8vIGNhbid0IHJlZ2lzdGVyIGlmIGN5dG9zY2FwZSB1bnNwZWNpZmllZFxuXG4gIGN5dG9zY2FwZSggJ2xheW91dCcsICdldWxlcicsIEV1bGVyICk7IC8vIHJlZ2lzdGVyIHdpdGggY3l0b3NjYXBlLmpzXG59O1xuXG5pZiggdHlwZW9mIGN5dG9zY2FwZSAhPT0gJ3VuZGVmaW5lZCcgKXsgLy8gZXhwb3NlIHRvIGdsb2JhbCBjeXRvc2NhcGUgKGkuZS4gd2luZG93LmN5dG9zY2FwZSlcbiAgcmVnaXN0ZXIoIGN5dG9zY2FwZSApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiLy8gZ2VuZXJhbCBkZWZhdWx0IG9wdGlvbnMgZm9yIGZvcmNlLWRpcmVjdGVkIGxheW91dFxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICBhbmltYXRlOiB0cnVlLCAvLyB3aGV0aGVyIHRvIHNob3cgdGhlIGxheW91dCBhcyBpdCdzIHJ1bm5pbmc7IHNwZWNpYWwgJ2VuZCcgdmFsdWUgbWFrZXMgdGhlIGxheW91dCBhbmltYXRlIGxpa2UgYSBkaXNjcmV0ZSBsYXlvdXRcbiAgcmVmcmVzaDogMTAsIC8vIG51bWJlciBvZiB0aWNrcyBwZXIgZnJhbWU7IGhpZ2hlciBpcyBmYXN0ZXIgYnV0IG1vcmUgamVya3lcbiAgbWF4SXRlcmF0aW9uczogMTAwMCwgLy8gbWF4IGl0ZXJhdGlvbnMgYmVmb3JlIHRoZSBsYXlvdXQgd2lsbCBiYWlsIG91dFxuICBtYXhTaW11bGF0aW9uVGltZTogNDAwMCwgLy8gbWF4IGxlbmd0aCBpbiBtcyB0byBydW4gdGhlIGxheW91dFxuICB1bmdyYWJpZnlXaGlsZVNpbXVsYXRpbmc6IGZhbHNlLCAvLyBzbyB5b3UgY2FuJ3QgZHJhZyBub2RlcyBkdXJpbmcgbGF5b3V0XG4gIGZpdDogdHJ1ZSwgLy8gb24gZXZlcnkgbGF5b3V0IHJlcG9zaXRpb24gb2Ygbm9kZXMsIGZpdCB0aGUgdmlld3BvcnRcbiAgcGFkZGluZzogMzAsIC8vIHBhZGRpbmcgYXJvdW5kIHRoZSBzaW11bGF0aW9uXG4gIGJvdW5kaW5nQm94OiB1bmRlZmluZWQsIC8vIGNvbnN0cmFpbiBsYXlvdXQgYm91bmRzOyB7IHgxLCB5MSwgeDIsIHkyIH0gb3IgeyB4MSwgeTEsIHcsIGggfVxuXG4gIC8vIGxheW91dCBldmVudCBjYWxsYmFja3NcbiAgcmVhZHk6IGZ1bmN0aW9uKCl7fSwgLy8gb24gbGF5b3V0cmVhZHlcbiAgc3RvcDogZnVuY3Rpb24oKXt9LCAvLyBvbiBsYXlvdXRzdG9wXG5cbiAgLy8gcG9zaXRpb25pbmcgb3B0aW9uc1xuICByYW5kb21pemU6IGZhbHNlLCAvLyB1c2UgcmFuZG9tIG5vZGUgcG9zaXRpb25zIGF0IGJlZ2lubmluZyBvZiBsYXlvdXRcbiAgXG4gIC8vIGluZmluaXRlIGxheW91dCBvcHRpb25zXG4gIGluZmluaXRlOiBmYWxzZSAvLyBvdmVycmlkZXMgYWxsIG90aGVyIG9wdGlvbnMgZm9yIGEgZm9yY2VzLWFsbC10aGUtdGltZSBtb2RlXG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXlvdXQvZGVmYXVsdHMuanMiLCIvKipcbkEgZ2VuZXJpYyBjb250aW51b3VzIGxheW91dCBjbGFzc1xuKi9cblxuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi4vYXNzaWduJyk7XG5jb25zdCBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcbmNvbnN0IG1ha2VCb3VuZGluZ0JveCA9IHJlcXVpcmUoJy4vbWFrZS1iYicpO1xuY29uc3QgeyBzZXRJbml0aWFsUG9zaXRpb25TdGF0ZSwgcmVmcmVzaFBvc2l0aW9ucywgZ2V0Tm9kZVBvc2l0aW9uRGF0YSB9ID0gcmVxdWlyZSgnLi9wb3NpdGlvbicpO1xuY29uc3QgeyBtdWx0aXRpY2sgfSA9IHJlcXVpcmUoJy4vdGljaycpO1xuXG5jbGFzcyBMYXlvdXQge1xuICBjb25zdHJ1Y3Rvciggb3B0aW9ucyApe1xuICAgIGxldCBvID0gdGhpcy5vcHRpb25zID0gYXNzaWduKCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMgKTtcblxuICAgIGxldCBzID0gdGhpcy5zdGF0ZSA9IGFzc2lnbigge30sIG8sIHtcbiAgICAgIGxheW91dDogdGhpcyxcbiAgICAgIG5vZGVzOiBvLmVsZXMubm9kZXMoKSxcbiAgICAgIGVkZ2VzOiBvLmVsZXMuZWRnZXMoKSxcbiAgICAgIHRpY2tJbmRleDogMCxcbiAgICAgIGZpcnN0VXBkYXRlOiB0cnVlXG4gICAgfSApO1xuXG4gICAgcy5hbmltYXRlRW5kID0gby5hbmltYXRlICYmIG8uYW5pbWF0ZSA9PT0gJ2VuZCc7XG4gICAgcy5hbmltYXRlQ29udGludW91c2x5ID0gby5hbmltYXRlICYmICFzLmFuaW1hdGVFbmQ7XG4gIH1cblxuICBydW4oKXtcbiAgICBsZXQgbCA9IHRoaXM7XG4gICAgbGV0IHMgPSB0aGlzLnN0YXRlO1xuXG4gICAgcy50aWNrSW5kZXggPSAwO1xuICAgIHMuZmlyc3RVcGRhdGUgPSB0cnVlO1xuXG4gICAgcy5ydW5uaW5nID0gdHJ1ZTtcblxuICAgIHMuY3VycmVudEJvdW5kaW5nQm94ID0gbWFrZUJvdW5kaW5nQm94KCBzLmJvdW5kaW5nQm94LCBzLmN5ICk7XG5cbiAgICBpZiggcy5yZWFkeSApeyBsLm9uZSggJ3JlYWR5Jywgcy5yZWFkeSApOyB9XG4gICAgaWYoIHMuc3RvcCApeyBsLm9uZSggJ3N0b3AnLCBzLnN0b3AgKTsgfVxuXG4gICAgcy5ub2Rlcy5mb3JFYWNoKCBuID0+IHNldEluaXRpYWxQb3NpdGlvblN0YXRlKCBuLCBzICkgKTtcblxuICAgIGwucHJlcnVuKCBzICk7XG5cbiAgICBpZiggcy5hbmltYXRlQ29udGludW91c2x5ICl7XG4gICAgICBsZXQgdW5ncmFiaWZ5ID0gbm9kZSA9PiB7XG4gICAgICAgIGlmKCAhcy51bmdyYWJpZnlXaGlsZVNpbXVsYXRpbmcgKXsgcmV0dXJuOyB9XG5cbiAgICAgICAgbGV0IGdyYWJiYWJsZSA9IGdldE5vZGVQb3NpdGlvbkRhdGEoIG5vZGUsIHMgKS5ncmFiYmFibGUgPSBub2RlLmdyYWJiYWJsZSgpO1xuXG4gICAgICAgIGlmKCBncmFiYmFibGUgKXtcbiAgICAgICAgICBub2RlLnVuZ3JhYmlmeSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBsZXQgcmVncmFiaWZ5ID0gbm9kZSA9PiB7XG4gICAgICAgIGlmKCAhcy51bmdyYWJpZnlXaGlsZVNpbXVsYXRpbmcgKXsgcmV0dXJuOyB9XG5cbiAgICAgICAgbGV0IGdyYWJiYWJsZSA9IGdldE5vZGVQb3NpdGlvbkRhdGEoIG5vZGUsIHMgKS5ncmFiYmFibGU7XG5cbiAgICAgICAgaWYoIGdyYWJiYWJsZSApe1xuICAgICAgICAgIG5vZGUuZ3JhYmlmeSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBsZXQgdXBkYXRlR3JhYlN0YXRlID0gbm9kZSA9PiBnZXROb2RlUG9zaXRpb25EYXRhKCBub2RlLCBzICkuZ3JhYmJlZCA9IG5vZGUuZ3JhYmJlZCgpO1xuXG4gICAgICBsZXQgb25HcmFiID0gZnVuY3Rpb24oeyB0YXJnZXQgfSl7XG4gICAgICAgIHVwZGF0ZUdyYWJTdGF0ZSggdGFyZ2V0ICk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgb25GcmVlID0gb25HcmFiO1xuXG4gICAgICBsZXQgb25EcmFnID0gZnVuY3Rpb24oeyB0YXJnZXQgfSl7XG4gICAgICAgIGxldCBwID0gZ2V0Tm9kZVBvc2l0aW9uRGF0YSggdGFyZ2V0LCBzICk7XG4gICAgICAgIGxldCB0cCA9IHRhcmdldC5wb3NpdGlvbigpO1xuXG4gICAgICAgIHAueCA9IHRwLng7XG4gICAgICAgIHAueSA9IHRwLnk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgbGlzdGVuVG9HcmFiID0gbm9kZSA9PiB7XG4gICAgICAgIG5vZGUub24oJ2dyYWInLCBvbkdyYWIpO1xuICAgICAgICBub2RlLm9uKCdmcmVlJywgb25GcmVlKTtcbiAgICAgICAgbm9kZS5vbignZHJhZycsIG9uRHJhZyk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgdW5saXN0ZW5Ub0dyYWIgPSBub2RlID0+IHtcbiAgICAgICAgbm9kZS5yZW1vdmVMaXN0ZW5lcignZ3JhYicsIG9uR3JhYik7XG4gICAgICAgIG5vZGUucmVtb3ZlTGlzdGVuZXIoJ2ZyZWUnLCBvbkZyZWUpO1xuICAgICAgICBub2RlLnJlbW92ZUxpc3RlbmVyKCdkcmFnJywgb25EcmFnKTtcbiAgICAgIH07XG5cbiAgICAgIGxldCBmaXQgPSAoKSA9PiB7XG4gICAgICAgIGlmKCBzLmZpdCAmJiBzLmFuaW1hdGVDb250aW51b3VzbHkgKXtcbiAgICAgICAgICBzLmN5LmZpdCggcy5wYWRkaW5nICk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGxldCBvbk5vdERvbmUgPSAoKSA9PiB7XG4gICAgICAgIHJlZnJlc2hQb3NpdGlvbnMoIHMubm9kZXMsIHMgKTtcbiAgICAgICAgZml0KCk7XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmcmFtZSApO1xuICAgICAgfTtcblxuICAgICAgbGV0IGZyYW1lID0gZnVuY3Rpb24oKXtcbiAgICAgICAgbXVsdGl0aWNrKCBzLCBvbk5vdERvbmUsIG9uRG9uZSApO1xuICAgICAgfTtcblxuICAgICAgbGV0IG9uRG9uZSA9ICgpID0+IHtcbiAgICAgICAgcmVmcmVzaFBvc2l0aW9ucyggcy5ub2RlcywgcyApO1xuICAgICAgICBmaXQoKTtcblxuICAgICAgICBzLm5vZGVzLmZvckVhY2goIG4gPT4ge1xuICAgICAgICAgIHJlZ3JhYmlmeSggbiApO1xuICAgICAgICAgIHVubGlzdGVuVG9HcmFiKCBuICk7XG4gICAgICAgIH0gKTtcblxuICAgICAgICBzLnJ1bm5pbmcgPSBmYWxzZTtcblxuICAgICAgICBsLmVtaXQoJ2xheW91dHN0b3AnKTtcbiAgICAgIH07XG5cbiAgICAgIHMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcblxuICAgICAgbC5lbWl0KCdsYXlvdXRzdGFydCcpO1xuXG4gICAgICBzLm5vZGVzLmZvckVhY2goIG4gPT4ge1xuICAgICAgICB1bmdyYWJpZnkoIG4gKTtcbiAgICAgICAgbGlzdGVuVG9HcmFiKCBuICk7XG4gICAgICB9ICk7XG5cbiAgICAgIGZyYW1lKCk7IC8vIGtpY2sgb2ZmXG4gICAgfSBlbHNlIHtcbiAgICAgIG11bHRpdGljayggcyApO1xuXG4gICAgICBzLmVsZXMubGF5b3V0UG9zaXRpb25zKCB0aGlzLCBzLCBub2RlID0+IGdldE5vZGVQb3NpdGlvbkRhdGEoIG5vZGUsIHMgKSApO1xuICAgIH1cblxuICAgIGwucG9zdHJ1biggcyApO1xuXG4gICAgcmV0dXJuIHRoaXM7IC8vIGNoYWluaW5nXG4gIH1cblxuICBwcmVydW4oKXt9XG4gIHBvc3RydW4oKXt9XG4gIHRpY2soKXt9XG5cbiAgc3RvcCgpe1xuICAgIHRoaXMuc3RhdGUucnVubmluZyA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIHRoaXM7IC8vIGNoYWluaW5nXG4gIH1cblxuICBkZXN0cm95KCl7XG4gICAgcmV0dXJuIHRoaXM7IC8vIGNoYWluaW5nXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMYXlvdXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGF5b3V0L2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiggYmIsIGN5ICl7XG4gIGlmKCBiYiA9PSBudWxsICl7XG4gICAgYmIgPSB7IHgxOiAwLCB5MTogMCwgdzogY3kud2lkdGgoKSwgaDogY3kuaGVpZ2h0KCkgfTtcbiAgfSBlbHNlIHsgLy8gY29weVxuICAgIGJiID0geyB4MTogYmIueDEsIHgyOiBiYi54MiwgeTE6IGJiLnkxLCB5MjogYmIueTIsIHc6IGJiLncsIGg6IGJiLmggfTtcbiAgfVxuXG4gIGlmKCBiYi54MiA9PSBudWxsICl7IGJiLngyID0gYmIueDEgKyBiYi53OyB9XG4gIGlmKCBiYi53ID09IG51bGwgKXsgYmIudyA9IGJiLngyIC0gYmIueDE7IH1cbiAgaWYoIGJiLnkyID09IG51bGwgKXsgYmIueTIgPSBiYi55MSArIGJiLmg7IH1cbiAgaWYoIGJiLmggPT0gbnVsbCApeyBiYi5oID0gYmIueTIgLSBiYi55MTsgfVxuXG4gIHJldHVybiBiYjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGF5b3V0L21ha2UtYmIuanMiLCJjb25zdCBhc3NpZ24gPSByZXF1aXJlKCcuLi9hc3NpZ24nKTtcblxubGV0IHNldEluaXRpYWxQb3NpdGlvblN0YXRlID0gZnVuY3Rpb24oIG5vZGUsIHN0YXRlICl7XG4gIGxldCBwID0gbm9kZS5wb3NpdGlvbigpO1xuICBsZXQgYmIgPSBzdGF0ZS5jdXJyZW50Qm91bmRpbmdCb3g7XG4gIGxldCBzY3JhdGNoID0gbm9kZS5zY3JhdGNoKCBzdGF0ZS5uYW1lICk7XG5cbiAgaWYoIHNjcmF0Y2ggPT0gbnVsbCApe1xuICAgIHNjcmF0Y2ggPSB7fTtcblxuICAgIG5vZGUuc2NyYXRjaCggc3RhdGUubmFtZSwgc2NyYXRjaCApO1xuICB9XG5cbiAgYXNzaWduKCBzY3JhdGNoLCBzdGF0ZS5yYW5kb21pemUgPyB7XG4gICAgeDogYmIueDEgKyBNYXRoLnJvdW5kKCBNYXRoLnJhbmRvbSgpICogYmIudyApLFxuICAgIHk6IGJiLnkxICsgTWF0aC5yb3VuZCggTWF0aC5yYW5kb20oKSAqIGJiLmggKVxuICB9IDoge1xuICAgIHg6IHAueCxcbiAgICB5OiBwLnlcbiAgfSApO1xuXG4gIHNjcmF0Y2gubG9ja2VkID0gbm9kZS5sb2NrZWQoKTtcbn07XG5cbmxldCBnZXROb2RlUG9zaXRpb25EYXRhID0gZnVuY3Rpb24oIG5vZGUsIHN0YXRlICl7XG4gIHJldHVybiBub2RlLnNjcmF0Y2goIHN0YXRlLm5hbWUgKTtcbn07XG5cbmxldCByZWZyZXNoUG9zaXRpb25zID0gZnVuY3Rpb24oIG5vZGVzLCBzdGF0ZSApe1xuICBub2Rlcy5wb3NpdGlvbnMoZnVuY3Rpb24oIG5vZGUgKXtcbiAgICBsZXQgc2NyYXRjaCA9IG5vZGUuc2NyYXRjaCggc3RhdGUubmFtZSApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHNjcmF0Y2gueCxcbiAgICAgIHk6IHNjcmF0Y2gueVxuICAgIH07XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHNldEluaXRpYWxQb3NpdGlvblN0YXRlLCBnZXROb2RlUG9zaXRpb25EYXRhLCByZWZyZXNoUG9zaXRpb25zIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGF5b3V0L3Bvc2l0aW9uLmpzIiwiY29uc3Qgbm9wID0gZnVuY3Rpb24oKXt9O1xuXG5sZXQgdGljayA9IGZ1bmN0aW9uKCBzdGF0ZSApe1xuICBsZXQgcyA9IHN0YXRlO1xuICBsZXQgbCA9IHN0YXRlLmxheW91dDtcblxuICBsZXQgdGlja0luZGljYXRlc0RvbmUgPSBsLnRpY2soIHMgKTtcblxuICBpZiggcy5maXJzdFVwZGF0ZSApe1xuICAgIGlmKCBzLmFuaW1hdGVDb250aW51b3VzbHkgKXsgLy8gaW5kaWNhdGUgdGhlIGluaXRpYWwgcG9zaXRpb25zIGhhdmUgYmVlbiBzZXRcbiAgICAgIHMubGF5b3V0LmVtaXQoJ2xheW91dHJlYWR5Jyk7XG4gICAgfVxuICAgIHMuZmlyc3RVcGRhdGUgPSBmYWxzZTtcbiAgfVxuXG4gIHMudGlja0luZGV4Kys7XG5cbiAgbGV0IGR1cmF0aW9uID0gcy5zdGFydFRpbWUgLSBEYXRlLm5vdygpO1xuXG4gIHJldHVybiAhcy5pbmZpbml0ZSAmJiAoIHRpY2tJbmRpY2F0ZXNEb25lIHx8IHMudGlja0luZGV4ID49IHMubWF4SXRlcmF0aW9ucyB8fCBkdXJhdGlvbiA+PSBzLm1heFNpbXVsYXRpb25UaW1lICk7XG59O1xuXG5sZXQgbXVsdGl0aWNrID0gZnVuY3Rpb24oIHN0YXRlLCBvbk5vdERvbmUgPSBub3AsIG9uRG9uZSA9IG5vcCApe1xuICBsZXQgZG9uZSA9IGZhbHNlO1xuICBsZXQgcyA9IHN0YXRlO1xuXG4gIGZvciggbGV0IGkgPSAwOyBpIDwgcy5tYXhJdGVyYXRpb25zOyBpKysgKXtcbiAgICBkb25lID0gIXMucnVubmluZyB8fCB0aWNrKCBzICk7XG5cbiAgICBpZiggZG9uZSApeyBicmVhazsgfVxuICB9XG5cbiAgaWYoICFkb25lICl7XG4gICAgb25Ob3REb25lKCk7XG4gIH0gZWxzZSB7XG4gICAgb25Eb25lKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyB0aWNrLCBtdWx0aXRpY2sgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXlvdXQvdGljay5qcyJdLCJzb3VyY2VSb290IjoiIn0=