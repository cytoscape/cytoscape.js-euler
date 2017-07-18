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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0NGJjOGVjMzI1ZWIwZGM4Njg5MyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9zcHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V1bGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9ib2R5LmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXVsZXIvZHJhZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXVsZXIvaW50ZWdyYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9xdWFkdHJlZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXVsZXIvcXVhZHRyZWUvaW5zZXJ0U3RhY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V1bGVyL3F1YWR0cmVlL25vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V1bGVyL3RpY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9sYXlvdXQvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L21ha2UtYmIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9wb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L3RpY2suanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIk9iamVjdCIsImFzc2lnbiIsImJpbmQiLCJ0Z3QiLCJzcmNzIiwiZm9yRWFjaCIsImtleXMiLCJzcmMiLCJrIiwicmVxdWlyZSIsImRlZmF1bHRzIiwiZnJlZXplIiwic291cmNlIiwidGFyZ2V0IiwibGVuZ3RoIiwiY29lZmYiLCJ3ZWlnaHQiLCJtYWtlU3ByaW5nIiwic3ByaW5nIiwiYXBwbHlTcHJpbmciLCJib2R5MSIsImJvZHkyIiwiZHgiLCJwb3MiLCJ4IiwiZHkiLCJ5IiwiciIsIk1hdGgiLCJzcXJ0IiwicmFuZG9tIiwiZCIsInNwcmluZ0NvZWZmIiwiZm9yY2UiLCJMYXlvdXQiLCJ0aWNrIiwibWFrZVF1YWR0cmVlIiwibWFrZUJvZHkiLCJpc0ZuIiwiZm4iLCJpc1BhcmVudCIsIm4iLCJub3RJc1BhcmVudCIsImlzTG9ja2VkIiwibG9ja2VkIiwibm90SXNMb2NrZWQiLCJpc1BhcmVudEVkZ2UiLCJlIiwibm90SXNQYXJlbnRFZGdlIiwiZ2V0Qm9keSIsInNjcmF0Y2giLCJib2R5IiwiZ2V0Tm9uUGFyZW50RGVzY2VuZGFudHMiLCJkZXNjZW5kYW50cyIsImZpbHRlciIsImdldFNjcmF0Y2giLCJlbCIsIm9wdEZuIiwib3B0IiwiZWxlIiwiRXVsZXIiLCJvcHRpb25zIiwic3RhdGUiLCJzIiwicXVhZHRyZWUiLCJib2RpZXMiLCJub2RlcyIsIm1hc3MiLCJfY3lOb2RlIiwiX3NjcmF0Y2giLCJwdXNoIiwic3ByaW5ncyIsImVkZ2VzIiwic3ByaW5nTGVuZ3RoIiwiX2N5RWRnZSIsInNvdXJjZXMiLCJ0YXJnZXRzIiwibW92ZW1lbnQiLCJpc0RvbmUiLCJtb3ZlbWVudFRocmVzaG9sZCIsInByZXZQb3MiLCJ2ZWxvY2l0eSIsImNvcHlWZWMiLCJ2IiwiZ2V0VmFsdWUiLCJ2YWwiLCJkZWYiLCJnZXRWZWMiLCJ2ZWMiLCJvcHRzIiwiYiIsImdyYXZpdHkiLCJ0aGV0YSIsImRyYWdDb2VmZiIsInRpbWVTdGVwIiwiZGVmYXVsdENvZWZmIiwiYXBwbHlEcmFnIiwibWFudWFsRHJhZ0NvZWZmIiwiaW50ZWdyYXRlIiwidHgiLCJ0eSIsImkiLCJtYXgiLCJncmFiYmVkIiwidngiLCJ2eSIsImFicyIsIk5vZGUiLCJJbnNlcnRTdGFjayIsInJlc2V0VmVjIiwiaXNTYW1lUG9zaXRpb24iLCJwMSIsInAyIiwidGhyZXNob2xkIiwidXBkYXRlUXVldWUiLCJpbnNlcnRTdGFjayIsIm5vZGVzQ2FjaGUiLCJjdXJyZW50SW5DYWNoZSIsInJvb3QiLCJuZXdOb2RlIiwibm9kZSIsInF1YWQwIiwicXVhZDEiLCJxdWFkMiIsInF1YWQzIiwibWFzc1giLCJtYXNzWSIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsInVwZGF0ZSIsInNvdXJjZUJvZHkiLCJxdWV1ZSIsImZ4IiwiZnkiLCJxdWV1ZUxlbmd0aCIsInNoaWZ0SWR4IiwicHVzaElkeCIsImRpZmZlcmVudEJvZHkiLCJpbnNlcnRCb2RpZXMiLCJ4MSIsIk51bWJlciIsIk1BWF9WQUxVRSIsInkxIiwieDIiLCJNSU5fVkFMVUUiLCJ5MiIsImluc2VydCIsIm5ld0JvZHkiLCJyZXNldCIsImlzRW1wdHkiLCJzdGFja0l0ZW0iLCJwb3AiLCJxdWFkSWR4IiwiY2hpbGQiLCJnZXRDaGlsZCIsInNldENoaWxkIiwib2xkQm9keSIsInJldHJpZXNDb3VudCIsIm9mZnNldCIsInVwZGF0ZUJvZHlGb3JjZSIsImlkeCIsInN0YWNrIiwicG9wSWR4IiwicHJvdG90eXBlIiwiaXRlbSIsIkluc2VydFN0YWNrRWxlbWVudCIsInAiLCJjb25zb2xlIiwibG9nIiwicmVnaXN0ZXIiLCJjeXRvc2NhcGUiLCJhbmltYXRlIiwicmVmcmVzaCIsIm1heEl0ZXJhdGlvbnMiLCJtYXhTaW11bGF0aW9uVGltZSIsInVuZ3JhYmlmeVdoaWxlU2ltdWxhdGluZyIsImZpdCIsInBhZGRpbmciLCJib3VuZGluZ0JveCIsInVuZGVmaW5lZCIsInJlYWR5Iiwic3RvcCIsInJhbmRvbWl6ZSIsImluZmluaXRlIiwibWFrZUJvdW5kaW5nQm94Iiwic2V0SW5pdGlhbFBvc2l0aW9uU3RhdGUiLCJyZWZyZXNoUG9zaXRpb25zIiwiZ2V0Tm9kZVBvc2l0aW9uRGF0YSIsIm11bHRpdGljayIsIm8iLCJsYXlvdXQiLCJlbGVzIiwidGlja0luZGV4IiwiZmlyc3RVcGRhdGUiLCJhbmltYXRlRW5kIiwiYW5pbWF0ZUNvbnRpbnVvdXNseSIsImwiLCJydW5uaW5nIiwiY3VycmVudEJvdW5kaW5nQm94IiwiY3kiLCJvbmUiLCJwcmVydW4iLCJ1bmdyYWJpZnkiLCJncmFiYmFibGUiLCJyZWdyYWJpZnkiLCJncmFiaWZ5IiwidXBkYXRlR3JhYlN0YXRlIiwib25HcmFiIiwib25GcmVlIiwib25EcmFnIiwidHAiLCJwb3NpdGlvbiIsImxpc3RlblRvR3JhYiIsIm9uIiwidW5saXN0ZW5Ub0dyYWIiLCJyZW1vdmVMaXN0ZW5lciIsIm9uTm90RG9uZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZyYW1lIiwib25Eb25lIiwiZW1pdCIsInN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJsYXlvdXRQb3NpdGlvbnMiLCJwb3N0cnVuIiwiYmIiLCJ3Iiwid2lkdGgiLCJoIiwiaGVpZ2h0IiwibmFtZSIsInJvdW5kIiwicG9zaXRpb25zIiwibm9wIiwidGlja0luZGljYXRlc0RvbmUiLCJkdXJhdGlvbiIsImRvbmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNoRUFBLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU9DLE1BQVAsSUFB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RWlJLE1BQUYsQ0FBUzhCLElBQVQsQ0FBYyxhQUFkO0FBQ0Q7QUFDRC9KLE1BQUVvSSxXQUFGLEdBQWdCLEtBQWhCO0FBQ0Q7O0FBRURwSSxJQUFFbUksU0FBRjs7QUFFQSxNQUFJNEMsV0FBVy9LLEVBQUVnSyxTQUFGLEdBQWNDLEtBQUtDLEdBQUwsRUFBN0I7O0FBRUEsU0FBTyxDQUFDbEssRUFBRTBILFFBQUgsS0FBaUJvRCxxQkFBcUI5SyxFQUFFbUksU0FBRixJQUFlbkksRUFBRWdILGFBQXRDLElBQXVEK0QsWUFBWS9LLEVBQUVpSCxpQkFBdEYsQ0FBUDtBQUNELENBbEJEOztBQW9CQSxJQUFJYyxZQUFZLFNBQVpBLFNBQVksQ0FBVWhJLEtBQVYsRUFBZ0Q7QUFBQSxNQUEvQjRKLFNBQStCLHVFQUFuQmtCLEdBQW1CO0FBQUEsTUFBZGYsTUFBYyx1RUFBTGUsR0FBSzs7QUFDOUQsTUFBSUcsT0FBTyxLQUFYO0FBQ0EsTUFBSWhMLElBQUlELEtBQVI7O0FBRUEsT0FBSyxJQUFJdUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJdEMsRUFBRWdILGFBQXRCLEVBQXFDMUUsR0FBckMsRUFBMEM7QUFDeEMwSSxXQUFPLENBQUNoTCxFQUFFd0ksT0FBSCxJQUFjcEssS0FBTTRCLENBQU4sQ0FBckI7O0FBRUEsUUFBSWdMLElBQUosRUFBVTtBQUFFO0FBQVE7QUFDckI7O0FBRUQsTUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDVHJCO0FBQ0QsR0FGRCxNQUVPO0FBQ0xHO0FBQ0Q7QUFDRixDQWZEOztBQWlCQS9OLE9BQU9DLE9BQVAsR0FBaUIsRUFBRW9DLFVBQUYsRUFBUTJKLG9CQUFSLEVBQWpCLEMiLCJmaWxlIjoiY3l0b3NjYXBlLWV1bGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3l0b3NjYXBlRXVsZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiY3l0b3NjYXBlRXVsZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDRiYzhlYzMyNWViMGRjODY4OTMiLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gIT0gbnVsbCA/IE9iamVjdC5hc3NpZ24uYmluZCggT2JqZWN0ICkgOiBmdW5jdGlvbiggdGd0LCAuLi5zcmNzICl7XG4gIHNyY3MuZm9yRWFjaCggc3JjID0+IHtcbiAgICBPYmplY3Qua2V5cyggc3JjICkuZm9yRWFjaCggayA9PiB0Z3Rba10gPSBzcmNba10gKTtcbiAgfSApO1xuXG4gIHJldHVybiB0Z3Q7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzaWduLmpzIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi4vYXNzaWduJyk7XG5cbmNvbnN0IGRlZmF1bHRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIHNvdXJjZTogbnVsbCxcbiAgdGFyZ2V0OiBudWxsLFxuICBsZW5ndGg6IDgwLFxuICBjb2VmZjogMC4wMDAyLFxuICB3ZWlnaHQ6IDFcbn0pO1xuXG5mdW5jdGlvbiBtYWtlU3ByaW5nKCBzcHJpbmcgKXtcbiAgcmV0dXJuIGFzc2lnbigge30sIGRlZmF1bHRzLCBzcHJpbmcgKTtcbn1cblxuZnVuY3Rpb24gYXBwbHlTcHJpbmcoIHNwcmluZyApe1xuICBsZXQgYm9keTEgPSBzcHJpbmcuc291cmNlLFxuICAgICAgYm9keTIgPSBzcHJpbmcudGFyZ2V0LFxuICAgICAgbGVuZ3RoID0gc3ByaW5nLmxlbmd0aCA8IDAgPyBkZWZhdWx0cy5sZW5ndGggOiBzcHJpbmcubGVuZ3RoLFxuICAgICAgZHggPSBib2R5Mi5wb3MueCAtIGJvZHkxLnBvcy54LFxuICAgICAgZHkgPSBib2R5Mi5wb3MueSAtIGJvZHkxLnBvcy55LFxuICAgICAgciA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgaWYgKHIgPT09IDApIHtcbiAgICAgIGR4ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpIC8gNTA7XG4gICAgICBkeSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAvIDUwO1xuICAgICAgciA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gIH1cblxuICBsZXQgZCA9IHIgLSBsZW5ndGg7XG4gIGxldCBjb2VmZiA9ICgoIXNwcmluZy5jb2VmZiB8fCBzcHJpbmcuY29lZmYgPCAwKSA/IGRlZmF1bHRzLnNwcmluZ0NvZWZmIDogc3ByaW5nLmNvZWZmKSAqIGQgLyByICogc3ByaW5nLndlaWdodDtcblxuICBib2R5MS5mb3JjZS54ICs9IGNvZWZmICogZHg7XG4gIGJvZHkxLmZvcmNlLnkgKz0gY29lZmYgKiBkeTtcblxuICBib2R5Mi5mb3JjZS54IC09IGNvZWZmICogZHg7XG4gIGJvZHkyLmZvcmNlLnkgLT0gY29lZmYgKiBkeTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IG1ha2VTcHJpbmcsIGFwcGx5U3ByaW5nIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXVsZXIvc3ByaW5nLmpzIiwiLyoqXG5UaGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIEV1bGVyIGxheW91dCBhbGdvcml0aG1cbiovXG5cbmNvbnN0IExheW91dCA9IHJlcXVpcmUoJy4uL2xheW91dCcpO1xuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi4vYXNzaWduJyk7XG5jb25zdCBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcbmNvbnN0IHsgdGljayB9ID0gcmVxdWlyZSgnLi90aWNrJyk7XG5jb25zdCB7IG1ha2VRdWFkdHJlZSB9ID0gcmVxdWlyZSgnLi9xdWFkdHJlZScpO1xuY29uc3QgeyBtYWtlQm9keSB9ID0gcmVxdWlyZSgnLi9ib2R5Jyk7XG5jb25zdCB7IG1ha2VTcHJpbmcgfSA9IHJlcXVpcmUoJy4vc3ByaW5nJyk7XG5jb25zdCBpc0ZuID0gZm4gPT4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nO1xuY29uc3QgaXNQYXJlbnQgPSBuID0+IG4uaXNQYXJlbnQoKTtcbmNvbnN0IG5vdElzUGFyZW50ID0gbiA9PiAhaXNQYXJlbnQobik7XG5jb25zdCBpc0xvY2tlZCA9IG4gPT4gbi5sb2NrZWQoKTtcbmNvbnN0IG5vdElzTG9ja2VkID0gbiA9PiAhaXNMb2NrZWQobik7XG5jb25zdCBpc1BhcmVudEVkZ2UgPSBlID0+IGlzUGFyZW50KCBlLnNvdXJjZSgpICkgfHwgaXNQYXJlbnQoIGUudGFyZ2V0KCkgKTtcbmNvbnN0IG5vdElzUGFyZW50RWRnZSA9IGUgPT4gIWlzUGFyZW50RWRnZShlKTtcbmNvbnN0IGdldEJvZHkgPSBuID0+IG4uc2NyYXRjaCgnZXVsZXInKS5ib2R5O1xuY29uc3QgZ2V0Tm9uUGFyZW50RGVzY2VuZGFudHMgPSBuID0+IGlzUGFyZW50KG4pID8gbi5kZXNjZW5kYW50cygpLmZpbHRlciggbm90SXNQYXJlbnQgKSA6IG47XG5cbmNvbnN0IGdldFNjcmF0Y2ggPSBlbCA9PiB7XG4gIGxldCBzY3JhdGNoID0gZWwuc2NyYXRjaCgnZXVsZXInKTtcblxuICBpZiggIXNjcmF0Y2ggKXtcbiAgICBzY3JhdGNoID0ge307XG5cbiAgICBlbC5zY3JhdGNoKCdldWxlcicsIHNjcmF0Y2gpO1xuICB9XG5cbiAgcmV0dXJuIHNjcmF0Y2g7XG59O1xuXG5jb25zdCBvcHRGbiA9ICggb3B0LCBlbGUgKSA9PiB7XG4gIGlmKCBpc0ZuKCBvcHQgKSApe1xuICAgIHJldHVybiBvcHQoIGVsZSApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBvcHQ7XG4gIH1cbn07XG5cbmNsYXNzIEV1bGVyIGV4dGVuZHMgTGF5b3V0IHtcbiAgY29uc3RydWN0b3IoIG9wdGlvbnMgKXtcbiAgICBzdXBlciggYXNzaWduKCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMgKSApO1xuICB9XG5cbiAgcHJlcnVuKCBzdGF0ZSApe1xuICAgIGxldCBzID0gc3RhdGU7XG5cbiAgICBzLnF1YWR0cmVlID0gbWFrZVF1YWR0cmVlKCk7XG5cbiAgICBsZXQgYm9kaWVzID0gcy5ib2RpZXMgPSBbXTtcblxuICAgIC8vIHJlZ3VsYXIgbm9kZXNcbiAgICBzLm5vZGVzLmZpbHRlciggbiA9PiBub3RJc1BhcmVudChuKSApLmZvckVhY2goIG4gPT4ge1xuICAgICAgbGV0IHNjcmF0Y2ggPSBnZXRTY3JhdGNoKCBuICk7XG5cbiAgICAgIGxldCBib2R5ID0gbWFrZUJvZHkoe1xuICAgICAgICBwb3M6IHsgeDogc2NyYXRjaC54LCB5OiBzY3JhdGNoLnkgfSxcbiAgICAgICAgbWFzczogb3B0Rm4oIHMubWFzcywgbiApLFxuICAgICAgICBsb2NrZWQ6IHNjcmF0Y2gubG9ja2VkXG4gICAgICB9KTtcblxuICAgICAgYm9keS5fY3lOb2RlID0gbjtcblxuICAgICAgc2NyYXRjaC5ib2R5ID0gYm9keTtcblxuICAgICAgYm9keS5fc2NyYXRjaCA9IHNjcmF0Y2g7XG5cbiAgICAgIGJvZGllcy5wdXNoKCBib2R5ICk7XG4gICAgfSApO1xuXG4gICAgbGV0IHNwcmluZ3MgPSBzLnNwcmluZ3MgPSBbXTtcblxuICAgIC8vIHJlZ3VsYXIgZWRnZSBzcHJpbmdzXG4gICAgcy5lZGdlcy5maWx0ZXIoIG5vdElzUGFyZW50RWRnZSApLmZvckVhY2goIGUgPT4ge1xuICAgICAgbGV0IHNwcmluZyA9IG1ha2VTcHJpbmcoe1xuICAgICAgICBzb3VyY2U6IGdldEJvZHkoIGUuc291cmNlKCkgKSxcbiAgICAgICAgdGFyZ2V0OiBnZXRCb2R5KCBlLnRhcmdldCgpICksXG4gICAgICAgIGxlbmd0aDogb3B0Rm4oIHMuc3ByaW5nTGVuZ3RoLCBlICksXG4gICAgICAgIGNvZWZmOiBvcHRGbiggcy5zcHJpbmdDb2VmZiwgZSApXG4gICAgICB9KTtcblxuICAgICAgc3ByaW5nLl9jeUVkZ2UgPSBlO1xuXG4gICAgICBsZXQgc2NyYXRjaCA9IGdldFNjcmF0Y2goIGUgKTtcblxuICAgICAgc3ByaW5nLl9zY3JhdGNoID0gc2NyYXRjaDtcblxuICAgICAgc2NyYXRjaC5zcHJpbmcgPSBzcHJpbmc7XG5cbiAgICAgIHNwcmluZ3MucHVzaCggc3ByaW5nICk7XG4gICAgfSApO1xuXG4gICAgLy8gY29tcG91bmQgZWRnZSBzcHJpbmdzXG4gICAgcy5lZGdlcy5maWx0ZXIoIGlzUGFyZW50RWRnZSApLmZvckVhY2goIGUgPT4ge1xuICAgICAgbGV0IHNvdXJjZXMgPSBnZXROb25QYXJlbnREZXNjZW5kYW50cyggZS5zb3VyY2UoKSApO1xuICAgICAgbGV0IHRhcmdldHMgPSBnZXROb25QYXJlbnREZXNjZW5kYW50cyggZS50YXJnZXQoKSApO1xuXG4gICAgICAvLyBqdXN0IGFkZCBvbmUgc3ByaW5nIGZvciBwZXJmXG4gICAgICBzb3VyY2VzID0gWyBzb3VyY2VzWzBdIF07XG4gICAgICB0YXJnZXRzID0gWyB0YXJnZXRzWzBdIF07XG5cbiAgICAgIHNvdXJjZXMuZm9yRWFjaCggc3JjID0+IHtcbiAgICAgICAgdGFyZ2V0cy5mb3JFYWNoKCB0Z3QgPT4ge1xuICAgICAgICAgIHNwcmluZ3MucHVzaCggbWFrZVNwcmluZyh7XG4gICAgICAgICAgICBzb3VyY2U6IGdldEJvZHkoIHNyYyApLFxuICAgICAgICAgICAgdGFyZ2V0OiBnZXRCb2R5KCB0Z3QgKSxcbiAgICAgICAgICAgIGxlbmd0aDogb3B0Rm4oIHMuc3ByaW5nTGVuZ3RoLCBlICksXG4gICAgICAgICAgICBjb2VmZjogb3B0Rm4oIHMuc3ByaW5nQ29lZmYsIGUgKVxuICAgICAgICAgIH0pICk7XG4gICAgICAgIH0gKTtcbiAgICAgIH0gKTtcbiAgICB9ICk7XG4gIH1cblxuICB0aWNrKCBzdGF0ZSApe1xuICAgIGxldCBtb3ZlbWVudCA9IHRpY2soIHN0YXRlICk7XG5cbiAgICBsZXQgaXNEb25lID0gbW92ZW1lbnQgPD0gc3RhdGUubW92ZW1lbnRUaHJlc2hvbGQ7XG5cbiAgICByZXR1cm4gaXNEb25lO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRXVsZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXVsZXIvaW5kZXguanMiLCJjb25zdCBkZWZhdWx0cyA9IE9iamVjdC5mcmVlemUoe1xuICBwb3M6IHsgeDogMCwgeTogMCB9LFxuICBwcmV2UG9zOiB7IHg6IDAsIHk6IDAgfSxcbiAgZm9yY2U6IHsgeDogMCwgeTogMCB9LFxuICB2ZWxvY2l0eTogeyB4OiAwLCB5OiAwIH0sXG4gIG1hc3M6IDFcbn0pO1xuXG5jb25zdCBjb3B5VmVjID0gdiA9PiAoeyB4OiB2LngsIHk6IHYueSB9KTtcbmNvbnN0IGdldFZhbHVlID0gKCB2YWwsIGRlZiApID0+IHZhbCAhPSBudWxsID8gdmFsIDogZGVmO1xuY29uc3QgZ2V0VmVjID0gKCB2ZWMsIGRlZiApID0+IGNvcHlWZWMoIGdldFZhbHVlKCB2ZWMsIGRlZiApICk7XG5cbmZ1bmN0aW9uIG1ha2VCb2R5KCBvcHRzICl7XG4gIGxldCBiID0ge307XG5cbiAgYi5wb3MgPSBnZXRWZWMoIG9wdHMucG9zLCBkZWZhdWx0cy5wb3MgKTtcbiAgYi5wcmV2UG9zID0gZ2V0VmVjKCBvcHRzLnByZXZQb3MsIGIucG9zICk7XG4gIGIuZm9yY2UgPSBnZXRWZWMoIG9wdHMuZm9yY2UsIGRlZmF1bHRzLmZvcmNlICk7XG4gIGIudmVsb2NpdHkgPSBnZXRWZWMoIG9wdHMudmVsb2NpdHksIGRlZmF1bHRzLnZlbG9jaXR5ICk7XG4gIGIubWFzcyA9IG9wdHMubWFzcyAhPSBudWxsID8gb3B0cy5tYXNzIDogZGVmYXVsdHMubWFzcztcbiAgYi5sb2NrZWQgPSBvcHRzLmxvY2tlZDtcblxuICByZXR1cm4gYjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IG1ha2VCb2R5IH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXVsZXIvYm9keS5qcyIsIi8vIFRPRE8gZGVmYXVsdCBldWxlci1zcGVjaWZpYyBvcHRpb25zXG5jb25zdCBkZWZhdWx0cyA9IE9iamVjdC5mcmVlemUoe1xuICAvLyBUaGUgaWRlYWwgbGVndGggb2YgYSBzcHJpbmdcbiAgLy8gLSBUaGlzIGFjdHMgYXMgYSBoaW50IGZvciB0aGUgZWRnZSBsZW5ndGhcbiAgLy8gLSBUaGUgZWRnZSBsZW5ndGggY2FuIGJlIGxvbmdlciBvciBzaG9ydGVyIGlmIHRoZSBmb3JjZXMgYXJlIHNldCB0byBleHRyZW1lIHZhbHVlc1xuICBzcHJpbmdMZW5ndGg6IGVkZ2UgPT4gODAsXG5cbiAgLy8gSG9va2UncyBsYXcgY29lZmZpY2llbnRcbiAgLy8gLSBUaGUgdmFsdWUgcmFuZ2VzIG9uIFswLCAxXVxuICAvLyAtIExvd2VyIHZhbHVlcyBnaXZlIGxvb3NlciBzcHJpbmdzXG4gIC8vIC0gSGlnaGVyIHZhbHVlcyBnaXZlIHRpZ2h0ZXIgc3ByaW5nc1xuICBzcHJpbmdDb2VmZjogZWRnZSA9PiAwLjAwMDgsXG5cbiAgLy8gVGhlIG1hc3Mgb2YgdGhlIG5vZGUgaW4gdGhlIHBoeXNpY3Mgc2ltdWxhdGlvblxuICAvLyAtIFRoZSBtYXNzIGFmZmVjdHMgdGhlIGdyYXZpdHkgbm9kZSByZXB1bHNpb24vYXR0cmFjdGlvblxuICBtYXNzOiBub2RlID0+IDQsXG5cbiAgLy8gQ291bG9tYidzIGxhdyBjb2VmZmljaWVudFxuICAvLyAtIE1ha2VzIHRoZSBub2RlcyByZXBlbCBlYWNoIG90aGVyIGZvciBuZWdhdGl2ZSB2YWx1ZXNcbiAgLy8gLSBNYWtlcyB0aGUgbm9kZXMgYXR0cmFjdCBlYWNoIG90aGVyIGZvciBwb3NpdGl2ZSB2YWx1ZXNcbiAgZ3Jhdml0eTogLTEuMixcblxuICAvLyBUaGV0YSBjb2VmZmljaWVudCBmcm9tIEJhcm5lcy1IdXQgc2ltdWxhdGlvblxuICAvLyAtIFZhbHVlIHJhbmdlcyBvbiBbMCwgMV1cbiAgLy8gLSBQZXJmb3JtYW5jZSBpcyBiZXR0ZXIgd2l0aCBzbWFsbGVyIHZhbHVlc1xuICAvLyAtIFZlcnkgc21hbGwgdmFsdWVzIG1heSBub3QgY3JlYXRlIGVub3VnaCBmb3JjZSB0byBnaXZlIGEgZ29vZCByZXN1bHRcbiAgdGhldGE6IDAuNjY2LFxuXG4gIC8vIEZyaWN0aW9uIC8gZHJhZyBjb2VmZmljaWVudCB0byBtYWtlIHRoZSBzeXN0ZW0gc3RhYmlsaXNlIG92ZXIgdGltZVxuICBkcmFnQ29lZmY6IDAuMDIsXG5cbiAgLy8gV2hlbiB0aGUgdG90YWwgb2YgdGhlIHNxdWFyZWQgcG9zaXRpb24gZGVsdGFzIGlzIGxlc3MgdGhhbiB0aGlzIHZhbHVlLCB0aGUgc2ltdWxhdGlvbiBlbmRzXG4gIG1vdmVtZW50VGhyZXNob2xkOiAxLFxuXG4gIC8vIFRoZSBhbW91bnQgb2YgdGltZSBwYXNzZWQgcGVyIHRpY2tcbiAgLy8gLSBMYXJnZXIgdmFsdWVzIHJlc3VsdCBpbiBmYXN0ZXIgcnVudGltZXMgYnV0IG1pZ2h0IHNwcmVhZCB0aGluZ3Mgb3V0IHRvbyBmYXJcbiAgLy8gLSBTbWFsbGVyIHZhbHVlcyBwcm9kdWNlIG1vcmUgYWNjdXJhdGUgcmVzdWx0c1xuICB0aW1lU3RlcDogMjBcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V1bGVyL2RlZmF1bHRzLmpzIiwiY29uc3QgZGVmYXVsdENvZWZmID0gMC4wMjtcblxuZnVuY3Rpb24gYXBwbHlEcmFnKCBib2R5LCBtYW51YWxEcmFnQ29lZmYgKXtcbiAgbGV0IGRyYWdDb2VmZjtcblxuICBpZiggbWFudWFsRHJhZ0NvZWZmICE9IG51bGwgKXtcbiAgICBkcmFnQ29lZmYgPSBtYW51YWxEcmFnQ29lZmY7XG4gIH0gZWxzZSBpZiggYm9keS5kcmFnQ29lZmYgIT0gbnVsbCApe1xuICAgIGRyYWdDb2VmZiA9IGJvZHkuZHJhZ0NvZWZmO1xuICB9IGVsc2Uge1xuICAgIGRyYWdDb2VmZiA9IGRlZmF1bHRDb2VmZjtcbiAgfVxuXG4gIGJvZHkuZm9yY2UueCAtPSBkcmFnQ29lZmYgKiBib2R5LnZlbG9jaXR5Lng7XG4gIGJvZHkuZm9yY2UueSAtPSBkcmFnQ29lZmYgKiBib2R5LnZlbG9jaXR5Lnk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBhcHBseURyYWcgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldWxlci9kcmFnLmpzIiwiLy8gdXNlIGV1bGVyIG1ldGhvZCBmb3IgZm9yY2UgaW50ZWdyYXRpb24gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9FdWxlcl9tZXRob2Rcbi8vIHJldHVybiBzdW0gb2Ygc3F1YXJlZCBwb3NpdGlvbiBkZWx0YXNcbmZ1bmN0aW9uIGludGVncmF0ZSggYm9kaWVzLCB0aW1lU3RlcCApe1xuICB2YXIgZHggPSAwLCB0eCA9IDAsXG4gICAgICBkeSA9IDAsIHR5ID0gMCxcbiAgICAgIGksXG4gICAgICBtYXggPSBib2RpZXMubGVuZ3RoO1xuXG4gIGlmIChtYXggPT09IDApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCBtYXg7ICsraSkge1xuICAgIHZhciBib2R5ID0gYm9kaWVzW2ldLFxuICAgICAgICBjb2VmZiA9IHRpbWVTdGVwIC8gYm9keS5tYXNzO1xuXG4gICAgaWYoIGJvZHkuZ3JhYmJlZCApeyBjb250aW51ZTsgfVxuXG4gICAgaWYoIGJvZHkubG9ja2VkICl7XG4gICAgICBib2R5LnZlbG9jaXR5LnggPSAwO1xuICAgICAgYm9keS52ZWxvY2l0eS55ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9keS52ZWxvY2l0eS54ICs9IGNvZWZmICogYm9keS5mb3JjZS54O1xuICAgICAgYm9keS52ZWxvY2l0eS55ICs9IGNvZWZmICogYm9keS5mb3JjZS55O1xuICAgIH1cblxuICAgIHZhciB2eCA9IGJvZHkudmVsb2NpdHkueCxcbiAgICAgICAgdnkgPSBib2R5LnZlbG9jaXR5LnksXG4gICAgICAgIHYgPSBNYXRoLnNxcnQodnggKiB2eCArIHZ5ICogdnkpO1xuXG4gICAgaWYgKHYgPiAxKSB7XG4gICAgICBib2R5LnZlbG9jaXR5LnggPSB2eCAvIHY7XG4gICAgICBib2R5LnZlbG9jaXR5LnkgPSB2eSAvIHY7XG4gICAgfVxuXG4gICAgZHggPSB0aW1lU3RlcCAqIGJvZHkudmVsb2NpdHkueDtcbiAgICBkeSA9IHRpbWVTdGVwICogYm9keS52ZWxvY2l0eS55O1xuXG4gICAgYm9keS5wb3MueCArPSBkeDtcbiAgICBib2R5LnBvcy55ICs9IGR5O1xuXG4gICAgdHggKz0gTWF0aC5hYnMoZHgpOyB0eSArPSBNYXRoLmFicyhkeSk7XG4gIH1cblxuICByZXR1cm4gKHR4ICogdHggKyB0eSAqIHR5KS9tYXg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBpbnRlZ3JhdGUgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldWxlci9pbnRlZ3JhdGUuanMiLCIvLyBpbXBsIG9mIGJhcm5lcyBodXRcbi8vIGh0dHA6Ly93d3cuZWVjcy5iZXJrZWxleS5lZHUvfmRlbW1lbC9jczI2Ny9sZWN0dXJlMjYvbGVjdHVyZTI2Lmh0bWxcbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFybmVzJUUyJTgwJTkzSHV0X3NpbXVsYXRpb25cblxuY29uc3QgTm9kZSA9IHJlcXVpcmUoJy4vbm9kZScpO1xuY29uc3QgSW5zZXJ0U3RhY2sgPSByZXF1aXJlKCcuL2luc2VydFN0YWNrJyk7XG5cbmNvbnN0IHJlc2V0VmVjID0gdiA9PiB7IHYueCA9IDA7IHYueSA9IDA7IH07XG5cbmNvbnN0IGlzU2FtZVBvc2l0aW9uID0gKHAxLCBwMikgPT4ge1xuICBsZXQgdGhyZXNob2xkID0gMWUtODtcbiAgbGV0IGR4ID0gTWF0aC5hYnMocDEueCAtIHAyLngpO1xuICBsZXQgZHkgPSBNYXRoLmFicyhwMS55IC0gcDIueSk7XG5cbiAgcmV0dXJuIGR4IDwgdGhyZXNob2xkICYmIGR5IDwgdGhyZXNob2xkO1xufTtcblxuZnVuY3Rpb24gbWFrZVF1YWR0cmVlKCl7XG4gIGxldCB1cGRhdGVRdWV1ZSA9IFtdLFxuICAgIGluc2VydFN0YWNrID0gbmV3IEluc2VydFN0YWNrKCksXG4gICAgbm9kZXNDYWNoZSA9IFtdLFxuICAgIGN1cnJlbnRJbkNhY2hlID0gMCxcbiAgICByb290ID0gbmV3Tm9kZSgpO1xuXG4gIGZ1bmN0aW9uIG5ld05vZGUoKSB7XG4gICAgLy8gVG8gYXZvaWQgcHJlc3N1cmUgb24gR0Mgd2UgcmV1c2Ugbm9kZXMuXG4gICAgbGV0IG5vZGUgPSBub2Rlc0NhY2hlW2N1cnJlbnRJbkNhY2hlXTtcbiAgICBpZiAobm9kZSkge1xuICAgICAgbm9kZS5xdWFkMCA9IG51bGw7XG4gICAgICBub2RlLnF1YWQxID0gbnVsbDtcbiAgICAgIG5vZGUucXVhZDIgPSBudWxsO1xuICAgICAgbm9kZS5xdWFkMyA9IG51bGw7XG4gICAgICBub2RlLmJvZHkgPSBudWxsO1xuICAgICAgbm9kZS5tYXNzID0gbm9kZS5tYXNzWCA9IG5vZGUubWFzc1kgPSAwO1xuICAgICAgbm9kZS5sZWZ0ID0gbm9kZS5yaWdodCA9IG5vZGUudG9wID0gbm9kZS5ib3R0b20gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gbmV3IE5vZGUoKTtcbiAgICAgIG5vZGVzQ2FjaGVbY3VycmVudEluQ2FjaGVdID0gbm9kZTtcbiAgICB9XG5cbiAgICArK2N1cnJlbnRJbkNhY2hlO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCBzb3VyY2VCb2R5LCBncmF2aXR5LCB0aGV0YSApIHtcbiAgICBsZXQgcXVldWUgPSB1cGRhdGVRdWV1ZSxcbiAgICAgIHYsXG4gICAgICBkeCxcbiAgICAgIGR5LFxuICAgICAgciwgZnggPSAwLFxuICAgICAgZnkgPSAwLFxuICAgICAgcXVldWVMZW5ndGggPSAxLFxuICAgICAgc2hpZnRJZHggPSAwLFxuICAgICAgcHVzaElkeCA9IDE7XG5cbiAgICBxdWV1ZVswXSA9IHJvb3Q7XG5cbiAgICByZXNldFZlYyggc291cmNlQm9keS5mb3JjZSApO1xuXG4gICAgd2hpbGUgKHF1ZXVlTGVuZ3RoKSB7XG4gICAgICBsZXQgbm9kZSA9IHF1ZXVlW3NoaWZ0SWR4XSxcbiAgICAgICAgYm9keSA9IG5vZGUuYm9keTtcblxuICAgICAgcXVldWVMZW5ndGggLT0gMTtcbiAgICAgIHNoaWZ0SWR4ICs9IDE7XG4gICAgICBsZXQgZGlmZmVyZW50Qm9keSA9IChib2R5ICE9PSBzb3VyY2VCb2R5KTtcbiAgICAgIGlmIChib2R5ICYmIGRpZmZlcmVudEJvZHkpIHtcbiAgICAgICAgLy8gSWYgdGhlIGN1cnJlbnQgbm9kZSBpcyBhIGxlYWYgbm9kZSAoYW5kIGl0IGlzIG5vdCBzb3VyY2UgYm9keSksXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgZm9yY2UgZXhlcnRlZCBieSB0aGUgY3VycmVudCBub2RlIG9uIGJvZHksIGFuZCBhZGQgdGhpc1xuICAgICAgICAvLyBhbW91bnQgdG8gYm9keSdzIG5ldCBmb3JjZS5cbiAgICAgICAgZHggPSBib2R5LnBvcy54IC0gc291cmNlQm9keS5wb3MueDtcbiAgICAgICAgZHkgPSBib2R5LnBvcy55IC0gc291cmNlQm9keS5wb3MueTtcbiAgICAgICAgciA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgICAgICAgaWYgKHIgPT09IDApIHtcbiAgICAgICAgICAvLyBQb29yIG1hbidzIHByb3RlY3Rpb24gYWdhaW5zdCB6ZXJvIGRpc3RhbmNlLlxuICAgICAgICAgIGR4ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpIC8gNTA7XG4gICAgICAgICAgZHkgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgLyA1MDtcbiAgICAgICAgICByID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoaXMgaXMgc3RhbmRhcmQgZ3Jhdml0aW9uIGZvcmNlIGNhbGN1bGF0aW9uIGJ1dCB3ZSBkaXZpZGVcbiAgICAgICAgLy8gYnkgcl4zIHRvIHNhdmUgdHdvIG9wZXJhdGlvbnMgd2hlbiBub3JtYWxpemluZyBmb3JjZSB2ZWN0b3IuXG4gICAgICAgIHYgPSBncmF2aXR5ICogYm9keS5tYXNzICogc291cmNlQm9keS5tYXNzIC8gKHIgKiByICogcik7XG4gICAgICAgIGZ4ICs9IHYgKiBkeDtcbiAgICAgICAgZnkgKz0gdiAqIGR5O1xuICAgICAgfSBlbHNlIGlmIChkaWZmZXJlbnRCb2R5KSB7XG4gICAgICAgIC8vIE90aGVyd2lzZSwgY2FsY3VsYXRlIHRoZSByYXRpbyBzIC8gciwgIHdoZXJlIHMgaXMgdGhlIHdpZHRoIG9mIHRoZSByZWdpb25cbiAgICAgICAgLy8gcmVwcmVzZW50ZWQgYnkgdGhlIGludGVybmFsIG5vZGUsIGFuZCByIGlzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBib2R5XG4gICAgICAgIC8vIGFuZCB0aGUgbm9kZSdzIGNlbnRlci1vZi1tYXNzXG4gICAgICAgIGR4ID0gbm9kZS5tYXNzWCAvIG5vZGUubWFzcyAtIHNvdXJjZUJvZHkucG9zLng7XG4gICAgICAgIGR5ID0gbm9kZS5tYXNzWSAvIG5vZGUubWFzcyAtIHNvdXJjZUJvZHkucG9zLnk7XG4gICAgICAgIHIgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG4gICAgICAgIGlmIChyID09PSAwKSB7XG4gICAgICAgICAgLy8gU29ycnkgYWJvdXQgY29kZSBkdXBsdWNhdGlvbi4gSSBkb24ndCB3YW50IHRvIGNyZWF0ZSBtYW55IGZ1bmN0aW9uc1xuICAgICAgICAgIC8vIHJpZ2h0IGF3YXkuIEp1c3Qgd2FudCB0byBzZWUgcGVyZm9ybWFuY2UgZmlyc3QuXG4gICAgICAgICAgZHggPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgLyA1MDtcbiAgICAgICAgICBkeSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAvIDUwO1xuICAgICAgICAgIHIgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHMgLyByIDwgzrgsIHRyZWF0IHRoaXMgaW50ZXJuYWwgbm9kZSBhcyBhIHNpbmdsZSBib2R5LCBhbmQgY2FsY3VsYXRlIHRoZVxuICAgICAgICAvLyBmb3JjZSBpdCBleGVydHMgb24gc291cmNlQm9keSwgYW5kIGFkZCB0aGlzIGFtb3VudCB0byBzb3VyY2VCb2R5J3MgbmV0IGZvcmNlLlxuICAgICAgICBpZiAoKG5vZGUucmlnaHQgLSBub2RlLmxlZnQpIC8gciA8IHRoZXRhKSB7XG4gICAgICAgICAgLy8gaW4gdGhlIGlmIHN0YXRlbWVudCBhYm92ZSB3ZSBjb25zaWRlciBub2RlJ3Mgd2lkdGggb25seVxuICAgICAgICAgIC8vIGJlY2F1c2UgdGhlIHJlZ2lvbiB3YXMgc3F1YXJpZmllZCBkdXJpbmcgdHJlZSBjcmVhdGlvbi5cbiAgICAgICAgICAvLyBUaHVzIHRoZXJlIGlzIG5vIGRpZmZlcmVuY2UgYmV0d2VlbiB1c2luZyB3aWR0aCBvciBoZWlnaHQuXG4gICAgICAgICAgdiA9IGdyYXZpdHkgKiBub2RlLm1hc3MgKiBzb3VyY2VCb2R5Lm1hc3MgLyAociAqIHIgKiByKTtcbiAgICAgICAgICBmeCArPSB2ICogZHg7XG4gICAgICAgICAgZnkgKz0gdiAqIGR5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSwgcnVuIHRoZSBwcm9jZWR1cmUgcmVjdXJzaXZlbHkgb24gZWFjaCBvZiB0aGUgY3VycmVudCBub2RlJ3MgY2hpbGRyZW4uXG5cbiAgICAgICAgICAvLyBJIGludGVudGlvbmFsbHkgdW5mb2xkZWQgdGhpcyBsb29wLCB0byBzYXZlIHNldmVyYWwgQ1BVIGN5Y2xlcy5cbiAgICAgICAgICBpZiAobm9kZS5xdWFkMCkge1xuICAgICAgICAgICAgcXVldWVbcHVzaElkeF0gPSBub2RlLnF1YWQwO1xuICAgICAgICAgICAgcXVldWVMZW5ndGggKz0gMTtcbiAgICAgICAgICAgIHB1c2hJZHggKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG5vZGUucXVhZDEpIHtcbiAgICAgICAgICAgIHF1ZXVlW3B1c2hJZHhdID0gbm9kZS5xdWFkMTtcbiAgICAgICAgICAgIHF1ZXVlTGVuZ3RoICs9IDE7XG4gICAgICAgICAgICBwdXNoSWR4ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChub2RlLnF1YWQyKSB7XG4gICAgICAgICAgICBxdWV1ZVtwdXNoSWR4XSA9IG5vZGUucXVhZDI7XG4gICAgICAgICAgICBxdWV1ZUxlbmd0aCArPSAxO1xuICAgICAgICAgICAgcHVzaElkeCArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobm9kZS5xdWFkMykge1xuICAgICAgICAgICAgcXVldWVbcHVzaElkeF0gPSBub2RlLnF1YWQzO1xuICAgICAgICAgICAgcXVldWVMZW5ndGggKz0gMTtcbiAgICAgICAgICAgIHB1c2hJZHggKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBzb3VyY2VCb2R5LmZvcmNlLnggKz0gZng7XG4gICAgc291cmNlQm9keS5mb3JjZS55ICs9IGZ5O1xuICB9XG5cbiAgZnVuY3Rpb24gaW5zZXJ0Qm9kaWVzKGJvZGllcykge1xuICAgIGxldCB4MSA9IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICB5MSA9IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICB4MiA9IE51bWJlci5NSU5fVkFMVUUsXG4gICAgICB5MiA9IE51bWJlci5NSU5fVkFMVUUsXG4gICAgICBpLFxuICAgICAgbWF4ID0gYm9kaWVzLmxlbmd0aDtcblxuICAgIC8vIFRvIHJlZHVjZSBxdWFkIHRyZWUgZGVwdGggd2UgYXJlIGxvb2tpbmcgZm9yIGV4YWN0IGJvdW5kaW5nIGJveCBvZiBhbGwgcGFydGljbGVzLlxuICAgIGkgPSBtYXg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgbGV0IHggPSBib2RpZXNbaV0ucG9zLng7XG4gICAgICBsZXQgeSA9IGJvZGllc1tpXS5wb3MueTtcbiAgICAgIGlmICh4IDwgeDEpIHtcbiAgICAgICAgeDEgPSB4O1xuICAgICAgfVxuICAgICAgaWYgKHggPiB4Mikge1xuICAgICAgICB4MiA9IHg7XG4gICAgICB9XG4gICAgICBpZiAoeSA8IHkxKSB7XG4gICAgICAgIHkxID0geTtcbiAgICAgIH1cbiAgICAgIGlmICh5ID4geTIpIHtcbiAgICAgICAgeTIgPSB5O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNxdWFyaWZ5IHRoZSBib3VuZHMuXG4gICAgbGV0IGR4ID0geDIgLSB4MSxcbiAgICAgIGR5ID0geTIgLSB5MTtcbiAgICBpZiAoZHggPiBkeSkge1xuICAgICAgeTIgPSB5MSArIGR4O1xuICAgIH0gZWxzZSB7XG4gICAgICB4MiA9IHgxICsgZHk7XG4gICAgfVxuXG4gICAgY3VycmVudEluQ2FjaGUgPSAwO1xuICAgIHJvb3QgPSBuZXdOb2RlKCk7XG4gICAgcm9vdC5sZWZ0ID0geDE7XG4gICAgcm9vdC5yaWdodCA9IHgyO1xuICAgIHJvb3QudG9wID0geTE7XG4gICAgcm9vdC5ib3R0b20gPSB5MjtcblxuICAgIGkgPSBtYXggLSAxO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgIHJvb3QuYm9keSA9IGJvZGllc1tpXTtcbiAgICB9XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaW5zZXJ0KGJvZGllc1tpXSwgcm9vdCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5zZXJ0KG5ld0JvZHkpIHtcbiAgICBpbnNlcnRTdGFjay5yZXNldCgpO1xuICAgIGluc2VydFN0YWNrLnB1c2gocm9vdCwgbmV3Qm9keSk7XG5cbiAgICB3aGlsZSAoIWluc2VydFN0YWNrLmlzRW1wdHkoKSkge1xuICAgICAgbGV0IHN0YWNrSXRlbSA9IGluc2VydFN0YWNrLnBvcCgpLFxuICAgICAgICBub2RlID0gc3RhY2tJdGVtLm5vZGUsXG4gICAgICAgIGJvZHkgPSBzdGFja0l0ZW0uYm9keTtcblxuICAgICAgaWYgKCFub2RlLmJvZHkpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBpbnRlcm5hbCBub2RlLiBVcGRhdGUgdGhlIHRvdGFsIG1hc3Mgb2YgdGhlIG5vZGUgYW5kIGNlbnRlci1vZi1tYXNzLlxuICAgICAgICBsZXQgeCA9IGJvZHkucG9zLng7XG4gICAgICAgIGxldCB5ID0gYm9keS5wb3MueTtcbiAgICAgICAgbm9kZS5tYXNzID0gbm9kZS5tYXNzICsgYm9keS5tYXNzO1xuICAgICAgICBub2RlLm1hc3NYID0gbm9kZS5tYXNzWCArIGJvZHkubWFzcyAqIHg7XG4gICAgICAgIG5vZGUubWFzc1kgPSBub2RlLm1hc3NZICsgYm9keS5tYXNzICogeTtcblxuICAgICAgICAvLyBSZWN1cnNpdmVseSBpbnNlcnQgdGhlIGJvZHkgaW4gdGhlIGFwcHJvcHJpYXRlIHF1YWRyYW50LlxuICAgICAgICAvLyBCdXQgZmlyc3QgZmluZCB0aGUgYXBwcm9wcmlhdGUgcXVhZHJhbnQuXG4gICAgICAgIGxldCBxdWFkSWR4ID0gMCwgLy8gQXNzdW1lIHdlIGFyZSBpbiB0aGUgMCdzIHF1YWQuXG4gICAgICAgICAgbGVmdCA9IG5vZGUubGVmdCxcbiAgICAgICAgICByaWdodCA9IChub2RlLnJpZ2h0ICsgbGVmdCkgLyAyLFxuICAgICAgICAgIHRvcCA9IG5vZGUudG9wLFxuICAgICAgICAgIGJvdHRvbSA9IChub2RlLmJvdHRvbSArIHRvcCkgLyAyO1xuXG4gICAgICAgIGlmICh4ID4gcmlnaHQpIHsgLy8gc29tZXdoZXJlIGluIHRoZSBlYXN0ZXJuIHBhcnQuXG4gICAgICAgICAgcXVhZElkeCA9IHF1YWRJZHggKyAxO1xuICAgICAgICAgIGxlZnQgPSByaWdodDtcbiAgICAgICAgICByaWdodCA9IG5vZGUucmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHkgPiBib3R0b20pIHsgLy8gYW5kIGluIHNvdXRoLlxuICAgICAgICAgIHF1YWRJZHggPSBxdWFkSWR4ICsgMjtcbiAgICAgICAgICB0b3AgPSBib3R0b207XG4gICAgICAgICAgYm90dG9tID0gbm9kZS5ib3R0b207XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY2hpbGQgPSBnZXRDaGlsZChub2RlLCBxdWFkSWR4KTtcbiAgICAgICAgaWYgKCFjaGlsZCkge1xuICAgICAgICAgIC8vIFRoZSBub2RlIGlzIGludGVybmFsIGJ1dCB0aGlzIHF1YWRyYW50IGlzIG5vdCB0YWtlbi4gQWRkXG4gICAgICAgICAgLy8gc3Vibm9kZSB0byBpdC5cbiAgICAgICAgICBjaGlsZCA9IG5ld05vZGUoKTtcbiAgICAgICAgICBjaGlsZC5sZWZ0ID0gbGVmdDtcbiAgICAgICAgICBjaGlsZC50b3AgPSB0b3A7XG4gICAgICAgICAgY2hpbGQucmlnaHQgPSByaWdodDtcbiAgICAgICAgICBjaGlsZC5ib3R0b20gPSBib3R0b207XG4gICAgICAgICAgY2hpbGQuYm9keSA9IGJvZHk7XG5cbiAgICAgICAgICBzZXRDaGlsZChub2RlLCBxdWFkSWR4LCBjaGlsZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gY29udGludWUgc2VhcmNoaW5nIGluIHRoaXMgcXVhZHJhbnQuXG4gICAgICAgICAgaW5zZXJ0U3RhY2sucHVzaChjaGlsZCwgYm9keSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFdlIGFyZSB0cnlpbmcgdG8gYWRkIHRvIHRoZSBsZWFmIG5vZGUuXG4gICAgICAgIC8vIFdlIGhhdmUgdG8gY29udmVydCBjdXJyZW50IGxlYWYgaW50byBpbnRlcm5hbCBub2RlXG4gICAgICAgIC8vIGFuZCBjb250aW51ZSBhZGRpbmcgdHdvIG5vZGVzLlxuICAgICAgICBsZXQgb2xkQm9keSA9IG5vZGUuYm9keTtcbiAgICAgICAgbm9kZS5ib2R5ID0gbnVsbDsgLy8gaW50ZXJuYWwgbm9kZXMgZG8gbm90IGNhcnkgYm9kaWVzXG5cbiAgICAgICAgaWYgKGlzU2FtZVBvc2l0aW9uKG9sZEJvZHkucG9zLCBib2R5LnBvcykpIHtcbiAgICAgICAgICAvLyBQcmV2ZW50IGluZmluaXRlIHN1YmRpdmlzaW9uIGJ5IGJ1bXBpbmcgb25lIG5vZGVcbiAgICAgICAgICAvLyBhbnl3aGVyZSBpbiB0aGlzIHF1YWRyYW50XG4gICAgICAgICAgbGV0IHJldHJpZXNDb3VudCA9IDM7XG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgbGV0IG9mZnNldCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICBsZXQgZHggPSAobm9kZS5yaWdodCAtIG5vZGUubGVmdCkgKiBvZmZzZXQ7XG4gICAgICAgICAgICBsZXQgZHkgPSAobm9kZS5ib3R0b20gLSBub2RlLnRvcCkgKiBvZmZzZXQ7XG5cbiAgICAgICAgICAgIG9sZEJvZHkucG9zLnggPSBub2RlLmxlZnQgKyBkeDtcbiAgICAgICAgICAgIG9sZEJvZHkucG9zLnkgPSBub2RlLnRvcCArIGR5O1xuICAgICAgICAgICAgcmV0cmllc0NvdW50IC09IDE7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgZG9uJ3QgYnVtcCBpdCBvdXQgb2YgdGhlIGJveC4gSWYgd2UgZG8sIG5leHQgaXRlcmF0aW9uIHNob3VsZCBmaXggaXRcbiAgICAgICAgICB9IHdoaWxlIChyZXRyaWVzQ291bnQgPiAwICYmIGlzU2FtZVBvc2l0aW9uKG9sZEJvZHkucG9zLCBib2R5LnBvcykpO1xuXG4gICAgICAgICAgaWYgKHJldHJpZXNDb3VudCA9PT0gMCAmJiBpc1NhbWVQb3NpdGlvbihvbGRCb2R5LnBvcywgYm9keS5wb3MpKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIHZlcnkgYmFkLCB3ZSByYW4gb3V0IG9mIHByZWNpc2lvbi5cbiAgICAgICAgICAgIC8vIGlmIHdlIGRvIG5vdCByZXR1cm4gZnJvbSB0aGUgbWV0aG9kIHdlJ2xsIGdldCBpbnRvXG4gICAgICAgICAgICAvLyBpbmZpbml0ZSBsb29wIGhlcmUuIFNvIHdlIHNhY3JpZmljZSBjb3JyZWN0bmVzcyBvZiBsYXlvdXQsIGFuZCBrZWVwIHRoZSBhcHAgcnVubmluZ1xuICAgICAgICAgICAgLy8gTmV4dCBsYXlvdXQgaXRlcmF0aW9uIHNob3VsZCBnZXQgbGFyZ2VyIGJvdW5kaW5nIGJveCBpbiB0aGUgZmlyc3Qgc3RlcCBhbmQgZml4IHRoaXNcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTmV4dCBpdGVyYXRpb24gc2hvdWxkIHN1YmRpdmlkZSBub2RlIGZ1cnRoZXIuXG4gICAgICAgIGluc2VydFN0YWNrLnB1c2gobm9kZSwgb2xkQm9keSk7XG4gICAgICAgIGluc2VydFN0YWNrLnB1c2gobm9kZSwgYm9keSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbnNlcnRCb2RpZXM6IGluc2VydEJvZGllcyxcbiAgICB1cGRhdGVCb2R5Rm9yY2U6IHVwZGF0ZVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRDaGlsZChub2RlLCBpZHgpIHtcbiAgaWYgKGlkeCA9PT0gMCkgcmV0dXJuIG5vZGUucXVhZDA7XG4gIGlmIChpZHggPT09IDEpIHJldHVybiBub2RlLnF1YWQxO1xuICBpZiAoaWR4ID09PSAyKSByZXR1cm4gbm9kZS5xdWFkMjtcbiAgaWYgKGlkeCA9PT0gMykgcmV0dXJuIG5vZGUucXVhZDM7XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBzZXRDaGlsZChub2RlLCBpZHgsIGNoaWxkKSB7XG4gIGlmIChpZHggPT09IDApIG5vZGUucXVhZDAgPSBjaGlsZDtcbiAgZWxzZSBpZiAoaWR4ID09PSAxKSBub2RlLnF1YWQxID0gY2hpbGQ7XG4gIGVsc2UgaWYgKGlkeCA9PT0gMikgbm9kZS5xdWFkMiA9IGNoaWxkO1xuICBlbHNlIGlmIChpZHggPT09IDMpIG5vZGUucXVhZDMgPSBjaGlsZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IG1ha2VRdWFkdHJlZSB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V1bGVyL3F1YWR0cmVlL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBJbnNlcnRTdGFjaztcblxuLyoqXG4gKiBPdXIgaW1wbG1lbnRhdGlvbiBvZiBRdWFkVHJlZSBpcyBub24tcmVjdXJzaXZlIHRvIGF2b2lkIEdDIGhpdFxuICogVGhpcyBkYXRhIHN0cnVjdHVyZSByZXByZXNlbnQgc3RhY2sgb2YgZWxlbWVudHNcbiAqIHdoaWNoIHdlIGFyZSB0cnlpbmcgdG8gaW5zZXJ0IGludG8gcXVhZCB0cmVlLlxuICovXG5mdW5jdGlvbiBJbnNlcnRTdGFjayAoKSB7XG4gICAgdGhpcy5zdGFjayA9IFtdO1xuICAgIHRoaXMucG9wSWR4ID0gMDtcbn1cblxuSW5zZXJ0U3RhY2sucHJvdG90eXBlID0ge1xuICAgIGlzRW1wdHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3BJZHggPT09IDA7XG4gICAgfSxcbiAgICBwdXNoOiBmdW5jdGlvbiAobm9kZSwgYm9keSkge1xuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc3RhY2tbdGhpcy5wb3BJZHhdO1xuICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgIC8vIHdlIGFyZSB0cnlpbmcgdG8gYXZvaWQgbWVtb3J5IHByZXNzdWU6IGNyZWF0ZSBuZXcgZWxlbWVudFxuICAgICAgICAgICAgLy8gb25seSB3aGVuIGFic29sdXRlbHkgbmVjZXNzYXJ5XG4gICAgICAgICAgICB0aGlzLnN0YWNrW3RoaXMucG9wSWR4XSA9IG5ldyBJbnNlcnRTdGFja0VsZW1lbnQobm9kZSwgYm9keSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLm5vZGUgPSBub2RlO1xuICAgICAgICAgICAgaXRlbS5ib2R5ID0gYm9keTtcbiAgICAgICAgfVxuICAgICAgICArK3RoaXMucG9wSWR4O1xuICAgIH0sXG4gICAgcG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnBvcElkeCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YWNrWy0tdGhpcy5wb3BJZHhdO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnBvcElkeCA9IDA7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gSW5zZXJ0U3RhY2tFbGVtZW50KG5vZGUsIGJvZHkpIHtcbiAgICB0aGlzLm5vZGUgPSBub2RlOyAvLyBRdWFkVHJlZSBub2RlXG4gICAgdGhpcy5ib2R5ID0gYm9keTsgLy8gcGh5c2ljYWwgYm9keSB3aGljaCBuZWVkcyB0byBiZSBpbnNlcnRlZCB0byBub2RlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXVsZXIvcXVhZHRyZWUvaW5zZXJ0U3RhY2suanMiLCIvKipcbiAqIEludGVybmFsIGRhdGEgc3RydWN0dXJlIHRvIHJlcHJlc2VudCAyRCBRdWFkVHJlZSBub2RlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTm9kZSgpIHtcbiAgLy8gYm9keSBzdG9yZWQgaW5zaWRlIHRoaXMgbm9kZS4gSW4gcXVhZCB0cmVlIG9ubHkgbGVhZiBub2RlcyAoYnkgY29uc3RydWN0aW9uKVxuICAvLyBjb250YWluIGJvaWRlczpcbiAgdGhpcy5ib2R5ID0gbnVsbDtcblxuICAvLyBDaGlsZCBub2RlcyBhcmUgc3RvcmVkIGluIHF1YWRzLiBFYWNoIHF1YWQgaXMgcHJlc2VudGVkIGJ5IG51bWJlcjpcbiAgLy8gMCB8IDFcbiAgLy8gLS0tLS1cbiAgLy8gMiB8IDNcbiAgdGhpcy5xdWFkMCA9IG51bGw7XG4gIHRoaXMucXVhZDEgPSBudWxsO1xuICB0aGlzLnF1YWQyID0gbnVsbDtcbiAgdGhpcy5xdWFkMyA9IG51bGw7XG5cbiAgLy8gVG90YWwgbWFzcyBvZiBjdXJyZW50IG5vZGVcbiAgdGhpcy5tYXNzID0gMDtcblxuICAvLyBDZW50ZXIgb2YgbWFzcyBjb29yZGluYXRlc1xuICB0aGlzLm1hc3NYID0gMDtcbiAgdGhpcy5tYXNzWSA9IDA7XG5cbiAgLy8gYm91bmRpbmcgYm94IGNvb3JkaW5hdGVzXG4gIHRoaXMubGVmdCA9IDA7XG4gIHRoaXMudG9wID0gMDtcbiAgdGhpcy5ib3R0b20gPSAwO1xuICB0aGlzLnJpZ2h0ID0gMDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXVsZXIvcXVhZHRyZWUvbm9kZS5qcyIsImNvbnN0IHsgaW50ZWdyYXRlIH0gPSByZXF1aXJlKCcuL2ludGVncmF0ZScpO1xuY29uc3QgeyBhcHBseURyYWcgfSA9IHJlcXVpcmUoJy4vZHJhZycpO1xuY29uc3QgeyBhcHBseVNwcmluZyB9ID0gcmVxdWlyZSgnLi9zcHJpbmcnKTtcblxuZnVuY3Rpb24gdGljayh7IGJvZGllcywgc3ByaW5ncywgcXVhZHRyZWUsIHRpbWVTdGVwLCBncmF2aXR5LCB0aGV0YSwgZHJhZ0NvZWZmIH0pe1xuICAvLyB1cGRhdGUgYm9keSBmcm9tIHNjcmF0Y2ggaW4gY2FzZSBvZiBhbnkgY2hhbmdlc1xuICBib2RpZXMuZm9yRWFjaCggYm9keSA9PiB7XG4gICAgbGV0IHAgPSBib2R5Ll9zY3JhdGNoO1xuXG4gICAgaWYoICFwICl7IHJldHVybjsgfVxuXG4gICAgaWYoIHAuZ3JhYmJlZCApe1xuICAgICAgY29uc29sZS5sb2coICdncmFiYmVkJyApO1xuICAgIH1cblxuICAgIGJvZHkubG9ja2VkID0gcC5sb2NrZWQ7XG4gICAgYm9keS5ncmFiYmVkID0gcC5ncmFiYmVkO1xuICAgIGJvZHkucG9zLnggPSBwLng7XG4gICAgYm9keS5wb3MueSA9IHAueTtcbiAgfSApO1xuXG4gIHF1YWR0cmVlLmluc2VydEJvZGllcyggYm9kaWVzICk7XG5cbiAgZm9yKCBsZXQgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKysgKXtcbiAgICBsZXQgYm9keSA9IGJvZGllc1tpXTtcblxuICAgIHF1YWR0cmVlLnVwZGF0ZUJvZHlGb3JjZSggYm9keSwgZ3Jhdml0eSwgdGhldGEgKTtcbiAgICBhcHBseURyYWcoIGJvZHksIGRyYWdDb2VmZiApO1xuICB9XG5cbiAgZm9yKCBsZXQgaSA9IDA7IGkgPCBzcHJpbmdzLmxlbmd0aDsgaSsrICl7XG4gICAgbGV0IHNwcmluZyA9IHNwcmluZ3NbaV07XG5cbiAgICBhcHBseVNwcmluZyggc3ByaW5nICk7XG4gIH1cblxuICBsZXQgbW92ZW1lbnQgPSBpbnRlZ3JhdGUoIGJvZGllcywgdGltZVN0ZXAgKTtcblxuICAvLyB1cGRhdGUgc2NyYXRjaCBwb3NpdGlvbnMgZnJvbSBib2R5IHBvc2l0aW9uc1xuICBib2RpZXMuZm9yRWFjaCggYm9keSA9PiB7XG4gICAgbGV0IHAgPSBib2R5Ll9zY3JhdGNoO1xuXG4gICAgaWYoICFwICl7IHJldHVybjsgfVxuXG4gICAgcC54ID0gYm9keS5wb3MueDtcbiAgICBwLnkgPSBib2R5LnBvcy55O1xuICB9ICk7XG5cbiAgcmV0dXJuIG1vdmVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgdGljayB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V1bGVyL3RpY2suanMiLCJjb25zdCBFdWxlciA9IHJlcXVpcmUoJy4vZXVsZXInKTtcblxuLy8gcmVnaXN0ZXJzIHRoZSBleHRlbnNpb24gb24gYSBjeXRvc2NhcGUgbGliIHJlZlxubGV0IHJlZ2lzdGVyID0gZnVuY3Rpb24oIGN5dG9zY2FwZSApe1xuICBpZiggIWN5dG9zY2FwZSApeyByZXR1cm47IH0gLy8gY2FuJ3QgcmVnaXN0ZXIgaWYgY3l0b3NjYXBlIHVuc3BlY2lmaWVkXG5cbiAgY3l0b3NjYXBlKCAnbGF5b3V0JywgJ2V1bGVyJywgRXVsZXIgKTsgLy8gcmVnaXN0ZXIgd2l0aCBjeXRvc2NhcGUuanNcbn07XG5cbmlmKCB0eXBlb2YgY3l0b3NjYXBlICE9PSAndW5kZWZpbmVkJyApeyAvLyBleHBvc2UgdG8gZ2xvYmFsIGN5dG9zY2FwZSAoaS5lLiB3aW5kb3cuY3l0b3NjYXBlKVxuICByZWdpc3RlciggY3l0b3NjYXBlICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVnaXN0ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIvLyBnZW5lcmFsIGRlZmF1bHQgb3B0aW9ucyBmb3IgZm9yY2UtZGlyZWN0ZWQgbGF5b3V0XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIGFuaW1hdGU6IHRydWUsIC8vIHdoZXRoZXIgdG8gc2hvdyB0aGUgbGF5b3V0IGFzIGl0J3MgcnVubmluZzsgc3BlY2lhbCAnZW5kJyB2YWx1ZSBtYWtlcyB0aGUgbGF5b3V0IGFuaW1hdGUgbGlrZSBhIGRpc2NyZXRlIGxheW91dFxuICByZWZyZXNoOiAxMCwgLy8gbnVtYmVyIG9mIHRpY2tzIHBlciBmcmFtZTsgaGlnaGVyIGlzIGZhc3RlciBidXQgbW9yZSBqZXJreVxuICBtYXhJdGVyYXRpb25zOiAxMDAwLCAvLyBtYXggaXRlcmF0aW9ucyBiZWZvcmUgdGhlIGxheW91dCB3aWxsIGJhaWwgb3V0XG4gIG1heFNpbXVsYXRpb25UaW1lOiA0MDAwLCAvLyBtYXggbGVuZ3RoIGluIG1zIHRvIHJ1biB0aGUgbGF5b3V0XG4gIHVuZ3JhYmlmeVdoaWxlU2ltdWxhdGluZzogZmFsc2UsIC8vIHNvIHlvdSBjYW4ndCBkcmFnIG5vZGVzIGR1cmluZyBsYXlvdXRcbiAgZml0OiB0cnVlLCAvLyBvbiBldmVyeSBsYXlvdXQgcmVwb3NpdGlvbiBvZiBub2RlcywgZml0IHRoZSB2aWV3cG9ydFxuICBwYWRkaW5nOiAzMCwgLy8gcGFkZGluZyBhcm91bmQgdGhlIHNpbXVsYXRpb25cbiAgYm91bmRpbmdCb3g6IHVuZGVmaW5lZCwgLy8gY29uc3RyYWluIGxheW91dCBib3VuZHM7IHsgeDEsIHkxLCB4MiwgeTIgfSBvciB7IHgxLCB5MSwgdywgaCB9XG5cbiAgLy8gbGF5b3V0IGV2ZW50IGNhbGxiYWNrc1xuICByZWFkeTogZnVuY3Rpb24oKXt9LCAvLyBvbiBsYXlvdXRyZWFkeVxuICBzdG9wOiBmdW5jdGlvbigpe30sIC8vIG9uIGxheW91dHN0b3BcblxuICAvLyBwb3NpdGlvbmluZyBvcHRpb25zXG4gIHJhbmRvbWl6ZTogZmFsc2UsIC8vIHVzZSByYW5kb20gbm9kZSBwb3NpdGlvbnMgYXQgYmVnaW5uaW5nIG9mIGxheW91dFxuICBcbiAgLy8gaW5maW5pdGUgbGF5b3V0IG9wdGlvbnNcbiAgaW5maW5pdGU6IGZhbHNlIC8vIG92ZXJyaWRlcyBhbGwgb3RoZXIgb3B0aW9ucyBmb3IgYSBmb3JjZXMtYWxsLXRoZS10aW1lIG1vZGVcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xheW91dC9kZWZhdWx0cy5qcyIsIi8qKlxuQSBnZW5lcmljIGNvbnRpbnVvdXMgbGF5b3V0IGNsYXNzXG4qL1xuXG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCcuLi9hc3NpZ24nKTtcbmNvbnN0IGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuY29uc3QgbWFrZUJvdW5kaW5nQm94ID0gcmVxdWlyZSgnLi9tYWtlLWJiJyk7XG5jb25zdCB7IHNldEluaXRpYWxQb3NpdGlvblN0YXRlLCByZWZyZXNoUG9zaXRpb25zLCBnZXROb2RlUG9zaXRpb25EYXRhIH0gPSByZXF1aXJlKCcuL3Bvc2l0aW9uJyk7XG5jb25zdCB7IG11bHRpdGljayB9ID0gcmVxdWlyZSgnLi90aWNrJyk7XG5cbmNsYXNzIExheW91dCB7XG4gIGNvbnN0cnVjdG9yKCBvcHRpb25zICl7XG4gICAgbGV0IG8gPSB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApO1xuXG4gICAgbGV0IHMgPSB0aGlzLnN0YXRlID0gYXNzaWduKCB7fSwgbywge1xuICAgICAgbGF5b3V0OiB0aGlzLFxuICAgICAgbm9kZXM6IG8uZWxlcy5ub2RlcygpLFxuICAgICAgZWRnZXM6IG8uZWxlcy5lZGdlcygpLFxuICAgICAgdGlja0luZGV4OiAwLFxuICAgICAgZmlyc3RVcGRhdGU6IHRydWVcbiAgICB9ICk7XG5cbiAgICBzLmFuaW1hdGVFbmQgPSBvLmFuaW1hdGUgJiYgby5hbmltYXRlID09PSAnZW5kJztcbiAgICBzLmFuaW1hdGVDb250aW51b3VzbHkgPSBvLmFuaW1hdGUgJiYgIXMuYW5pbWF0ZUVuZDtcbiAgfVxuXG4gIHJ1bigpe1xuICAgIGxldCBsID0gdGhpcztcbiAgICBsZXQgcyA9IHRoaXMuc3RhdGU7XG5cbiAgICBzLnRpY2tJbmRleCA9IDA7XG4gICAgcy5maXJzdFVwZGF0ZSA9IHRydWU7XG5cbiAgICBzLnJ1bm5pbmcgPSB0cnVlO1xuXG4gICAgcy5jdXJyZW50Qm91bmRpbmdCb3ggPSBtYWtlQm91bmRpbmdCb3goIHMuYm91bmRpbmdCb3gsIHMuY3kgKTtcblxuICAgIGlmKCBzLnJlYWR5ICl7IGwub25lKCAncmVhZHknLCBzLnJlYWR5ICk7IH1cbiAgICBpZiggcy5zdG9wICl7IGwub25lKCAnc3RvcCcsIHMuc3RvcCApOyB9XG5cbiAgICBzLm5vZGVzLmZvckVhY2goIG4gPT4gc2V0SW5pdGlhbFBvc2l0aW9uU3RhdGUoIG4sIHMgKSApO1xuXG4gICAgbC5wcmVydW4oIHMgKTtcblxuICAgIGlmKCBzLmFuaW1hdGVDb250aW51b3VzbHkgKXtcbiAgICAgIGxldCB1bmdyYWJpZnkgPSBub2RlID0+IHtcbiAgICAgICAgaWYoICFzLnVuZ3JhYmlmeVdoaWxlU2ltdWxhdGluZyApeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgZ3JhYmJhYmxlID0gZ2V0Tm9kZVBvc2l0aW9uRGF0YSggbm9kZSwgcyApLmdyYWJiYWJsZSA9IG5vZGUuZ3JhYmJhYmxlKCk7XG5cbiAgICAgICAgaWYoIGdyYWJiYWJsZSApe1xuICAgICAgICAgIG5vZGUudW5ncmFiaWZ5KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGxldCByZWdyYWJpZnkgPSBub2RlID0+IHtcbiAgICAgICAgaWYoICFzLnVuZ3JhYmlmeVdoaWxlU2ltdWxhdGluZyApeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgZ3JhYmJhYmxlID0gZ2V0Tm9kZVBvc2l0aW9uRGF0YSggbm9kZSwgcyApLmdyYWJiYWJsZTtcblxuICAgICAgICBpZiggZ3JhYmJhYmxlICl7XG4gICAgICAgICAgbm9kZS5ncmFiaWZ5KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGxldCB1cGRhdGVHcmFiU3RhdGUgPSBub2RlID0+IGdldE5vZGVQb3NpdGlvbkRhdGEoIG5vZGUsIHMgKS5ncmFiYmVkID0gbm9kZS5ncmFiYmVkKCk7XG5cbiAgICAgIGxldCBvbkdyYWIgPSBmdW5jdGlvbih7IHRhcmdldCB9KXtcbiAgICAgICAgdXBkYXRlR3JhYlN0YXRlKCB0YXJnZXQgKTtcbiAgICAgIH07XG5cbiAgICAgIGxldCBvbkZyZWUgPSBvbkdyYWI7XG5cbiAgICAgIGxldCBvbkRyYWcgPSBmdW5jdGlvbih7IHRhcmdldCB9KXtcbiAgICAgICAgbGV0IHAgPSBnZXROb2RlUG9zaXRpb25EYXRhKCB0YXJnZXQsIHMgKTtcbiAgICAgICAgbGV0IHRwID0gdGFyZ2V0LnBvc2l0aW9uKCk7XG5cbiAgICAgICAgcC54ID0gdHAueDtcbiAgICAgICAgcC55ID0gdHAueTtcbiAgICAgIH07XG5cbiAgICAgIGxldCBsaXN0ZW5Ub0dyYWIgPSBub2RlID0+IHtcbiAgICAgICAgbm9kZS5vbignZ3JhYicsIG9uR3JhYik7XG4gICAgICAgIG5vZGUub24oJ2ZyZWUnLCBvbkZyZWUpO1xuICAgICAgICBub2RlLm9uKCdkcmFnJywgb25EcmFnKTtcbiAgICAgIH07XG5cbiAgICAgIGxldCB1bmxpc3RlblRvR3JhYiA9IG5vZGUgPT4ge1xuICAgICAgICBub2RlLnJlbW92ZUxpc3RlbmVyKCdncmFiJywgb25HcmFiKTtcbiAgICAgICAgbm9kZS5yZW1vdmVMaXN0ZW5lcignZnJlZScsIG9uRnJlZSk7XG4gICAgICAgIG5vZGUucmVtb3ZlTGlzdGVuZXIoJ2RyYWcnLCBvbkRyYWcpO1xuICAgICAgfTtcblxuICAgICAgbGV0IGZpdCA9ICgpID0+IHtcbiAgICAgICAgaWYoIHMuZml0ICYmIHMuYW5pbWF0ZUNvbnRpbnVvdXNseSApe1xuICAgICAgICAgIHMuY3kuZml0KCBzLnBhZGRpbmcgKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgbGV0IG9uTm90RG9uZSA9ICgpID0+IHtcbiAgICAgICAgcmVmcmVzaFBvc2l0aW9ucyggcy5ub2RlcywgcyApO1xuICAgICAgICBmaXQoKTtcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGZyYW1lICk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgZnJhbWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBtdWx0aXRpY2soIHMsIG9uTm90RG9uZSwgb25Eb25lICk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgb25Eb25lID0gKCkgPT4ge1xuICAgICAgICByZWZyZXNoUG9zaXRpb25zKCBzLm5vZGVzLCBzICk7XG4gICAgICAgIGZpdCgpO1xuXG4gICAgICAgIHMubm9kZXMuZm9yRWFjaCggbiA9PiB7XG4gICAgICAgICAgcmVncmFiaWZ5KCBuICk7XG4gICAgICAgICAgdW5saXN0ZW5Ub0dyYWIoIG4gKTtcbiAgICAgICAgfSApO1xuXG4gICAgICAgIHMucnVubmluZyA9IGZhbHNlO1xuXG4gICAgICAgIGwuZW1pdCgnbGF5b3V0c3RvcCcpO1xuICAgICAgfTtcblxuICAgICAgcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICBsLmVtaXQoJ2xheW91dHN0YXJ0Jyk7XG5cbiAgICAgIHMubm9kZXMuZm9yRWFjaCggbiA9PiB7XG4gICAgICAgIHVuZ3JhYmlmeSggbiApO1xuICAgICAgICBsaXN0ZW5Ub0dyYWIoIG4gKTtcbiAgICAgIH0gKTtcblxuICAgICAgZnJhbWUoKTsgLy8ga2ljayBvZmZcbiAgICB9IGVsc2Uge1xuICAgICAgbXVsdGl0aWNrKCBzICk7XG5cbiAgICAgIHMuZWxlcy5sYXlvdXRQb3NpdGlvbnMoIHRoaXMsIHMsIG5vZGUgPT4gZ2V0Tm9kZVBvc2l0aW9uRGF0YSggbm9kZSwgcyApICk7XG4gICAgfVxuXG4gICAgbC5wb3N0cnVuKCBzICk7XG5cbiAgICByZXR1cm4gdGhpczsgLy8gY2hhaW5pbmdcbiAgfVxuXG4gIHByZXJ1bigpe31cbiAgcG9zdHJ1bigpe31cbiAgdGljaygpe31cblxuICBzdG9wKCl7XG4gICAgdGhpcy5zdGF0ZS5ydW5uaW5nID0gZmFsc2U7XG5cbiAgICByZXR1cm4gdGhpczsgLy8gY2hhaW5pbmdcbiAgfVxuXG4gIGRlc3Ryb3koKXtcbiAgICByZXR1cm4gdGhpczsgLy8gY2hhaW5pbmdcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExheW91dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXlvdXQvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCBiYiwgY3kgKXtcbiAgaWYoIGJiID09IG51bGwgKXtcbiAgICBiYiA9IHsgeDE6IDAsIHkxOiAwLCB3OiBjeS53aWR0aCgpLCBoOiBjeS5oZWlnaHQoKSB9O1xuICB9IGVsc2UgeyAvLyBjb3B5XG4gICAgYmIgPSB7IHgxOiBiYi54MSwgeDI6IGJiLngyLCB5MTogYmIueTEsIHkyOiBiYi55MiwgdzogYmIudywgaDogYmIuaCB9O1xuICB9XG5cbiAgaWYoIGJiLngyID09IG51bGwgKXsgYmIueDIgPSBiYi54MSArIGJiLnc7IH1cbiAgaWYoIGJiLncgPT0gbnVsbCApeyBiYi53ID0gYmIueDIgLSBiYi54MTsgfVxuICBpZiggYmIueTIgPT0gbnVsbCApeyBiYi55MiA9IGJiLnkxICsgYmIuaDsgfVxuICBpZiggYmIuaCA9PSBudWxsICl7IGJiLmggPSBiYi55MiAtIGJiLnkxOyB9XG5cbiAgcmV0dXJuIGJiO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXlvdXQvbWFrZS1iYi5qcyIsImNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJy4uL2Fzc2lnbicpO1xuXG5sZXQgc2V0SW5pdGlhbFBvc2l0aW9uU3RhdGUgPSBmdW5jdGlvbiggbm9kZSwgc3RhdGUgKXtcbiAgbGV0IHAgPSBub2RlLnBvc2l0aW9uKCk7XG4gIGxldCBiYiA9IHN0YXRlLmN1cnJlbnRCb3VuZGluZ0JveDtcbiAgbGV0IHNjcmF0Y2ggPSBub2RlLnNjcmF0Y2goIHN0YXRlLm5hbWUgKTtcblxuICBpZiggc2NyYXRjaCA9PSBudWxsICl7XG4gICAgc2NyYXRjaCA9IHt9O1xuXG4gICAgbm9kZS5zY3JhdGNoKCBzdGF0ZS5uYW1lLCBzY3JhdGNoICk7XG4gIH1cblxuICBhc3NpZ24oIHNjcmF0Y2gsIHN0YXRlLnJhbmRvbWl6ZSA/IHtcbiAgICB4OiBiYi54MSArIE1hdGgucm91bmQoIE1hdGgucmFuZG9tKCkgKiBiYi53ICksXG4gICAgeTogYmIueTEgKyBNYXRoLnJvdW5kKCBNYXRoLnJhbmRvbSgpICogYmIuaCApXG4gIH0gOiB7XG4gICAgeDogcC54LFxuICAgIHk6IHAueVxuICB9ICk7XG5cbiAgc2NyYXRjaC5sb2NrZWQgPSBub2RlLmxvY2tlZCgpO1xufTtcblxubGV0IGdldE5vZGVQb3NpdGlvbkRhdGEgPSBmdW5jdGlvbiggbm9kZSwgc3RhdGUgKXtcbiAgcmV0dXJuIG5vZGUuc2NyYXRjaCggc3RhdGUubmFtZSApO1xufTtcblxubGV0IHJlZnJlc2hQb3NpdGlvbnMgPSBmdW5jdGlvbiggbm9kZXMsIHN0YXRlICl7XG4gIG5vZGVzLnBvc2l0aW9ucyhmdW5jdGlvbiggbm9kZSApe1xuICAgIGxldCBzY3JhdGNoID0gbm9kZS5zY3JhdGNoKCBzdGF0ZS5uYW1lICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogc2NyYXRjaC54LFxuICAgICAgeTogc2NyYXRjaC55XG4gICAgfTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgc2V0SW5pdGlhbFBvc2l0aW9uU3RhdGUsIGdldE5vZGVQb3NpdGlvbkRhdGEsIHJlZnJlc2hQb3NpdGlvbnMgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXlvdXQvcG9zaXRpb24uanMiLCJjb25zdCBub3AgPSBmdW5jdGlvbigpe307XG5cbmxldCB0aWNrID0gZnVuY3Rpb24oIHN0YXRlICl7XG4gIGxldCBzID0gc3RhdGU7XG4gIGxldCBsID0gc3RhdGUubGF5b3V0O1xuXG4gIGxldCB0aWNrSW5kaWNhdGVzRG9uZSA9IGwudGljayggcyApO1xuXG4gIGlmKCBzLmZpcnN0VXBkYXRlICl7XG4gICAgaWYoIHMuYW5pbWF0ZUNvbnRpbnVvdXNseSApeyAvLyBpbmRpY2F0ZSB0aGUgaW5pdGlhbCBwb3NpdGlvbnMgaGF2ZSBiZWVuIHNldFxuICAgICAgcy5sYXlvdXQuZW1pdCgnbGF5b3V0cmVhZHknKTtcbiAgICB9XG4gICAgcy5maXJzdFVwZGF0ZSA9IGZhbHNlO1xuICB9XG5cbiAgcy50aWNrSW5kZXgrKztcblxuICBsZXQgZHVyYXRpb24gPSBzLnN0YXJ0VGltZSAtIERhdGUubm93KCk7XG5cbiAgcmV0dXJuICFzLmluZmluaXRlICYmICggdGlja0luZGljYXRlc0RvbmUgfHwgcy50aWNrSW5kZXggPj0gcy5tYXhJdGVyYXRpb25zIHx8IGR1cmF0aW9uID49IHMubWF4U2ltdWxhdGlvblRpbWUgKTtcbn07XG5cbmxldCBtdWx0aXRpY2sgPSBmdW5jdGlvbiggc3RhdGUsIG9uTm90RG9uZSA9IG5vcCwgb25Eb25lID0gbm9wICl7XG4gIGxldCBkb25lID0gZmFsc2U7XG4gIGxldCBzID0gc3RhdGU7XG5cbiAgZm9yKCBsZXQgaSA9IDA7IGkgPCBzLm1heEl0ZXJhdGlvbnM7IGkrKyApe1xuICAgIGRvbmUgPSAhcy5ydW5uaW5nIHx8IHRpY2soIHMgKTtcblxuICAgIGlmKCBkb25lICl7IGJyZWFrOyB9XG4gIH1cblxuICBpZiggIWRvbmUgKXtcbiAgICBvbk5vdERvbmUoKTtcbiAgfSBlbHNlIHtcbiAgICBvbkRvbmUoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHRpY2ssIG11bHRpdGljayB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xheW91dC90aWNrLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==