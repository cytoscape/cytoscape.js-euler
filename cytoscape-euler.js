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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0MWJhZjkzOWJmNGQ5ODk0MzA2OSIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9zcHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V1bGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9ib2R5LmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXVsZXIvZHJhZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXVsZXIvaW50ZWdyYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9ldWxlci9xdWFkdHJlZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXVsZXIvcXVhZHRyZWUvaW5zZXJ0U3RhY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V1bGVyL3F1YWR0cmVlL25vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V1bGVyL3RpY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9sYXlvdXQvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L21ha2UtYmIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9wb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L3RpY2suanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIk9iamVjdCIsImFzc2lnbiIsImJpbmQiLCJ0Z3QiLCJzcmNzIiwiZm9yRWFjaCIsImtleXMiLCJzcmMiLCJrIiwicmVxdWlyZSIsImRlZmF1bHRzIiwiZnJlZXplIiwic291cmNlIiwidGFyZ2V0IiwibGVuZ3RoIiwiY29lZmYiLCJ3ZWlnaHQiLCJtYWtlU3ByaW5nIiwic3ByaW5nIiwiYXBwbHlTcHJpbmciLCJib2R5MSIsImJvZHkyIiwiZHgiLCJwb3MiLCJ4IiwiZHkiLCJ5IiwiciIsIk1hdGgiLCJzcXJ0IiwicmFuZG9tIiwiZCIsInNwcmluZ0NvZWZmIiwiZm9yY2UiLCJMYXlvdXQiLCJ0aWNrIiwibWFrZVF1YWR0cmVlIiwibWFrZUJvZHkiLCJpc0ZuIiwiZm4iLCJpc1BhcmVudCIsIm4iLCJub3RJc1BhcmVudCIsImlzTG9ja2VkIiwibG9ja2VkIiwibm90SXNMb2NrZWQiLCJpc1BhcmVudEVkZ2UiLCJlIiwibm90SXNQYXJlbnRFZGdlIiwiZ2V0Qm9keSIsInNjcmF0Y2giLCJib2R5IiwiZ2V0Tm9uUGFyZW50RGVzY2VuZGFudHMiLCJkZXNjZW5kYW50cyIsImZpbHRlciIsImdldFNjcmF0Y2giLCJlbCIsIm9wdEZuIiwib3B0IiwiZWxlIiwiRXVsZXIiLCJvcHRpb25zIiwic3RhdGUiLCJzIiwicXVhZHRyZWUiLCJib2RpZXMiLCJub2RlcyIsIm1hc3MiLCJfY3lOb2RlIiwiX3NjcmF0Y2giLCJwdXNoIiwic3ByaW5ncyIsImVkZ2VzIiwic3ByaW5nTGVuZ3RoIiwiX2N5RWRnZSIsInNvdXJjZXMiLCJ0YXJnZXRzIiwibW92ZW1lbnQiLCJpc0RvbmUiLCJtb3ZlbWVudFRocmVzaG9sZCIsInByZXZQb3MiLCJ2ZWxvY2l0eSIsImNvcHlWZWMiLCJ2IiwiZ2V0VmFsdWUiLCJ2YWwiLCJkZWYiLCJnZXRWZWMiLCJ2ZWMiLCJvcHRzIiwiYiIsImdyYXZpdHkiLCJ0aGV0YSIsImRyYWdDb2VmZiIsInRpbWVTdGVwIiwiZGVmYXVsdENvZWZmIiwiYXBwbHlEcmFnIiwibWFudWFsRHJhZ0NvZWZmIiwiaW50ZWdyYXRlIiwidHgiLCJ0eSIsImkiLCJtYXgiLCJncmFiYmVkIiwidngiLCJ2eSIsImFicyIsIk5vZGUiLCJJbnNlcnRTdGFjayIsInJlc2V0VmVjIiwiaXNTYW1lUG9zaXRpb24iLCJwMSIsInAyIiwidGhyZXNob2xkIiwidXBkYXRlUXVldWUiLCJpbnNlcnRTdGFjayIsIm5vZGVzQ2FjaGUiLCJjdXJyZW50SW5DYWNoZSIsInJvb3QiLCJuZXdOb2RlIiwibm9kZSIsInF1YWQwIiwicXVhZDEiLCJxdWFkMiIsInF1YWQzIiwibWFzc1giLCJtYXNzWSIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsInVwZGF0ZSIsInNvdXJjZUJvZHkiLCJxdWV1ZSIsImZ4IiwiZnkiLCJxdWV1ZUxlbmd0aCIsInNoaWZ0SWR4IiwicHVzaElkeCIsImRpZmZlcmVudEJvZHkiLCJpbnNlcnRCb2RpZXMiLCJ4MSIsIk51bWJlciIsIk1BWF9WQUxVRSIsInkxIiwieDIiLCJNSU5fVkFMVUUiLCJ5MiIsImluc2VydCIsIm5ld0JvZHkiLCJyZXNldCIsImlzRW1wdHkiLCJzdGFja0l0ZW0iLCJwb3AiLCJxdWFkSWR4IiwiY2hpbGQiLCJnZXRDaGlsZCIsInNldENoaWxkIiwib2xkQm9keSIsInJldHJpZXNDb3VudCIsIm9mZnNldCIsInVwZGF0ZUJvZHlGb3JjZSIsImlkeCIsInN0YWNrIiwicG9wSWR4IiwicHJvdG90eXBlIiwiaXRlbSIsIkluc2VydFN0YWNrRWxlbWVudCIsInAiLCJjb25zb2xlIiwibG9nIiwicmVnaXN0ZXIiLCJjeXRvc2NhcGUiLCJhbmltYXRlIiwicmVmcmVzaCIsIm1heEl0ZXJhdGlvbnMiLCJtYXhTaW11bGF0aW9uVGltZSIsInVuZ3JhYmlmeVdoaWxlU2ltdWxhdGluZyIsImZpdCIsInBhZGRpbmciLCJib3VuZGluZ0JveCIsInVuZGVmaW5lZCIsInJlYWR5Iiwic3RvcCIsInJhbmRvbWl6ZSIsImluZmluaXRlIiwibWFrZUJvdW5kaW5nQm94Iiwic2V0SW5pdGlhbFBvc2l0aW9uU3RhdGUiLCJyZWZyZXNoUG9zaXRpb25zIiwiZ2V0Tm9kZVBvc2l0aW9uRGF0YSIsIm11bHRpdGljayIsIm8iLCJsYXlvdXQiLCJlbGVzIiwidGlja0luZGV4IiwiZmlyc3RVcGRhdGUiLCJhbmltYXRlRW5kIiwiYW5pbWF0ZUNvbnRpbnVvdXNseSIsImwiLCJydW5uaW5nIiwiY3VycmVudEJvdW5kaW5nQm94IiwiY3kiLCJvbmUiLCJwcmVydW4iLCJ1bmdyYWJpZnkiLCJncmFiYmFibGUiLCJyZWdyYWJpZnkiLCJncmFiaWZ5IiwidXBkYXRlR3JhYlN0YXRlIiwib25HcmFiIiwib25GcmVlIiwib25EcmFnIiwidHAiLCJwb3NpdGlvbiIsImxpc3RlblRvR3JhYiIsIm9uIiwidW5saXN0ZW5Ub0dyYWIiLCJyZW1vdmVMaXN0ZW5lciIsIm9uTm90RG9uZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZyYW1lIiwib25Eb25lIiwiZW1pdCIsInN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJsYXlvdXRQb3NpdGlvbnMiLCJwb3N0cnVuIiwiYmIiLCJ3Iiwid2lkdGgiLCJoIiwiaGVpZ2h0IiwibmFtZSIsInJvdW5kIiwicG9zaXRpb25zIiwibm9wIiwidGlja0luZGljYXRlc0RvbmUiLCJkdXJhdGlvbiIsImRvbmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNoRUFBLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU9DLE1BQVAsSUFB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QUFGLENBQVM4QixJQUFULENBQWMsYUFBZDtBQUNEO0FBQ0QvSixNQUFFb0ksV0FBRixHQUFnQixLQUFoQjtBQUNEOztBQUVEcEksSUFBRW1JLFNBQUY7O0FBRUEsTUFBSTRDLFdBQVcvSyxFQUFFZ0ssU0FBRixHQUFjQyxLQUFLQyxHQUFMLEVBQTdCOztBQUVBLFNBQU8sQ0FBQ2xLLEVBQUUwSCxRQUFILEtBQWlCb0QscUJBQXFCOUssRUFBRW1JLFNBQUYsSUFBZW5JLEVBQUVnSCxhQUF0QyxJQUF1RCtELFlBQVkvSyxFQUFFaUgsaUJBQXRGLENBQVA7QUFDRCxDQWxCRDs7QUFvQkEsSUFBSWMsWUFBWSxTQUFaQSxTQUFZLENBQVVoSSxLQUFWLEVBQWdEO0FBQUEsTUFBL0I0SixTQUErQix1RUFBbkJrQixHQUFtQjtBQUFBLE1BQWRmLE1BQWMsdUVBQUxlLEdBQUs7O0FBQzlELE1BQUlHLE9BQU8sS0FBWDtBQUNBLE1BQUloTCxJQUFJRCxLQUFSOztBQUVBLE9BQUssSUFBSXVDLElBQUksQ0FBYixFQUFnQkEsSUFBSXRDLEVBQUVnSCxhQUF0QixFQUFxQzFFLEdBQXJDLEVBQTBDO0FBQ3hDMEksV0FBTyxDQUFDaEwsRUFBRXdJLE9BQUgsSUFBY3BLLEtBQU00QixDQUFOLENBQXJCOztBQUVBLFFBQUlnTCxJQUFKLEVBQVU7QUFBRTtBQUFRO0FBQ3JCOztBQUVELE1BQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1RyQjtBQUNELEdBRkQsTUFFTztBQUNMRztBQUNEO0FBQ0YsQ0FmRDs7QUFpQkEvTixPQUFPQyxPQUFQLEdBQWlCLEVBQUVvQyxVQUFGLEVBQVEySixvQkFBUixFQUFqQixDIiwiZmlsZSI6ImN5dG9zY2FwZS1ldWxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImN5dG9zY2FwZUV1bGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN5dG9zY2FwZUV1bGVyXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDQxYmFmOTM5YmY0ZDk4OTQzMDY5IiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduICE9IG51bGwgPyBPYmplY3QuYXNzaWduLmJpbmQoIE9iamVjdCApIDogZnVuY3Rpb24oIHRndCwgLi4uc3JjcyApe1xuICBzcmNzLmZvckVhY2goIHNyYyA9PiB7XG4gICAgT2JqZWN0LmtleXMoIHNyYyApLmZvckVhY2goIGsgPT4gdGd0W2tdID0gc3JjW2tdICk7XG4gIH0gKTtcblxuICByZXR1cm4gdGd0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NpZ24uanMiLCJjb25zdCBhc3NpZ24gPSByZXF1aXJlKCcuLi9hc3NpZ24nKTtcblxuY29uc3QgZGVmYXVsdHMgPSBPYmplY3QuZnJlZXplKHtcbiAgc291cmNlOiBudWxsLFxuICB0YXJnZXQ6IG51bGwsXG4gIGxlbmd0aDogODAsXG4gIGNvZWZmOiAwLjAwMDIsXG4gIHdlaWdodDogMVxufSk7XG5cbmZ1bmN0aW9uIG1ha2VTcHJpbmcoIHNwcmluZyApe1xuICByZXR1cm4gYXNzaWduKCB7fSwgZGVmYXVsdHMsIHNwcmluZyApO1xufVxuXG5mdW5jdGlvbiBhcHBseVNwcmluZyggc3ByaW5nICl7XG4gIGxldCBib2R5MSA9IHNwcmluZy5zb3VyY2UsXG4gICAgICBib2R5MiA9IHNwcmluZy50YXJnZXQsXG4gICAgICBsZW5ndGggPSBzcHJpbmcubGVuZ3RoIDwgMCA/IGRlZmF1bHRzLmxlbmd0aCA6IHNwcmluZy5sZW5ndGgsXG4gICAgICBkeCA9IGJvZHkyLnBvcy54IC0gYm9keTEucG9zLngsXG4gICAgICBkeSA9IGJvZHkyLnBvcy55IC0gYm9keTEucG9zLnksXG4gICAgICByID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuICBpZiAociA9PT0gMCkge1xuICAgICAgZHggPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgLyA1MDtcbiAgICAgIGR5ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpIC8gNTA7XG4gICAgICByID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgfVxuXG4gIGxldCBkID0gciAtIGxlbmd0aDtcbiAgbGV0IGNvZWZmID0gKCghc3ByaW5nLmNvZWZmIHx8IHNwcmluZy5jb2VmZiA8IDApID8gZGVmYXVsdHMuc3ByaW5nQ29lZmYgOiBzcHJpbmcuY29lZmYpICogZCAvIHIgKiBzcHJpbmcud2VpZ2h0O1xuXG4gIGJvZHkxLmZvcmNlLnggKz0gY29lZmYgKiBkeDtcbiAgYm9keTEuZm9yY2UueSArPSBjb2VmZiAqIGR5O1xuXG4gIGJvZHkyLmZvcmNlLnggLT0gY29lZmYgKiBkeDtcbiAgYm9keTIuZm9yY2UueSAtPSBjb2VmZiAqIGR5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgbWFrZVNwcmluZywgYXBwbHlTcHJpbmcgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldWxlci9zcHJpbmcuanMiLCIvKipcblRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgRXVsZXIgbGF5b3V0IGFsZ29yaXRobVxuKi9cblxuY29uc3QgTGF5b3V0ID0gcmVxdWlyZSgnLi4vbGF5b3V0Jyk7XG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCcuLi9hc3NpZ24nKTtcbmNvbnN0IGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuY29uc3QgeyB0aWNrIH0gPSByZXF1aXJlKCcuL3RpY2snKTtcbmNvbnN0IHsgbWFrZVF1YWR0cmVlIH0gPSByZXF1aXJlKCcuL3F1YWR0cmVlJyk7XG5jb25zdCB7IG1ha2VCb2R5IH0gPSByZXF1aXJlKCcuL2JvZHknKTtcbmNvbnN0IHsgbWFrZVNwcmluZyB9ID0gcmVxdWlyZSgnLi9zcHJpbmcnKTtcbmNvbnN0IGlzRm4gPSBmbiA9PiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbic7XG5jb25zdCBpc1BhcmVudCA9IG4gPT4gbi5pc1BhcmVudCgpO1xuY29uc3Qgbm90SXNQYXJlbnQgPSBuID0+ICFpc1BhcmVudChuKTtcbmNvbnN0IGlzTG9ja2VkID0gbiA9PiBuLmxvY2tlZCgpO1xuY29uc3Qgbm90SXNMb2NrZWQgPSBuID0+ICFpc0xvY2tlZChuKTtcbmNvbnN0IGlzUGFyZW50RWRnZSA9IGUgPT4gaXNQYXJlbnQoIGUuc291cmNlKCkgKSB8fCBpc1BhcmVudCggZS50YXJnZXQoKSApO1xuY29uc3Qgbm90SXNQYXJlbnRFZGdlID0gZSA9PiAhaXNQYXJlbnRFZGdlKGUpO1xuY29uc3QgZ2V0Qm9keSA9IG4gPT4gbi5zY3JhdGNoKCdldWxlcicpLmJvZHk7XG5jb25zdCBnZXROb25QYXJlbnREZXNjZW5kYW50cyA9IG4gPT4gaXNQYXJlbnQobikgPyBuLmRlc2NlbmRhbnRzKCkuZmlsdGVyKCBub3RJc1BhcmVudCApIDogbjtcblxuY29uc3QgZ2V0U2NyYXRjaCA9IGVsID0+IHtcbiAgbGV0IHNjcmF0Y2ggPSBlbC5zY3JhdGNoKCdldWxlcicpO1xuXG4gIGlmKCAhc2NyYXRjaCApe1xuICAgIHNjcmF0Y2ggPSB7fTtcblxuICAgIGVsLnNjcmF0Y2goJ2V1bGVyJywgc2NyYXRjaCk7XG4gIH1cblxuICByZXR1cm4gc2NyYXRjaDtcbn07XG5cbmNvbnN0IG9wdEZuID0gKCBvcHQsIGVsZSApID0+IHtcbiAgaWYoIGlzRm4oIG9wdCApICl7XG4gICAgcmV0dXJuIG9wdCggZWxlICk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9wdDtcbiAgfVxufTtcblxuY2xhc3MgRXVsZXIgZXh0ZW5kcyBMYXlvdXQge1xuICBjb25zdHJ1Y3Rvciggb3B0aW9ucyApe1xuICAgIHN1cGVyKCBhc3NpZ24oIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApICk7XG4gIH1cblxuICBwcmVydW4oIHN0YXRlICl7XG4gICAgbGV0IHMgPSBzdGF0ZTtcblxuICAgIHMucXVhZHRyZWUgPSBtYWtlUXVhZHRyZWUoKTtcblxuICAgIGxldCBib2RpZXMgPSBzLmJvZGllcyA9IFtdO1xuXG4gICAgLy8gcmVndWxhciBub2Rlc1xuICAgIHMubm9kZXMuZmlsdGVyKCBuID0+IG5vdElzUGFyZW50KG4pICkuZm9yRWFjaCggbiA9PiB7XG4gICAgICBsZXQgc2NyYXRjaCA9IGdldFNjcmF0Y2goIG4gKTtcblxuICAgICAgbGV0IGJvZHkgPSBtYWtlQm9keSh7XG4gICAgICAgIHBvczogeyB4OiBzY3JhdGNoLngsIHk6IHNjcmF0Y2gueSB9LFxuICAgICAgICBtYXNzOiBvcHRGbiggcy5tYXNzLCBuICksXG4gICAgICAgIGxvY2tlZDogc2NyYXRjaC5sb2NrZWRcbiAgICAgIH0pO1xuXG4gICAgICBib2R5Ll9jeU5vZGUgPSBuO1xuXG4gICAgICBzY3JhdGNoLmJvZHkgPSBib2R5O1xuXG4gICAgICBib2R5Ll9zY3JhdGNoID0gc2NyYXRjaDtcblxuICAgICAgYm9kaWVzLnB1c2goIGJvZHkgKTtcbiAgICB9ICk7XG5cbiAgICBsZXQgc3ByaW5ncyA9IHMuc3ByaW5ncyA9IFtdO1xuXG4gICAgLy8gcmVndWxhciBlZGdlIHNwcmluZ3NcbiAgICBzLmVkZ2VzLmZpbHRlciggbm90SXNQYXJlbnRFZGdlICkuZm9yRWFjaCggZSA9PiB7XG4gICAgICBsZXQgc3ByaW5nID0gbWFrZVNwcmluZyh7XG4gICAgICAgIHNvdXJjZTogZ2V0Qm9keSggZS5zb3VyY2UoKSApLFxuICAgICAgICB0YXJnZXQ6IGdldEJvZHkoIGUudGFyZ2V0KCkgKSxcbiAgICAgICAgbGVuZ3RoOiBvcHRGbiggcy5zcHJpbmdMZW5ndGgsIGUgKSxcbiAgICAgICAgY29lZmY6IG9wdEZuKCBzLnNwcmluZ0NvZWZmLCBlIClcbiAgICAgIH0pO1xuXG4gICAgICBzcHJpbmcuX2N5RWRnZSA9IGU7XG5cbiAgICAgIGxldCBzY3JhdGNoID0gZ2V0U2NyYXRjaCggZSApO1xuXG4gICAgICBzcHJpbmcuX3NjcmF0Y2ggPSBzY3JhdGNoO1xuXG4gICAgICBzY3JhdGNoLnNwcmluZyA9IHNwcmluZztcblxuICAgICAgc3ByaW5ncy5wdXNoKCBzcHJpbmcgKTtcbiAgICB9ICk7XG5cbiAgICAvLyBjb21wb3VuZCBlZGdlIHNwcmluZ3NcbiAgICBzLmVkZ2VzLmZpbHRlciggaXNQYXJlbnRFZGdlICkuZm9yRWFjaCggZSA9PiB7XG4gICAgICBsZXQgc291cmNlcyA9IGdldE5vblBhcmVudERlc2NlbmRhbnRzKCBlLnNvdXJjZSgpICk7XG4gICAgICBsZXQgdGFyZ2V0cyA9IGdldE5vblBhcmVudERlc2NlbmRhbnRzKCBlLnRhcmdldCgpICk7XG5cbiAgICAgIC8vIGp1c3QgYWRkIG9uZSBzcHJpbmcgZm9yIHBlcmZcbiAgICAgIHNvdXJjZXMgPSBbIHNvdXJjZXNbMF0gXTtcbiAgICAgIHRhcmdldHMgPSBbIHRhcmdldHNbMF0gXTtcblxuICAgICAgc291cmNlcy5mb3JFYWNoKCBzcmMgPT4ge1xuICAgICAgICB0YXJnZXRzLmZvckVhY2goIHRndCA9PiB7XG4gICAgICAgICAgc3ByaW5ncy5wdXNoKCBtYWtlU3ByaW5nKHtcbiAgICAgICAgICAgIHNvdXJjZTogZ2V0Qm9keSggc3JjICksXG4gICAgICAgICAgICB0YXJnZXQ6IGdldEJvZHkoIHRndCApLFxuICAgICAgICAgICAgbGVuZ3RoOiBvcHRGbiggcy5zcHJpbmdMZW5ndGgsIGUgKSxcbiAgICAgICAgICAgIGNvZWZmOiBvcHRGbiggcy5zcHJpbmdDb2VmZiwgZSApXG4gICAgICAgICAgfSkgKTtcbiAgICAgICAgfSApO1xuICAgICAgfSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIHRpY2soIHN0YXRlICl7XG4gICAgbGV0IG1vdmVtZW50ID0gdGljayggc3RhdGUgKTtcblxuICAgIGxldCBpc0RvbmUgPSBtb3ZlbWVudCA8PSBzdGF0ZS5tb3ZlbWVudFRocmVzaG9sZDtcblxuICAgIHJldHVybiBpc0RvbmU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFdWxlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldWxlci9pbmRleC5qcyIsImNvbnN0IGRlZmF1bHRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIHBvczogeyB4OiAwLCB5OiAwIH0sXG4gIHByZXZQb3M6IHsgeDogMCwgeTogMCB9LFxuICBmb3JjZTogeyB4OiAwLCB5OiAwIH0sXG4gIHZlbG9jaXR5OiB7IHg6IDAsIHk6IDAgfSxcbiAgbWFzczogMVxufSk7XG5cbmNvbnN0IGNvcHlWZWMgPSB2ID0+ICh7IHg6IHYueCwgeTogdi55IH0pO1xuY29uc3QgZ2V0VmFsdWUgPSAoIHZhbCwgZGVmICkgPT4gdmFsICE9IG51bGwgPyB2YWwgOiBkZWY7XG5jb25zdCBnZXRWZWMgPSAoIHZlYywgZGVmICkgPT4gY29weVZlYyggZ2V0VmFsdWUoIHZlYywgZGVmICkgKTtcblxuZnVuY3Rpb24gbWFrZUJvZHkoIG9wdHMgKXtcbiAgbGV0IGIgPSB7fTtcblxuICBiLnBvcyA9IGdldFZlYyggb3B0cy5wb3MsIGRlZmF1bHRzLnBvcyApO1xuICBiLnByZXZQb3MgPSBnZXRWZWMoIG9wdHMucHJldlBvcywgYi5wb3MgKTtcbiAgYi5mb3JjZSA9IGdldFZlYyggb3B0cy5mb3JjZSwgZGVmYXVsdHMuZm9yY2UgKTtcbiAgYi52ZWxvY2l0eSA9IGdldFZlYyggb3B0cy52ZWxvY2l0eSwgZGVmYXVsdHMudmVsb2NpdHkgKTtcbiAgYi5tYXNzID0gb3B0cy5tYXNzICE9IG51bGwgPyBvcHRzLm1hc3MgOiBkZWZhdWx0cy5tYXNzO1xuICBiLmxvY2tlZCA9IG9wdHMubG9ja2VkO1xuXG4gIHJldHVybiBiO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgbWFrZUJvZHkgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldWxlci9ib2R5LmpzIiwiY29uc3QgZGVmYXVsdHMgPSBPYmplY3QuZnJlZXplKHtcbiAgLy8gVGhlIGlkZWFsIGxlZ3RoIG9mIGEgc3ByaW5nXG4gIC8vIC0gVGhpcyBhY3RzIGFzIGEgaGludCBmb3IgdGhlIGVkZ2UgbGVuZ3RoXG4gIC8vIC0gVGhlIGVkZ2UgbGVuZ3RoIGNhbiBiZSBsb25nZXIgb3Igc2hvcnRlciBpZiB0aGUgZm9yY2VzIGFyZSBzZXQgdG8gZXh0cmVtZSB2YWx1ZXNcbiAgc3ByaW5nTGVuZ3RoOiBlZGdlID0+IDgwLFxuXG4gIC8vIEhvb2tlJ3MgbGF3IGNvZWZmaWNpZW50XG4gIC8vIC0gVGhlIHZhbHVlIHJhbmdlcyBvbiBbMCwgMV1cbiAgLy8gLSBMb3dlciB2YWx1ZXMgZ2l2ZSBsb29zZXIgc3ByaW5nc1xuICAvLyAtIEhpZ2hlciB2YWx1ZXMgZ2l2ZSB0aWdodGVyIHNwcmluZ3NcbiAgc3ByaW5nQ29lZmY6IGVkZ2UgPT4gMC4wMDA4LFxuXG4gIC8vIFRoZSBtYXNzIG9mIHRoZSBub2RlIGluIHRoZSBwaHlzaWNzIHNpbXVsYXRpb25cbiAgLy8gLSBUaGUgbWFzcyBhZmZlY3RzIHRoZSBncmF2aXR5IG5vZGUgcmVwdWxzaW9uL2F0dHJhY3Rpb25cbiAgbWFzczogbm9kZSA9PiA0LFxuXG4gIC8vIENvdWxvbWIncyBsYXcgY29lZmZpY2llbnRcbiAgLy8gLSBNYWtlcyB0aGUgbm9kZXMgcmVwZWwgZWFjaCBvdGhlciBmb3IgbmVnYXRpdmUgdmFsdWVzXG4gIC8vIC0gTWFrZXMgdGhlIG5vZGVzIGF0dHJhY3QgZWFjaCBvdGhlciBmb3IgcG9zaXRpdmUgdmFsdWVzXG4gIGdyYXZpdHk6IC0xLjIsXG5cbiAgLy8gVGhldGEgY29lZmZpY2llbnQgZnJvbSBCYXJuZXMtSHV0IHNpbXVsYXRpb25cbiAgLy8gLSBWYWx1ZSByYW5nZXMgb24gWzAsIDFdXG4gIC8vIC0gUGVyZm9ybWFuY2UgaXMgYmV0dGVyIHdpdGggc21hbGxlciB2YWx1ZXNcbiAgLy8gLSBWZXJ5IHNtYWxsIHZhbHVlcyBtYXkgbm90IGNyZWF0ZSBlbm91Z2ggZm9yY2UgdG8gZ2l2ZSBhIGdvb2QgcmVzdWx0XG4gIHRoZXRhOiAwLjY2NixcblxuICAvLyBGcmljdGlvbiAvIGRyYWcgY29lZmZpY2llbnQgdG8gbWFrZSB0aGUgc3lzdGVtIHN0YWJpbGlzZSBvdmVyIHRpbWVcbiAgZHJhZ0NvZWZmOiAwLjAyLFxuXG4gIC8vIFdoZW4gdGhlIHRvdGFsIG9mIHRoZSBzcXVhcmVkIHBvc2l0aW9uIGRlbHRhcyBpcyBsZXNzIHRoYW4gdGhpcyB2YWx1ZSwgdGhlIHNpbXVsYXRpb24gZW5kc1xuICBtb3ZlbWVudFRocmVzaG9sZDogMSxcblxuICAvLyBUaGUgYW1vdW50IG9mIHRpbWUgcGFzc2VkIHBlciB0aWNrXG4gIC8vIC0gTGFyZ2VyIHZhbHVlcyByZXN1bHQgaW4gZmFzdGVyIHJ1bnRpbWVzIGJ1dCBtaWdodCBzcHJlYWQgdGhpbmdzIG91dCB0b28gZmFyXG4gIC8vIC0gU21hbGxlciB2YWx1ZXMgcHJvZHVjZSBtb3JlIGFjY3VyYXRlIHJlc3VsdHNcbiAgdGltZVN0ZXA6IDIwXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldWxlci9kZWZhdWx0cy5qcyIsImNvbnN0IGRlZmF1bHRDb2VmZiA9IDAuMDI7XG5cbmZ1bmN0aW9uIGFwcGx5RHJhZyggYm9keSwgbWFudWFsRHJhZ0NvZWZmICl7XG4gIGxldCBkcmFnQ29lZmY7XG5cbiAgaWYoIG1hbnVhbERyYWdDb2VmZiAhPSBudWxsICl7XG4gICAgZHJhZ0NvZWZmID0gbWFudWFsRHJhZ0NvZWZmO1xuICB9IGVsc2UgaWYoIGJvZHkuZHJhZ0NvZWZmICE9IG51bGwgKXtcbiAgICBkcmFnQ29lZmYgPSBib2R5LmRyYWdDb2VmZjtcbiAgfSBlbHNlIHtcbiAgICBkcmFnQ29lZmYgPSBkZWZhdWx0Q29lZmY7XG4gIH1cblxuICBib2R5LmZvcmNlLnggLT0gZHJhZ0NvZWZmICogYm9keS52ZWxvY2l0eS54O1xuICBib2R5LmZvcmNlLnkgLT0gZHJhZ0NvZWZmICogYm9keS52ZWxvY2l0eS55O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgYXBwbHlEcmFnIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXVsZXIvZHJhZy5qcyIsIi8vIHVzZSBldWxlciBtZXRob2QgZm9yIGZvcmNlIGludGVncmF0aW9uIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRXVsZXJfbWV0aG9kXG4vLyByZXR1cm4gc3VtIG9mIHNxdWFyZWQgcG9zaXRpb24gZGVsdGFzXG5mdW5jdGlvbiBpbnRlZ3JhdGUoIGJvZGllcywgdGltZVN0ZXAgKXtcbiAgdmFyIGR4ID0gMCwgdHggPSAwLFxuICAgICAgZHkgPSAwLCB0eSA9IDAsXG4gICAgICBpLFxuICAgICAgbWF4ID0gYm9kaWVzLmxlbmd0aDtcblxuICBpZiAobWF4ID09PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgbWF4OyArK2kpIHtcbiAgICB2YXIgYm9keSA9IGJvZGllc1tpXSxcbiAgICAgICAgY29lZmYgPSB0aW1lU3RlcCAvIGJvZHkubWFzcztcblxuICAgIGlmKCBib2R5LmdyYWJiZWQgKXsgY29udGludWU7IH1cblxuICAgIGlmKCBib2R5LmxvY2tlZCApe1xuICAgICAgYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgICAgIGJvZHkudmVsb2NpdHkueSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvZHkudmVsb2NpdHkueCArPSBjb2VmZiAqIGJvZHkuZm9yY2UueDtcbiAgICAgIGJvZHkudmVsb2NpdHkueSArPSBjb2VmZiAqIGJvZHkuZm9yY2UueTtcbiAgICB9XG5cbiAgICB2YXIgdnggPSBib2R5LnZlbG9jaXR5LngsXG4gICAgICAgIHZ5ID0gYm9keS52ZWxvY2l0eS55LFxuICAgICAgICB2ID0gTWF0aC5zcXJ0KHZ4ICogdnggKyB2eSAqIHZ5KTtcblxuICAgIGlmICh2ID4gMSkge1xuICAgICAgYm9keS52ZWxvY2l0eS54ID0gdnggLyB2O1xuICAgICAgYm9keS52ZWxvY2l0eS55ID0gdnkgLyB2O1xuICAgIH1cblxuICAgIGR4ID0gdGltZVN0ZXAgKiBib2R5LnZlbG9jaXR5Lng7XG4gICAgZHkgPSB0aW1lU3RlcCAqIGJvZHkudmVsb2NpdHkueTtcblxuICAgIGJvZHkucG9zLnggKz0gZHg7XG4gICAgYm9keS5wb3MueSArPSBkeTtcblxuICAgIHR4ICs9IE1hdGguYWJzKGR4KTsgdHkgKz0gTWF0aC5hYnMoZHkpO1xuICB9XG5cbiAgcmV0dXJuICh0eCAqIHR4ICsgdHkgKiB0eSkvbWF4O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgaW50ZWdyYXRlIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXVsZXIvaW50ZWdyYXRlLmpzIiwiLy8gaW1wbCBvZiBiYXJuZXMgaHV0XG4vLyBodHRwOi8vd3d3LmVlY3MuYmVya2VsZXkuZWR1L35kZW1tZWwvY3MyNjcvbGVjdHVyZTI2L2xlY3R1cmUyNi5odG1sXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhcm5lcyVFMiU4MCU5M0h1dF9zaW11bGF0aW9uXG5cbmNvbnN0IE5vZGUgPSByZXF1aXJlKCcuL25vZGUnKTtcbmNvbnN0IEluc2VydFN0YWNrID0gcmVxdWlyZSgnLi9pbnNlcnRTdGFjaycpO1xuXG5jb25zdCByZXNldFZlYyA9IHYgPT4geyB2LnggPSAwOyB2LnkgPSAwOyB9O1xuXG5jb25zdCBpc1NhbWVQb3NpdGlvbiA9IChwMSwgcDIpID0+IHtcbiAgbGV0IHRocmVzaG9sZCA9IDFlLTg7XG4gIGxldCBkeCA9IE1hdGguYWJzKHAxLnggLSBwMi54KTtcbiAgbGV0IGR5ID0gTWF0aC5hYnMocDEueSAtIHAyLnkpO1xuXG4gIHJldHVybiBkeCA8IHRocmVzaG9sZCAmJiBkeSA8IHRocmVzaG9sZDtcbn07XG5cbmZ1bmN0aW9uIG1ha2VRdWFkdHJlZSgpe1xuICBsZXQgdXBkYXRlUXVldWUgPSBbXSxcbiAgICBpbnNlcnRTdGFjayA9IG5ldyBJbnNlcnRTdGFjaygpLFxuICAgIG5vZGVzQ2FjaGUgPSBbXSxcbiAgICBjdXJyZW50SW5DYWNoZSA9IDAsXG4gICAgcm9vdCA9IG5ld05vZGUoKTtcblxuICBmdW5jdGlvbiBuZXdOb2RlKCkge1xuICAgIC8vIFRvIGF2b2lkIHByZXNzdXJlIG9uIEdDIHdlIHJldXNlIG5vZGVzLlxuICAgIGxldCBub2RlID0gbm9kZXNDYWNoZVtjdXJyZW50SW5DYWNoZV07XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIG5vZGUucXVhZDAgPSBudWxsO1xuICAgICAgbm9kZS5xdWFkMSA9IG51bGw7XG4gICAgICBub2RlLnF1YWQyID0gbnVsbDtcbiAgICAgIG5vZGUucXVhZDMgPSBudWxsO1xuICAgICAgbm9kZS5ib2R5ID0gbnVsbDtcbiAgICAgIG5vZGUubWFzcyA9IG5vZGUubWFzc1ggPSBub2RlLm1hc3NZID0gMDtcbiAgICAgIG5vZGUubGVmdCA9IG5vZGUucmlnaHQgPSBub2RlLnRvcCA9IG5vZGUuYm90dG9tID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IG5ldyBOb2RlKCk7XG4gICAgICBub2Rlc0NhY2hlW2N1cnJlbnRJbkNhY2hlXSA9IG5vZGU7XG4gICAgfVxuXG4gICAgKytjdXJyZW50SW5DYWNoZTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSggc291cmNlQm9keSwgZ3Jhdml0eSwgdGhldGEgKSB7XG4gICAgbGV0IHF1ZXVlID0gdXBkYXRlUXVldWUsXG4gICAgICB2LFxuICAgICAgZHgsXG4gICAgICBkeSxcbiAgICAgIHIsIGZ4ID0gMCxcbiAgICAgIGZ5ID0gMCxcbiAgICAgIHF1ZXVlTGVuZ3RoID0gMSxcbiAgICAgIHNoaWZ0SWR4ID0gMCxcbiAgICAgIHB1c2hJZHggPSAxO1xuXG4gICAgcXVldWVbMF0gPSByb290O1xuXG4gICAgcmVzZXRWZWMoIHNvdXJjZUJvZHkuZm9yY2UgKTtcblxuICAgIHdoaWxlIChxdWV1ZUxlbmd0aCkge1xuICAgICAgbGV0IG5vZGUgPSBxdWV1ZVtzaGlmdElkeF0sXG4gICAgICAgIGJvZHkgPSBub2RlLmJvZHk7XG5cbiAgICAgIHF1ZXVlTGVuZ3RoIC09IDE7XG4gICAgICBzaGlmdElkeCArPSAxO1xuICAgICAgbGV0IGRpZmZlcmVudEJvZHkgPSAoYm9keSAhPT0gc291cmNlQm9keSk7XG4gICAgICBpZiAoYm9keSAmJiBkaWZmZXJlbnRCb2R5KSB7XG4gICAgICAgIC8vIElmIHRoZSBjdXJyZW50IG5vZGUgaXMgYSBsZWFmIG5vZGUgKGFuZCBpdCBpcyBub3Qgc291cmNlIGJvZHkpLFxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGZvcmNlIGV4ZXJ0ZWQgYnkgdGhlIGN1cnJlbnQgbm9kZSBvbiBib2R5LCBhbmQgYWRkIHRoaXNcbiAgICAgICAgLy8gYW1vdW50IHRvIGJvZHkncyBuZXQgZm9yY2UuXG4gICAgICAgIGR4ID0gYm9keS5wb3MueCAtIHNvdXJjZUJvZHkucG9zLng7XG4gICAgICAgIGR5ID0gYm9keS5wb3MueSAtIHNvdXJjZUJvZHkucG9zLnk7XG4gICAgICAgIHIgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG4gICAgICAgIGlmIChyID09PSAwKSB7XG4gICAgICAgICAgLy8gUG9vciBtYW4ncyBwcm90ZWN0aW9uIGFnYWluc3QgemVybyBkaXN0YW5jZS5cbiAgICAgICAgICBkeCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAvIDUwO1xuICAgICAgICAgIGR5ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpIC8gNTA7XG4gICAgICAgICAgciA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGlzIGlzIHN0YW5kYXJkIGdyYXZpdGlvbiBmb3JjZSBjYWxjdWxhdGlvbiBidXQgd2UgZGl2aWRlXG4gICAgICAgIC8vIGJ5IHJeMyB0byBzYXZlIHR3byBvcGVyYXRpb25zIHdoZW4gbm9ybWFsaXppbmcgZm9yY2UgdmVjdG9yLlxuICAgICAgICB2ID0gZ3Jhdml0eSAqIGJvZHkubWFzcyAqIHNvdXJjZUJvZHkubWFzcyAvIChyICogciAqIHIpO1xuICAgICAgICBmeCArPSB2ICogZHg7XG4gICAgICAgIGZ5ICs9IHYgKiBkeTtcbiAgICAgIH0gZWxzZSBpZiAoZGlmZmVyZW50Qm9keSkge1xuICAgICAgICAvLyBPdGhlcndpc2UsIGNhbGN1bGF0ZSB0aGUgcmF0aW8gcyAvIHIsICB3aGVyZSBzIGlzIHRoZSB3aWR0aCBvZiB0aGUgcmVnaW9uXG4gICAgICAgIC8vIHJlcHJlc2VudGVkIGJ5IHRoZSBpbnRlcm5hbCBub2RlLCBhbmQgciBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgYm9keVxuICAgICAgICAvLyBhbmQgdGhlIG5vZGUncyBjZW50ZXItb2YtbWFzc1xuICAgICAgICBkeCA9IG5vZGUubWFzc1ggLyBub2RlLm1hc3MgLSBzb3VyY2VCb2R5LnBvcy54O1xuICAgICAgICBkeSA9IG5vZGUubWFzc1kgLyBub2RlLm1hc3MgLSBzb3VyY2VCb2R5LnBvcy55O1xuICAgICAgICByID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuICAgICAgICBpZiAociA9PT0gMCkge1xuICAgICAgICAgIC8vIFNvcnJ5IGFib3V0IGNvZGUgZHVwbHVjYXRpb24uIEkgZG9uJ3Qgd2FudCB0byBjcmVhdGUgbWFueSBmdW5jdGlvbnNcbiAgICAgICAgICAvLyByaWdodCBhd2F5LiBKdXN0IHdhbnQgdG8gc2VlIHBlcmZvcm1hbmNlIGZpcnN0LlxuICAgICAgICAgIGR4ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpIC8gNTA7XG4gICAgICAgICAgZHkgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgLyA1MDtcbiAgICAgICAgICByID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBzIC8gciA8IM64LCB0cmVhdCB0aGlzIGludGVybmFsIG5vZGUgYXMgYSBzaW5nbGUgYm9keSwgYW5kIGNhbGN1bGF0ZSB0aGVcbiAgICAgICAgLy8gZm9yY2UgaXQgZXhlcnRzIG9uIHNvdXJjZUJvZHksIGFuZCBhZGQgdGhpcyBhbW91bnQgdG8gc291cmNlQm9keSdzIG5ldCBmb3JjZS5cbiAgICAgICAgaWYgKChub2RlLnJpZ2h0IC0gbm9kZS5sZWZ0KSAvIHIgPCB0aGV0YSkge1xuICAgICAgICAgIC8vIGluIHRoZSBpZiBzdGF0ZW1lbnQgYWJvdmUgd2UgY29uc2lkZXIgbm9kZSdzIHdpZHRoIG9ubHlcbiAgICAgICAgICAvLyBiZWNhdXNlIHRoZSByZWdpb24gd2FzIHNxdWFyaWZpZWQgZHVyaW5nIHRyZWUgY3JlYXRpb24uXG4gICAgICAgICAgLy8gVGh1cyB0aGVyZSBpcyBubyBkaWZmZXJlbmNlIGJldHdlZW4gdXNpbmcgd2lkdGggb3IgaGVpZ2h0LlxuICAgICAgICAgIHYgPSBncmF2aXR5ICogbm9kZS5tYXNzICogc291cmNlQm9keS5tYXNzIC8gKHIgKiByICogcik7XG4gICAgICAgICAgZnggKz0gdiAqIGR4O1xuICAgICAgICAgIGZ5ICs9IHYgKiBkeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UsIHJ1biB0aGUgcHJvY2VkdXJlIHJlY3Vyc2l2ZWx5IG9uIGVhY2ggb2YgdGhlIGN1cnJlbnQgbm9kZSdzIGNoaWxkcmVuLlxuXG4gICAgICAgICAgLy8gSSBpbnRlbnRpb25hbGx5IHVuZm9sZGVkIHRoaXMgbG9vcCwgdG8gc2F2ZSBzZXZlcmFsIENQVSBjeWNsZXMuXG4gICAgICAgICAgaWYgKG5vZGUucXVhZDApIHtcbiAgICAgICAgICAgIHF1ZXVlW3B1c2hJZHhdID0gbm9kZS5xdWFkMDtcbiAgICAgICAgICAgIHF1ZXVlTGVuZ3RoICs9IDE7XG4gICAgICAgICAgICBwdXNoSWR4ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChub2RlLnF1YWQxKSB7XG4gICAgICAgICAgICBxdWV1ZVtwdXNoSWR4XSA9IG5vZGUucXVhZDE7XG4gICAgICAgICAgICBxdWV1ZUxlbmd0aCArPSAxO1xuICAgICAgICAgICAgcHVzaElkeCArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobm9kZS5xdWFkMikge1xuICAgICAgICAgICAgcXVldWVbcHVzaElkeF0gPSBub2RlLnF1YWQyO1xuICAgICAgICAgICAgcXVldWVMZW5ndGggKz0gMTtcbiAgICAgICAgICAgIHB1c2hJZHggKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG5vZGUucXVhZDMpIHtcbiAgICAgICAgICAgIHF1ZXVlW3B1c2hJZHhdID0gbm9kZS5xdWFkMztcbiAgICAgICAgICAgIHF1ZXVlTGVuZ3RoICs9IDE7XG4gICAgICAgICAgICBwdXNoSWR4ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc291cmNlQm9keS5mb3JjZS54ICs9IGZ4O1xuICAgIHNvdXJjZUJvZHkuZm9yY2UueSArPSBmeTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluc2VydEJvZGllcyhib2RpZXMpIHtcbiAgICBsZXQgeDEgPSBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgeTEgPSBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgeDIgPSBOdW1iZXIuTUlOX1ZBTFVFLFxuICAgICAgeTIgPSBOdW1iZXIuTUlOX1ZBTFVFLFxuICAgICAgaSxcbiAgICAgIG1heCA9IGJvZGllcy5sZW5ndGg7XG5cbiAgICAvLyBUbyByZWR1Y2UgcXVhZCB0cmVlIGRlcHRoIHdlIGFyZSBsb29raW5nIGZvciBleGFjdCBib3VuZGluZyBib3ggb2YgYWxsIHBhcnRpY2xlcy5cbiAgICBpID0gbWF4O1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGxldCB4ID0gYm9kaWVzW2ldLnBvcy54O1xuICAgICAgbGV0IHkgPSBib2RpZXNbaV0ucG9zLnk7XG4gICAgICBpZiAoeCA8IHgxKSB7XG4gICAgICAgIHgxID0geDtcbiAgICAgIH1cbiAgICAgIGlmICh4ID4geDIpIHtcbiAgICAgICAgeDIgPSB4O1xuICAgICAgfVxuICAgICAgaWYgKHkgPCB5MSkge1xuICAgICAgICB5MSA9IHk7XG4gICAgICB9XG4gICAgICBpZiAoeSA+IHkyKSB7XG4gICAgICAgIHkyID0geTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTcXVhcmlmeSB0aGUgYm91bmRzLlxuICAgIGxldCBkeCA9IHgyIC0geDEsXG4gICAgICBkeSA9IHkyIC0geTE7XG4gICAgaWYgKGR4ID4gZHkpIHtcbiAgICAgIHkyID0geTEgKyBkeDtcbiAgICB9IGVsc2Uge1xuICAgICAgeDIgPSB4MSArIGR5O1xuICAgIH1cblxuICAgIGN1cnJlbnRJbkNhY2hlID0gMDtcbiAgICByb290ID0gbmV3Tm9kZSgpO1xuICAgIHJvb3QubGVmdCA9IHgxO1xuICAgIHJvb3QucmlnaHQgPSB4MjtcbiAgICByb290LnRvcCA9IHkxO1xuICAgIHJvb3QuYm90dG9tID0geTI7XG5cbiAgICBpID0gbWF4IC0gMTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICByb290LmJvZHkgPSBib2RpZXNbaV07XG4gICAgfVxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGluc2VydChib2RpZXNbaV0sIHJvb3QpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluc2VydChuZXdCb2R5KSB7XG4gICAgaW5zZXJ0U3RhY2sucmVzZXQoKTtcbiAgICBpbnNlcnRTdGFjay5wdXNoKHJvb3QsIG5ld0JvZHkpO1xuXG4gICAgd2hpbGUgKCFpbnNlcnRTdGFjay5pc0VtcHR5KCkpIHtcbiAgICAgIGxldCBzdGFja0l0ZW0gPSBpbnNlcnRTdGFjay5wb3AoKSxcbiAgICAgICAgbm9kZSA9IHN0YWNrSXRlbS5ub2RlLFxuICAgICAgICBib2R5ID0gc3RhY2tJdGVtLmJvZHk7XG5cbiAgICAgIGlmICghbm9kZS5ib2R5KSB7XG4gICAgICAgIC8vIFRoaXMgaXMgaW50ZXJuYWwgbm9kZS4gVXBkYXRlIHRoZSB0b3RhbCBtYXNzIG9mIHRoZSBub2RlIGFuZCBjZW50ZXItb2YtbWFzcy5cbiAgICAgICAgbGV0IHggPSBib2R5LnBvcy54O1xuICAgICAgICBsZXQgeSA9IGJvZHkucG9zLnk7XG4gICAgICAgIG5vZGUubWFzcyA9IG5vZGUubWFzcyArIGJvZHkubWFzcztcbiAgICAgICAgbm9kZS5tYXNzWCA9IG5vZGUubWFzc1ggKyBib2R5Lm1hc3MgKiB4O1xuICAgICAgICBub2RlLm1hc3NZID0gbm9kZS5tYXNzWSArIGJvZHkubWFzcyAqIHk7XG5cbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgaW5zZXJ0IHRoZSBib2R5IGluIHRoZSBhcHByb3ByaWF0ZSBxdWFkcmFudC5cbiAgICAgICAgLy8gQnV0IGZpcnN0IGZpbmQgdGhlIGFwcHJvcHJpYXRlIHF1YWRyYW50LlxuICAgICAgICBsZXQgcXVhZElkeCA9IDAsIC8vIEFzc3VtZSB3ZSBhcmUgaW4gdGhlIDAncyBxdWFkLlxuICAgICAgICAgIGxlZnQgPSBub2RlLmxlZnQsXG4gICAgICAgICAgcmlnaHQgPSAobm9kZS5yaWdodCArIGxlZnQpIC8gMixcbiAgICAgICAgICB0b3AgPSBub2RlLnRvcCxcbiAgICAgICAgICBib3R0b20gPSAobm9kZS5ib3R0b20gKyB0b3ApIC8gMjtcblxuICAgICAgICBpZiAoeCA+IHJpZ2h0KSB7IC8vIHNvbWV3aGVyZSBpbiB0aGUgZWFzdGVybiBwYXJ0LlxuICAgICAgICAgIHF1YWRJZHggPSBxdWFkSWR4ICsgMTtcbiAgICAgICAgICBsZWZ0ID0gcmlnaHQ7XG4gICAgICAgICAgcmlnaHQgPSBub2RlLnJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh5ID4gYm90dG9tKSB7IC8vIGFuZCBpbiBzb3V0aC5cbiAgICAgICAgICBxdWFkSWR4ID0gcXVhZElkeCArIDI7XG4gICAgICAgICAgdG9wID0gYm90dG9tO1xuICAgICAgICAgIGJvdHRvbSA9IG5vZGUuYm90dG9tO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNoaWxkID0gZ2V0Q2hpbGQobm9kZSwgcXVhZElkeCk7XG4gICAgICAgIGlmICghY2hpbGQpIHtcbiAgICAgICAgICAvLyBUaGUgbm9kZSBpcyBpbnRlcm5hbCBidXQgdGhpcyBxdWFkcmFudCBpcyBub3QgdGFrZW4uIEFkZFxuICAgICAgICAgIC8vIHN1Ym5vZGUgdG8gaXQuXG4gICAgICAgICAgY2hpbGQgPSBuZXdOb2RlKCk7XG4gICAgICAgICAgY2hpbGQubGVmdCA9IGxlZnQ7XG4gICAgICAgICAgY2hpbGQudG9wID0gdG9wO1xuICAgICAgICAgIGNoaWxkLnJpZ2h0ID0gcmlnaHQ7XG4gICAgICAgICAgY2hpbGQuYm90dG9tID0gYm90dG9tO1xuICAgICAgICAgIGNoaWxkLmJvZHkgPSBib2R5O1xuXG4gICAgICAgICAgc2V0Q2hpbGQobm9kZSwgcXVhZElkeCwgY2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGNvbnRpbnVlIHNlYXJjaGluZyBpbiB0aGlzIHF1YWRyYW50LlxuICAgICAgICAgIGluc2VydFN0YWNrLnB1c2goY2hpbGQsIGJvZHkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBhcmUgdHJ5aW5nIHRvIGFkZCB0byB0aGUgbGVhZiBub2RlLlxuICAgICAgICAvLyBXZSBoYXZlIHRvIGNvbnZlcnQgY3VycmVudCBsZWFmIGludG8gaW50ZXJuYWwgbm9kZVxuICAgICAgICAvLyBhbmQgY29udGludWUgYWRkaW5nIHR3byBub2Rlcy5cbiAgICAgICAgbGV0IG9sZEJvZHkgPSBub2RlLmJvZHk7XG4gICAgICAgIG5vZGUuYm9keSA9IG51bGw7IC8vIGludGVybmFsIG5vZGVzIGRvIG5vdCBjYXJ5IGJvZGllc1xuXG4gICAgICAgIGlmIChpc1NhbWVQb3NpdGlvbihvbGRCb2R5LnBvcywgYm9keS5wb3MpKSB7XG4gICAgICAgICAgLy8gUHJldmVudCBpbmZpbml0ZSBzdWJkaXZpc2lvbiBieSBidW1waW5nIG9uZSBub2RlXG4gICAgICAgICAgLy8gYW55d2hlcmUgaW4gdGhpcyBxdWFkcmFudFxuICAgICAgICAgIGxldCByZXRyaWVzQ291bnQgPSAzO1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICAgICAgbGV0IGR4ID0gKG5vZGUucmlnaHQgLSBub2RlLmxlZnQpICogb2Zmc2V0O1xuICAgICAgICAgICAgbGV0IGR5ID0gKG5vZGUuYm90dG9tIC0gbm9kZS50b3ApICogb2Zmc2V0O1xuXG4gICAgICAgICAgICBvbGRCb2R5LnBvcy54ID0gbm9kZS5sZWZ0ICsgZHg7XG4gICAgICAgICAgICBvbGRCb2R5LnBvcy55ID0gbm9kZS50b3AgKyBkeTtcbiAgICAgICAgICAgIHJldHJpZXNDb3VudCAtPSAxO1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGRvbid0IGJ1bXAgaXQgb3V0IG9mIHRoZSBib3guIElmIHdlIGRvLCBuZXh0IGl0ZXJhdGlvbiBzaG91bGQgZml4IGl0XG4gICAgICAgICAgfSB3aGlsZSAocmV0cmllc0NvdW50ID4gMCAmJiBpc1NhbWVQb3NpdGlvbihvbGRCb2R5LnBvcywgYm9keS5wb3MpKTtcblxuICAgICAgICAgIGlmIChyZXRyaWVzQ291bnQgPT09IDAgJiYgaXNTYW1lUG9zaXRpb24ob2xkQm9keS5wb3MsIGJvZHkucG9zKSkge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyB2ZXJ5IGJhZCwgd2UgcmFuIG91dCBvZiBwcmVjaXNpb24uXG4gICAgICAgICAgICAvLyBpZiB3ZSBkbyBub3QgcmV0dXJuIGZyb20gdGhlIG1ldGhvZCB3ZSdsbCBnZXQgaW50b1xuICAgICAgICAgICAgLy8gaW5maW5pdGUgbG9vcCBoZXJlLiBTbyB3ZSBzYWNyaWZpY2UgY29ycmVjdG5lc3Mgb2YgbGF5b3V0LCBhbmQga2VlcCB0aGUgYXBwIHJ1bm5pbmdcbiAgICAgICAgICAgIC8vIE5leHQgbGF5b3V0IGl0ZXJhdGlvbiBzaG91bGQgZ2V0IGxhcmdlciBib3VuZGluZyBib3ggaW4gdGhlIGZpcnN0IHN0ZXAgYW5kIGZpeCB0aGlzXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE5leHQgaXRlcmF0aW9uIHNob3VsZCBzdWJkaXZpZGUgbm9kZSBmdXJ0aGVyLlxuICAgICAgICBpbnNlcnRTdGFjay5wdXNoKG5vZGUsIG9sZEJvZHkpO1xuICAgICAgICBpbnNlcnRTdGFjay5wdXNoKG5vZGUsIGJvZHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5zZXJ0Qm9kaWVzOiBpbnNlcnRCb2RpZXMsXG4gICAgdXBkYXRlQm9keUZvcmNlOiB1cGRhdGVcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hpbGQobm9kZSwgaWR4KSB7XG4gIGlmIChpZHggPT09IDApIHJldHVybiBub2RlLnF1YWQwO1xuICBpZiAoaWR4ID09PSAxKSByZXR1cm4gbm9kZS5xdWFkMTtcbiAgaWYgKGlkeCA9PT0gMikgcmV0dXJuIG5vZGUucXVhZDI7XG4gIGlmIChpZHggPT09IDMpIHJldHVybiBub2RlLnF1YWQzO1xuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gc2V0Q2hpbGQobm9kZSwgaWR4LCBjaGlsZCkge1xuICBpZiAoaWR4ID09PSAwKSBub2RlLnF1YWQwID0gY2hpbGQ7XG4gIGVsc2UgaWYgKGlkeCA9PT0gMSkgbm9kZS5xdWFkMSA9IGNoaWxkO1xuICBlbHNlIGlmIChpZHggPT09IDIpIG5vZGUucXVhZDIgPSBjaGlsZDtcbiAgZWxzZSBpZiAoaWR4ID09PSAzKSBub2RlLnF1YWQzID0gY2hpbGQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBtYWtlUXVhZHRyZWUgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldWxlci9xdWFkdHJlZS9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gSW5zZXJ0U3RhY2s7XG5cbi8qKlxuICogT3VyIGltcGxtZW50YXRpb24gb2YgUXVhZFRyZWUgaXMgbm9uLXJlY3Vyc2l2ZSB0byBhdm9pZCBHQyBoaXRcbiAqIFRoaXMgZGF0YSBzdHJ1Y3R1cmUgcmVwcmVzZW50IHN0YWNrIG9mIGVsZW1lbnRzXG4gKiB3aGljaCB3ZSBhcmUgdHJ5aW5nIHRvIGluc2VydCBpbnRvIHF1YWQgdHJlZS5cbiAqL1xuZnVuY3Rpb24gSW5zZXJ0U3RhY2sgKCkge1xuICAgIHRoaXMuc3RhY2sgPSBbXTtcbiAgICB0aGlzLnBvcElkeCA9IDA7XG59XG5cbkluc2VydFN0YWNrLnByb3RvdHlwZSA9IHtcbiAgICBpc0VtcHR5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wSWR4ID09PSAwO1xuICAgIH0sXG4gICAgcHVzaDogZnVuY3Rpb24gKG5vZGUsIGJvZHkpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnN0YWNrW3RoaXMucG9wSWR4XTtcbiAgICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgICAgICAvLyB3ZSBhcmUgdHJ5aW5nIHRvIGF2b2lkIG1lbW9yeSBwcmVzc3VlOiBjcmVhdGUgbmV3IGVsZW1lbnRcbiAgICAgICAgICAgIC8vIG9ubHkgd2hlbiBhYnNvbHV0ZWx5IG5lY2Vzc2FyeVxuICAgICAgICAgICAgdGhpcy5zdGFja1t0aGlzLnBvcElkeF0gPSBuZXcgSW5zZXJ0U3RhY2tFbGVtZW50KG5vZGUsIGJvZHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5ub2RlID0gbm9kZTtcbiAgICAgICAgICAgIGl0ZW0uYm9keSA9IGJvZHk7XG4gICAgICAgIH1cbiAgICAgICAgKyt0aGlzLnBvcElkeDtcbiAgICB9LFxuICAgIHBvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5wb3BJZHggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGFja1stLXRoaXMucG9wSWR4XTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wb3BJZHggPSAwO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIEluc2VydFN0YWNrRWxlbWVudChub2RlLCBib2R5KSB7XG4gICAgdGhpcy5ub2RlID0gbm9kZTsgLy8gUXVhZFRyZWUgbm9kZVxuICAgIHRoaXMuYm9keSA9IGJvZHk7IC8vIHBoeXNpY2FsIGJvZHkgd2hpY2ggbmVlZHMgdG8gYmUgaW5zZXJ0ZWQgdG8gbm9kZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V1bGVyL3F1YWR0cmVlL2luc2VydFN0YWNrLmpzIiwiLyoqXG4gKiBJbnRlcm5hbCBkYXRhIHN0cnVjdHVyZSB0byByZXByZXNlbnQgMkQgUXVhZFRyZWUgbm9kZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIE5vZGUoKSB7XG4gIC8vIGJvZHkgc3RvcmVkIGluc2lkZSB0aGlzIG5vZGUuIEluIHF1YWQgdHJlZSBvbmx5IGxlYWYgbm9kZXMgKGJ5IGNvbnN0cnVjdGlvbilcbiAgLy8gY29udGFpbiBib2lkZXM6XG4gIHRoaXMuYm9keSA9IG51bGw7XG5cbiAgLy8gQ2hpbGQgbm9kZXMgYXJlIHN0b3JlZCBpbiBxdWFkcy4gRWFjaCBxdWFkIGlzIHByZXNlbnRlZCBieSBudW1iZXI6XG4gIC8vIDAgfCAxXG4gIC8vIC0tLS0tXG4gIC8vIDIgfCAzXG4gIHRoaXMucXVhZDAgPSBudWxsO1xuICB0aGlzLnF1YWQxID0gbnVsbDtcbiAgdGhpcy5xdWFkMiA9IG51bGw7XG4gIHRoaXMucXVhZDMgPSBudWxsO1xuXG4gIC8vIFRvdGFsIG1hc3Mgb2YgY3VycmVudCBub2RlXG4gIHRoaXMubWFzcyA9IDA7XG5cbiAgLy8gQ2VudGVyIG9mIG1hc3MgY29vcmRpbmF0ZXNcbiAgdGhpcy5tYXNzWCA9IDA7XG4gIHRoaXMubWFzc1kgPSAwO1xuXG4gIC8vIGJvdW5kaW5nIGJveCBjb29yZGluYXRlc1xuICB0aGlzLmxlZnQgPSAwO1xuICB0aGlzLnRvcCA9IDA7XG4gIHRoaXMuYm90dG9tID0gMDtcbiAgdGhpcy5yaWdodCA9IDA7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V1bGVyL3F1YWR0cmVlL25vZGUuanMiLCJjb25zdCB7IGludGVncmF0ZSB9ID0gcmVxdWlyZSgnLi9pbnRlZ3JhdGUnKTtcbmNvbnN0IHsgYXBwbHlEcmFnIH0gPSByZXF1aXJlKCcuL2RyYWcnKTtcbmNvbnN0IHsgYXBwbHlTcHJpbmcgfSA9IHJlcXVpcmUoJy4vc3ByaW5nJyk7XG5cbmZ1bmN0aW9uIHRpY2soeyBib2RpZXMsIHNwcmluZ3MsIHF1YWR0cmVlLCB0aW1lU3RlcCwgZ3Jhdml0eSwgdGhldGEsIGRyYWdDb2VmZiB9KXtcbiAgLy8gdXBkYXRlIGJvZHkgZnJvbSBzY3JhdGNoIGluIGNhc2Ugb2YgYW55IGNoYW5nZXNcbiAgYm9kaWVzLmZvckVhY2goIGJvZHkgPT4ge1xuICAgIGxldCBwID0gYm9keS5fc2NyYXRjaDtcblxuICAgIGlmKCAhcCApeyByZXR1cm47IH1cblxuICAgIGlmKCBwLmdyYWJiZWQgKXtcbiAgICAgIGNvbnNvbGUubG9nKCAnZ3JhYmJlZCcgKTtcbiAgICB9XG5cbiAgICBib2R5LmxvY2tlZCA9IHAubG9ja2VkO1xuICAgIGJvZHkuZ3JhYmJlZCA9IHAuZ3JhYmJlZDtcbiAgICBib2R5LnBvcy54ID0gcC54O1xuICAgIGJvZHkucG9zLnkgPSBwLnk7XG4gIH0gKTtcblxuICBxdWFkdHJlZS5pbnNlcnRCb2RpZXMoIGJvZGllcyApO1xuXG4gIGZvciggbGV0IGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrICl7XG4gICAgbGV0IGJvZHkgPSBib2RpZXNbaV07XG5cbiAgICBxdWFkdHJlZS51cGRhdGVCb2R5Rm9yY2UoIGJvZHksIGdyYXZpdHksIHRoZXRhICk7XG4gICAgYXBwbHlEcmFnKCBib2R5LCBkcmFnQ29lZmYgKTtcbiAgfVxuXG4gIGZvciggbGV0IGkgPSAwOyBpIDwgc3ByaW5ncy5sZW5ndGg7IGkrKyApe1xuICAgIGxldCBzcHJpbmcgPSBzcHJpbmdzW2ldO1xuXG4gICAgYXBwbHlTcHJpbmcoIHNwcmluZyApO1xuICB9XG5cbiAgbGV0IG1vdmVtZW50ID0gaW50ZWdyYXRlKCBib2RpZXMsIHRpbWVTdGVwICk7XG5cbiAgLy8gdXBkYXRlIHNjcmF0Y2ggcG9zaXRpb25zIGZyb20gYm9keSBwb3NpdGlvbnNcbiAgYm9kaWVzLmZvckVhY2goIGJvZHkgPT4ge1xuICAgIGxldCBwID0gYm9keS5fc2NyYXRjaDtcblxuICAgIGlmKCAhcCApeyByZXR1cm47IH1cblxuICAgIHAueCA9IGJvZHkucG9zLng7XG4gICAgcC55ID0gYm9keS5wb3MueTtcbiAgfSApO1xuXG4gIHJldHVybiBtb3ZlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IHRpY2sgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldWxlci90aWNrLmpzIiwiY29uc3QgRXVsZXIgPSByZXF1aXJlKCcuL2V1bGVyJyk7XG5cbi8vIHJlZ2lzdGVycyB0aGUgZXh0ZW5zaW9uIG9uIGEgY3l0b3NjYXBlIGxpYiByZWZcbmxldCByZWdpc3RlciA9IGZ1bmN0aW9uKCBjeXRvc2NhcGUgKXtcbiAgaWYoICFjeXRvc2NhcGUgKXsgcmV0dXJuOyB9IC8vIGNhbid0IHJlZ2lzdGVyIGlmIGN5dG9zY2FwZSB1bnNwZWNpZmllZFxuXG4gIGN5dG9zY2FwZSggJ2xheW91dCcsICdldWxlcicsIEV1bGVyICk7IC8vIHJlZ2lzdGVyIHdpdGggY3l0b3NjYXBlLmpzXG59O1xuXG5pZiggdHlwZW9mIGN5dG9zY2FwZSAhPT0gJ3VuZGVmaW5lZCcgKXsgLy8gZXhwb3NlIHRvIGdsb2JhbCBjeXRvc2NhcGUgKGkuZS4gd2luZG93LmN5dG9zY2FwZSlcbiAgcmVnaXN0ZXIoIGN5dG9zY2FwZSApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiLy8gZ2VuZXJhbCBkZWZhdWx0IG9wdGlvbnMgZm9yIGZvcmNlLWRpcmVjdGVkIGxheW91dFxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICBhbmltYXRlOiB0cnVlLCAvLyB3aGV0aGVyIHRvIHNob3cgdGhlIGxheW91dCBhcyBpdCdzIHJ1bm5pbmc7IHNwZWNpYWwgJ2VuZCcgdmFsdWUgbWFrZXMgdGhlIGxheW91dCBhbmltYXRlIGxpa2UgYSBkaXNjcmV0ZSBsYXlvdXRcbiAgcmVmcmVzaDogMTAsIC8vIG51bWJlciBvZiB0aWNrcyBwZXIgZnJhbWU7IGhpZ2hlciBpcyBmYXN0ZXIgYnV0IG1vcmUgamVya3lcbiAgbWF4SXRlcmF0aW9uczogMTAwMCwgLy8gbWF4IGl0ZXJhdGlvbnMgYmVmb3JlIHRoZSBsYXlvdXQgd2lsbCBiYWlsIG91dFxuICBtYXhTaW11bGF0aW9uVGltZTogNDAwMCwgLy8gbWF4IGxlbmd0aCBpbiBtcyB0byBydW4gdGhlIGxheW91dFxuICB1bmdyYWJpZnlXaGlsZVNpbXVsYXRpbmc6IGZhbHNlLCAvLyBzbyB5b3UgY2FuJ3QgZHJhZyBub2RlcyBkdXJpbmcgbGF5b3V0XG4gIGZpdDogdHJ1ZSwgLy8gb24gZXZlcnkgbGF5b3V0IHJlcG9zaXRpb24gb2Ygbm9kZXMsIGZpdCB0aGUgdmlld3BvcnRcbiAgcGFkZGluZzogMzAsIC8vIHBhZGRpbmcgYXJvdW5kIHRoZSBzaW11bGF0aW9uXG4gIGJvdW5kaW5nQm94OiB1bmRlZmluZWQsIC8vIGNvbnN0cmFpbiBsYXlvdXQgYm91bmRzOyB7IHgxLCB5MSwgeDIsIHkyIH0gb3IgeyB4MSwgeTEsIHcsIGggfVxuXG4gIC8vIGxheW91dCBldmVudCBjYWxsYmFja3NcbiAgcmVhZHk6IGZ1bmN0aW9uKCl7fSwgLy8gb24gbGF5b3V0cmVhZHlcbiAgc3RvcDogZnVuY3Rpb24oKXt9LCAvLyBvbiBsYXlvdXRzdG9wXG5cbiAgLy8gcG9zaXRpb25pbmcgb3B0aW9uc1xuICByYW5kb21pemU6IGZhbHNlLCAvLyB1c2UgcmFuZG9tIG5vZGUgcG9zaXRpb25zIGF0IGJlZ2lubmluZyBvZiBsYXlvdXRcbiAgXG4gIC8vIGluZmluaXRlIGxheW91dCBvcHRpb25zXG4gIGluZmluaXRlOiBmYWxzZSAvLyBvdmVycmlkZXMgYWxsIG90aGVyIG9wdGlvbnMgZm9yIGEgZm9yY2VzLWFsbC10aGUtdGltZSBtb2RlXG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXlvdXQvZGVmYXVsdHMuanMiLCIvKipcbkEgZ2VuZXJpYyBjb250aW51b3VzIGxheW91dCBjbGFzc1xuKi9cblxuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi4vYXNzaWduJyk7XG5jb25zdCBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcbmNvbnN0IG1ha2VCb3VuZGluZ0JveCA9IHJlcXVpcmUoJy4vbWFrZS1iYicpO1xuY29uc3QgeyBzZXRJbml0aWFsUG9zaXRpb25TdGF0ZSwgcmVmcmVzaFBvc2l0aW9ucywgZ2V0Tm9kZVBvc2l0aW9uRGF0YSB9ID0gcmVxdWlyZSgnLi9wb3NpdGlvbicpO1xuY29uc3QgeyBtdWx0aXRpY2sgfSA9IHJlcXVpcmUoJy4vdGljaycpO1xuXG5jbGFzcyBMYXlvdXQge1xuICBjb25zdHJ1Y3Rvciggb3B0aW9ucyApe1xuICAgIGxldCBvID0gdGhpcy5vcHRpb25zID0gYXNzaWduKCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMgKTtcblxuICAgIGxldCBzID0gdGhpcy5zdGF0ZSA9IGFzc2lnbigge30sIG8sIHtcbiAgICAgIGxheW91dDogdGhpcyxcbiAgICAgIG5vZGVzOiBvLmVsZXMubm9kZXMoKSxcbiAgICAgIGVkZ2VzOiBvLmVsZXMuZWRnZXMoKSxcbiAgICAgIHRpY2tJbmRleDogMCxcbiAgICAgIGZpcnN0VXBkYXRlOiB0cnVlXG4gICAgfSApO1xuXG4gICAgcy5hbmltYXRlRW5kID0gby5hbmltYXRlICYmIG8uYW5pbWF0ZSA9PT0gJ2VuZCc7XG4gICAgcy5hbmltYXRlQ29udGludW91c2x5ID0gby5hbmltYXRlICYmICFzLmFuaW1hdGVFbmQ7XG4gIH1cblxuICBydW4oKXtcbiAgICBsZXQgbCA9IHRoaXM7XG4gICAgbGV0IHMgPSB0aGlzLnN0YXRlO1xuXG4gICAgcy50aWNrSW5kZXggPSAwO1xuICAgIHMuZmlyc3RVcGRhdGUgPSB0cnVlO1xuXG4gICAgcy5ydW5uaW5nID0gdHJ1ZTtcblxuICAgIHMuY3VycmVudEJvdW5kaW5nQm94ID0gbWFrZUJvdW5kaW5nQm94KCBzLmJvdW5kaW5nQm94LCBzLmN5ICk7XG5cbiAgICBpZiggcy5yZWFkeSApeyBsLm9uZSggJ3JlYWR5Jywgcy5yZWFkeSApOyB9XG4gICAgaWYoIHMuc3RvcCApeyBsLm9uZSggJ3N0b3AnLCBzLnN0b3AgKTsgfVxuXG4gICAgcy5ub2Rlcy5mb3JFYWNoKCBuID0+IHNldEluaXRpYWxQb3NpdGlvblN0YXRlKCBuLCBzICkgKTtcblxuICAgIGwucHJlcnVuKCBzICk7XG5cbiAgICBpZiggcy5hbmltYXRlQ29udGludW91c2x5ICl7XG4gICAgICBsZXQgdW5ncmFiaWZ5ID0gbm9kZSA9PiB7XG4gICAgICAgIGlmKCAhcy51bmdyYWJpZnlXaGlsZVNpbXVsYXRpbmcgKXsgcmV0dXJuOyB9XG5cbiAgICAgICAgbGV0IGdyYWJiYWJsZSA9IGdldE5vZGVQb3NpdGlvbkRhdGEoIG5vZGUsIHMgKS5ncmFiYmFibGUgPSBub2RlLmdyYWJiYWJsZSgpO1xuXG4gICAgICAgIGlmKCBncmFiYmFibGUgKXtcbiAgICAgICAgICBub2RlLnVuZ3JhYmlmeSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBsZXQgcmVncmFiaWZ5ID0gbm9kZSA9PiB7XG4gICAgICAgIGlmKCAhcy51bmdyYWJpZnlXaGlsZVNpbXVsYXRpbmcgKXsgcmV0dXJuOyB9XG5cbiAgICAgICAgbGV0IGdyYWJiYWJsZSA9IGdldE5vZGVQb3NpdGlvbkRhdGEoIG5vZGUsIHMgKS5ncmFiYmFibGU7XG5cbiAgICAgICAgaWYoIGdyYWJiYWJsZSApe1xuICAgICAgICAgIG5vZGUuZ3JhYmlmeSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBsZXQgdXBkYXRlR3JhYlN0YXRlID0gbm9kZSA9PiBnZXROb2RlUG9zaXRpb25EYXRhKCBub2RlLCBzICkuZ3JhYmJlZCA9IG5vZGUuZ3JhYmJlZCgpO1xuXG4gICAgICBsZXQgb25HcmFiID0gZnVuY3Rpb24oeyB0YXJnZXQgfSl7XG4gICAgICAgIHVwZGF0ZUdyYWJTdGF0ZSggdGFyZ2V0ICk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgb25GcmVlID0gb25HcmFiO1xuXG4gICAgICBsZXQgb25EcmFnID0gZnVuY3Rpb24oeyB0YXJnZXQgfSl7XG4gICAgICAgIGxldCBwID0gZ2V0Tm9kZVBvc2l0aW9uRGF0YSggdGFyZ2V0LCBzICk7XG4gICAgICAgIGxldCB0cCA9IHRhcmdldC5wb3NpdGlvbigpO1xuXG4gICAgICAgIHAueCA9IHRwLng7XG4gICAgICAgIHAueSA9IHRwLnk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgbGlzdGVuVG9HcmFiID0gbm9kZSA9PiB7XG4gICAgICAgIG5vZGUub24oJ2dyYWInLCBvbkdyYWIpO1xuICAgICAgICBub2RlLm9uKCdmcmVlJywgb25GcmVlKTtcbiAgICAgICAgbm9kZS5vbignZHJhZycsIG9uRHJhZyk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgdW5saXN0ZW5Ub0dyYWIgPSBub2RlID0+IHtcbiAgICAgICAgbm9kZS5yZW1vdmVMaXN0ZW5lcignZ3JhYicsIG9uR3JhYik7XG4gICAgICAgIG5vZGUucmVtb3ZlTGlzdGVuZXIoJ2ZyZWUnLCBvbkZyZWUpO1xuICAgICAgICBub2RlLnJlbW92ZUxpc3RlbmVyKCdkcmFnJywgb25EcmFnKTtcbiAgICAgIH07XG5cbiAgICAgIGxldCBmaXQgPSAoKSA9PiB7XG4gICAgICAgIGlmKCBzLmZpdCAmJiBzLmFuaW1hdGVDb250aW51b3VzbHkgKXtcbiAgICAgICAgICBzLmN5LmZpdCggcy5wYWRkaW5nICk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGxldCBvbk5vdERvbmUgPSAoKSA9PiB7XG4gICAgICAgIHJlZnJlc2hQb3NpdGlvbnMoIHMubm9kZXMsIHMgKTtcbiAgICAgICAgZml0KCk7XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmcmFtZSApO1xuICAgICAgfTtcblxuICAgICAgbGV0IGZyYW1lID0gZnVuY3Rpb24oKXtcbiAgICAgICAgbXVsdGl0aWNrKCBzLCBvbk5vdERvbmUsIG9uRG9uZSApO1xuICAgICAgfTtcblxuICAgICAgbGV0IG9uRG9uZSA9ICgpID0+IHtcbiAgICAgICAgcmVmcmVzaFBvc2l0aW9ucyggcy5ub2RlcywgcyApO1xuICAgICAgICBmaXQoKTtcblxuICAgICAgICBzLm5vZGVzLmZvckVhY2goIG4gPT4ge1xuICAgICAgICAgIHJlZ3JhYmlmeSggbiApO1xuICAgICAgICAgIHVubGlzdGVuVG9HcmFiKCBuICk7XG4gICAgICAgIH0gKTtcblxuICAgICAgICBzLnJ1bm5pbmcgPSBmYWxzZTtcblxuICAgICAgICBsLmVtaXQoJ2xheW91dHN0b3AnKTtcbiAgICAgIH07XG5cbiAgICAgIHMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcblxuICAgICAgbC5lbWl0KCdsYXlvdXRzdGFydCcpO1xuXG4gICAgICBzLm5vZGVzLmZvckVhY2goIG4gPT4ge1xuICAgICAgICB1bmdyYWJpZnkoIG4gKTtcbiAgICAgICAgbGlzdGVuVG9HcmFiKCBuICk7XG4gICAgICB9ICk7XG5cbiAgICAgIGZyYW1lKCk7IC8vIGtpY2sgb2ZmXG4gICAgfSBlbHNlIHtcbiAgICAgIG11bHRpdGljayggcyApO1xuXG4gICAgICBzLmVsZXMubGF5b3V0UG9zaXRpb25zKCB0aGlzLCBzLCBub2RlID0+IGdldE5vZGVQb3NpdGlvbkRhdGEoIG5vZGUsIHMgKSApO1xuICAgIH1cblxuICAgIGwucG9zdHJ1biggcyApO1xuXG4gICAgcmV0dXJuIHRoaXM7IC8vIGNoYWluaW5nXG4gIH1cblxuICBwcmVydW4oKXt9XG4gIHBvc3RydW4oKXt9XG4gIHRpY2soKXt9XG5cbiAgc3RvcCgpe1xuICAgIHRoaXMuc3RhdGUucnVubmluZyA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIHRoaXM7IC8vIGNoYWluaW5nXG4gIH1cblxuICBkZXN0cm95KCl7XG4gICAgcmV0dXJuIHRoaXM7IC8vIGNoYWluaW5nXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMYXlvdXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGF5b3V0L2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiggYmIsIGN5ICl7XG4gIGlmKCBiYiA9PSBudWxsICl7XG4gICAgYmIgPSB7IHgxOiAwLCB5MTogMCwgdzogY3kud2lkdGgoKSwgaDogY3kuaGVpZ2h0KCkgfTtcbiAgfSBlbHNlIHsgLy8gY29weVxuICAgIGJiID0geyB4MTogYmIueDEsIHgyOiBiYi54MiwgeTE6IGJiLnkxLCB5MjogYmIueTIsIHc6IGJiLncsIGg6IGJiLmggfTtcbiAgfVxuXG4gIGlmKCBiYi54MiA9PSBudWxsICl7IGJiLngyID0gYmIueDEgKyBiYi53OyB9XG4gIGlmKCBiYi53ID09IG51bGwgKXsgYmIudyA9IGJiLngyIC0gYmIueDE7IH1cbiAgaWYoIGJiLnkyID09IG51bGwgKXsgYmIueTIgPSBiYi55MSArIGJiLmg7IH1cbiAgaWYoIGJiLmggPT0gbnVsbCApeyBiYi5oID0gYmIueTIgLSBiYi55MTsgfVxuXG4gIHJldHVybiBiYjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGF5b3V0L21ha2UtYmIuanMiLCJjb25zdCBhc3NpZ24gPSByZXF1aXJlKCcuLi9hc3NpZ24nKTtcblxubGV0IHNldEluaXRpYWxQb3NpdGlvblN0YXRlID0gZnVuY3Rpb24oIG5vZGUsIHN0YXRlICl7XG4gIGxldCBwID0gbm9kZS5wb3NpdGlvbigpO1xuICBsZXQgYmIgPSBzdGF0ZS5jdXJyZW50Qm91bmRpbmdCb3g7XG4gIGxldCBzY3JhdGNoID0gbm9kZS5zY3JhdGNoKCBzdGF0ZS5uYW1lICk7XG5cbiAgaWYoIHNjcmF0Y2ggPT0gbnVsbCApe1xuICAgIHNjcmF0Y2ggPSB7fTtcblxuICAgIG5vZGUuc2NyYXRjaCggc3RhdGUubmFtZSwgc2NyYXRjaCApO1xuICB9XG5cbiAgYXNzaWduKCBzY3JhdGNoLCBzdGF0ZS5yYW5kb21pemUgPyB7XG4gICAgeDogYmIueDEgKyBNYXRoLnJvdW5kKCBNYXRoLnJhbmRvbSgpICogYmIudyApLFxuICAgIHk6IGJiLnkxICsgTWF0aC5yb3VuZCggTWF0aC5yYW5kb20oKSAqIGJiLmggKVxuICB9IDoge1xuICAgIHg6IHAueCxcbiAgICB5OiBwLnlcbiAgfSApO1xuXG4gIHNjcmF0Y2gubG9ja2VkID0gbm9kZS5sb2NrZWQoKTtcbn07XG5cbmxldCBnZXROb2RlUG9zaXRpb25EYXRhID0gZnVuY3Rpb24oIG5vZGUsIHN0YXRlICl7XG4gIHJldHVybiBub2RlLnNjcmF0Y2goIHN0YXRlLm5hbWUgKTtcbn07XG5cbmxldCByZWZyZXNoUG9zaXRpb25zID0gZnVuY3Rpb24oIG5vZGVzLCBzdGF0ZSApe1xuICBub2Rlcy5wb3NpdGlvbnMoZnVuY3Rpb24oIG5vZGUgKXtcbiAgICBsZXQgc2NyYXRjaCA9IG5vZGUuc2NyYXRjaCggc3RhdGUubmFtZSApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHNjcmF0Y2gueCxcbiAgICAgIHk6IHNjcmF0Y2gueVxuICAgIH07XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHNldEluaXRpYWxQb3NpdGlvblN0YXRlLCBnZXROb2RlUG9zaXRpb25EYXRhLCByZWZyZXNoUG9zaXRpb25zIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGF5b3V0L3Bvc2l0aW9uLmpzIiwiY29uc3Qgbm9wID0gZnVuY3Rpb24oKXt9O1xuXG5sZXQgdGljayA9IGZ1bmN0aW9uKCBzdGF0ZSApe1xuICBsZXQgcyA9IHN0YXRlO1xuICBsZXQgbCA9IHN0YXRlLmxheW91dDtcblxuICBsZXQgdGlja0luZGljYXRlc0RvbmUgPSBsLnRpY2soIHMgKTtcblxuICBpZiggcy5maXJzdFVwZGF0ZSApe1xuICAgIGlmKCBzLmFuaW1hdGVDb250aW51b3VzbHkgKXsgLy8gaW5kaWNhdGUgdGhlIGluaXRpYWwgcG9zaXRpb25zIGhhdmUgYmVlbiBzZXRcbiAgICAgIHMubGF5b3V0LmVtaXQoJ2xheW91dHJlYWR5Jyk7XG4gICAgfVxuICAgIHMuZmlyc3RVcGRhdGUgPSBmYWxzZTtcbiAgfVxuXG4gIHMudGlja0luZGV4Kys7XG5cbiAgbGV0IGR1cmF0aW9uID0gcy5zdGFydFRpbWUgLSBEYXRlLm5vdygpO1xuXG4gIHJldHVybiAhcy5pbmZpbml0ZSAmJiAoIHRpY2tJbmRpY2F0ZXNEb25lIHx8IHMudGlja0luZGV4ID49IHMubWF4SXRlcmF0aW9ucyB8fCBkdXJhdGlvbiA+PSBzLm1heFNpbXVsYXRpb25UaW1lICk7XG59O1xuXG5sZXQgbXVsdGl0aWNrID0gZnVuY3Rpb24oIHN0YXRlLCBvbk5vdERvbmUgPSBub3AsIG9uRG9uZSA9IG5vcCApe1xuICBsZXQgZG9uZSA9IGZhbHNlO1xuICBsZXQgcyA9IHN0YXRlO1xuXG4gIGZvciggbGV0IGkgPSAwOyBpIDwgcy5tYXhJdGVyYXRpb25zOyBpKysgKXtcbiAgICBkb25lID0gIXMucnVubmluZyB8fCB0aWNrKCBzICk7XG5cbiAgICBpZiggZG9uZSApeyBicmVhazsgfVxuICB9XG5cbiAgaWYoICFkb25lICl7XG4gICAgb25Ob3REb25lKCk7XG4gIH0gZWxzZSB7XG4gICAgb25Eb25lKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyB0aWNrLCBtdWx0aXRpY2sgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXlvdXQvdGljay5qcyJdLCJzb3VyY2VSb290IjoiIn0=