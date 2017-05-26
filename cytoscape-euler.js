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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setInitialNodePosition = function setInitialNodePosition(node, options) {
  var p = node.position();
  var bb = options.currentBoundingBox;

  node.scratch('euler', options.randomize ? {
    x: bb.x + Math.round(Math.random() * bb.w),
    y: bb.y + Math.round(Math.random() * bb.h)
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assign = __webpack_require__(7);
var defaults = __webpack_require__(3);
var makeBoundingBox = __webpack_require__(5);

var _require = __webpack_require__(0),
    setInitialNodePosition = _require.setInitialNodePosition,
    refreshPositions = _require.refreshPositions,
    getNodePosition = _require.getNodePosition;

var _require2 = __webpack_require__(6),
    multitick = _require2.multitick;

var Layout = function () {
  function Layout(options) {
    _classCallCheck(this, Layout);

    var o = this.options = assign({}, defaults, options);

    assign(o, {
      nodes: o.eles.nodes(),
      animateEnd: o.animate && o.animate !== 'end',
      animateContinuously: o.animate && !o.animateEnd,
      tickIndex: 0,
      firstUpdate: true
    });
  }

  _createClass(Layout, [{
    key: 'run',
    value: function run() {
      var l = this;
      var o = this.options;

      o.tickIndex = 0;
      o.firstUpdate = true;

      l.running = true;

      o.currentBoundingBox = makeBoundingBox(o.boundingBox, o.cy);

      if (o.ready) {
        l.one('ready', o.ready);
      }
      if (o.stop) {
        l.one('stop', o.stop);
      }

      o.nodes.forEach(function (n) {
        return setInitialNodePosition(n, o);
      });

      if (o.animateContinuously) {
        var onNotDone = function onNotDone() {
          refreshPositions(o.nodes);

          requestAnimationFrame(_frame);
        };

        var _frame = function _frame() {
          multitick(o, onNotDone, _onDone);
        };

        var _onDone = function _onDone() {
          l.running = false;

          l.emit('layoutstop');
        };

        l.emit('layoutstart');

        _frame(); // kick off
      } else {
        multitick(o);

        o.eles.layoutPositions(this, o, getNodePosition);
      }

      return this; // chaining
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.options.running = false;

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// TODO apply forces to this node
var tickNode = function tickNode(options, p) {
  p.x = Math.random() * 100;
  p.y = Math.random() * 100;
};

module.exports = { tickNode: tickNode };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

  // TODO other options

  // infinite layout options
  infinite: false // overrides all other options for a forces-all-the-time mode
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Layout = __webpack_require__(1);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  cytoscape('layout', 'euler', Layout); // register with cytoscape.js
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape);
}

module.exports = register;

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(2),
    tickNode = _require.tickNode;

var _require2 = __webpack_require__(0),
    getNodePositionData = _require2.getNodePositionData;

var tick = function tick(options) {
  var o = options;

  if (o.tickIndex >= o.maxIterations) {
    return true;
  }

  o.preTick(options);

  o.nodes.forEach(function (node) {
    return tickNode(options, getNodePositionData(node));
  });

  o.postTick(options);

  if (o.firstUpdate) {
    if (o.animateContinuously) {
      // indicate the initial positions have been set
      o.layout.emit('layoutready');
    }
    o.firstUpdate = false;
  }

  o.tickIndex++;
};

var multitick = function multitick(options, onNotDone, onDone) {
  var done = false;
  var o = options;

  for (var i = 0; i < o.maxIterations; i++) {
    done = !o.running || tick(options);

    if (done) {
      break;
    }
  }

  if (o.fit && o.animateContinuously) {
    o.cy.fit(o.padding);
  }

  if (!done) {
    if (onNotDone != null) {
      onNotDone();
    }
  } else {
    if (onDone != null) {
      onDone();
    }
  }
};

module.exports = { tick: tick, tickNode: tickNode, multitick: multitick };

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmM2UwMzEwMWQyMjM4MTFmZjcwOSIsIndlYnBhY2s6Ly8vLi9zcmMvcG9zaXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWxnb3JpdGhtLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21ha2UtYmIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpY2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9vYmplY3QtYXNzaWduL2luZGV4LmpzIl0sIm5hbWVzIjpbInNldEluaXRpYWxOb2RlUG9zaXRpb24iLCJub2RlIiwib3B0aW9ucyIsInAiLCJwb3NpdGlvbiIsImJiIiwiY3VycmVudEJvdW5kaW5nQm94Iiwic2NyYXRjaCIsInJhbmRvbWl6ZSIsIngiLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJ3IiwieSIsImgiLCJnZXROb2RlUG9zaXRpb25EYXRhIiwicmVmcmVzaFBvc2l0aW9ucyIsIm5vZGVzIiwicG9zaXRpb25zIiwibW9kdWxlIiwiZXhwb3J0cyIsImFzc2lnbiIsInJlcXVpcmUiLCJkZWZhdWx0cyIsIm1ha2VCb3VuZGluZ0JveCIsImdldE5vZGVQb3NpdGlvbiIsIm11bHRpdGljayIsIkxheW91dCIsIm8iLCJlbGVzIiwiYW5pbWF0ZUVuZCIsImFuaW1hdGUiLCJhbmltYXRlQ29udGludW91c2x5IiwidGlja0luZGV4IiwiZmlyc3RVcGRhdGUiLCJsIiwicnVubmluZyIsImJvdW5kaW5nQm94IiwiY3kiLCJyZWFkeSIsIm9uZSIsInN0b3AiLCJmb3JFYWNoIiwibiIsIm9uTm90RG9uZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZyYW1lIiwib25Eb25lIiwiZW1pdCIsImxheW91dFBvc2l0aW9ucyIsInRpY2tOb2RlIiwiT2JqZWN0IiwiZnJlZXplIiwicmVmcmVzaCIsIm1heEl0ZXJhdGlvbnMiLCJtYXhTaW11bGF0aW9uVGltZSIsInVuZ3JhYmlmeVdoaWxlU2ltdWxhdGluZyIsImZpdCIsInBhZGRpbmciLCJ1bmRlZmluZWQiLCJpbmZpbml0ZSIsInJlZ2lzdGVyIiwiY3l0b3NjYXBlIiwieDEiLCJ5MSIsIndpZHRoIiwiaGVpZ2h0IiwieDIiLCJ5MiIsInRpY2siLCJwcmVUaWNrIiwicG9zdFRpY2siLCJsYXlvdXQiLCJkb25lIiwiaSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ2hFQSxJQUFJQSx5QkFBeUIsU0FBekJBLHNCQUF5QixDQUFVQyxJQUFWLEVBQWdCQyxPQUFoQixFQUF5QjtBQUNwRCxNQUFJQyxJQUFJRixLQUFLRyxRQUFMLEVBQVI7QUFDQSxNQUFJQyxLQUFLSCxRQUFRSSxrQkFBakI7O0FBRUFMLE9BQUtNLE9BQUwsQ0FBYSxPQUFiLEVBQXNCTCxRQUFRTSxTQUFSLEdBQW9CO0FBQ3hDQyxPQUFHSixHQUFHSSxDQUFILEdBQU9DLEtB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QTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLHNCQUFzQjtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0Isb0JBQW9CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImN5dG9zY2FwZS1ldWxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImN5dG9zY2FwZUV1bGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN5dG9zY2FwZUV1bGVyXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZjNlMDMxMDFkMjIzODExZmY3MDkiLCJsZXQgc2V0SW5pdGlhbE5vZGVQb3NpdGlvbiA9IGZ1bmN0aW9uKCBub2RlLCBvcHRpb25zICl7XG4gIGxldCBwID0gbm9kZS5wb3NpdGlvbigpO1xuICBsZXQgYmIgPSBvcHRpb25zLmN1cnJlbnRCb3VuZGluZ0JveDtcblxuICBub2RlLnNjcmF0Y2goJ2V1bGVyJywgb3B0aW9ucy5yYW5kb21pemUgPyB7XG4gICAgeDogYmIueCArIE1hdGgucm91bmQoIE1hdGgucmFuZG9tKCkgKiBiYi53ICksXG4gICAgeTogYmIueSArIE1hdGgucm91bmQoIE1hdGgucmFuZG9tKCkgKiBiYi5oIClcbiAgfSA6IHtcbiAgICB4OiBwLngsXG4gICAgeTogcC55XG4gIH0pO1xufTtcblxubGV0IGdldE5vZGVQb3NpdGlvbkRhdGEgPSBmdW5jdGlvbiggbm9kZSApe1xuICByZXR1cm4gbm9kZS5zY3JhdGNoKCdldWxlcicpO1xufTtcblxubGV0IHJlZnJlc2hQb3NpdGlvbnMgPSBmdW5jdGlvbiggbm9kZXMgKXtcbiAgbm9kZXMucG9zaXRpb25zKGZ1bmN0aW9uKCBub2RlICl7XG4gICAgbGV0IHNjcmF0Y2ggPSBub2RlLnNjcmF0Y2goJ2V1bGVyJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogc2NyYXRjaC54LFxuICAgICAgeTogc2NyYXRjaC55XG4gICAgfTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgc2V0SW5pdGlhbE5vZGVQb3NpdGlvbiwgZ2V0Tm9kZVBvc2l0aW9uRGF0YSwgcmVmcmVzaFBvc2l0aW9ucyB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Bvc2l0aW9uLmpzIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuY29uc3QgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5jb25zdCBtYWtlQm91bmRpbmdCb3ggPSByZXF1aXJlKCcuL21ha2UtYmInKTtcbmNvbnN0IHsgc2V0SW5pdGlhbE5vZGVQb3NpdGlvbiwgcmVmcmVzaFBvc2l0aW9ucywgZ2V0Tm9kZVBvc2l0aW9uIH0gPSByZXF1aXJlKCcuL3Bvc2l0aW9uJyk7XG5jb25zdCB7IG11bHRpdGljayB9ID0gcmVxdWlyZSgnLi90aWNrJyk7XG5cbmNsYXNzIExheW91dCB7XG4gIGNvbnN0cnVjdG9yKCBvcHRpb25zICl7XG4gICAgbGV0IG8gPSB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApO1xuXG4gICAgYXNzaWduKCBvLCB7XG4gICAgICBub2Rlczogby5lbGVzLm5vZGVzKCksXG4gICAgICBhbmltYXRlRW5kOiBvLmFuaW1hdGUgJiYgby5hbmltYXRlICE9PSAnZW5kJyxcbiAgICAgIGFuaW1hdGVDb250aW51b3VzbHk6IG8uYW5pbWF0ZSAmJiAhby5hbmltYXRlRW5kLFxuICAgICAgdGlja0luZGV4OiAwLFxuICAgICAgZmlyc3RVcGRhdGU6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bigpe1xuICAgIGxldCBsID0gdGhpcztcbiAgICBsZXQgbyA9IHRoaXMub3B0aW9ucztcblxuICAgIG8udGlja0luZGV4ID0gMDtcbiAgICBvLmZpcnN0VXBkYXRlID0gdHJ1ZTtcblxuICAgIGwucnVubmluZyA9IHRydWU7XG5cbiAgICBvLmN1cnJlbnRCb3VuZGluZ0JveCA9IG1ha2VCb3VuZGluZ0JveCggby5ib3VuZGluZ0JveCwgby5jeSApO1xuXG4gICAgaWYoIG8ucmVhZHkgKXsgbC5vbmUoICdyZWFkeScsIG8ucmVhZHkgKTsgfVxuICAgIGlmKCBvLnN0b3AgKXsgbC5vbmUoICdzdG9wJywgby5zdG9wICk7IH1cblxuICAgIG8ubm9kZXMuZm9yRWFjaCggbiA9PiBzZXRJbml0aWFsTm9kZVBvc2l0aW9uKCBuLCBvICkgKTtcblxuICAgIGlmKCBvLmFuaW1hdGVDb250aW51b3VzbHkgKXtcbiAgICAgIGxldCBvbk5vdERvbmUgPSAoKSA9PiB7XG4gICAgICAgIHJlZnJlc2hQb3NpdGlvbnMoIG8ubm9kZXMgKTtcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGZyYW1lICk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgZnJhbWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBtdWx0aXRpY2soIG8sIG9uTm90RG9uZSwgb25Eb25lICk7XG4gICAgICB9O1xuXG4gICAgICBsZXQgb25Eb25lID0gKCkgPT4ge1xuICAgICAgICBsLnJ1bm5pbmcgPSBmYWxzZTtcblxuICAgICAgICBsLmVtaXQoJ2xheW91dHN0b3AnKTtcbiAgICAgIH07XG5cbiAgICAgIGwuZW1pdCgnbGF5b3V0c3RhcnQnKTtcblxuICAgICAgZnJhbWUoKTsgLy8ga2ljayBvZmZcbiAgICB9IGVsc2Uge1xuICAgICAgbXVsdGl0aWNrKCBvICk7XG5cbiAgICAgIG8uZWxlcy5sYXlvdXRQb3NpdGlvbnMoIHRoaXMsIG8sIGdldE5vZGVQb3NpdGlvbiApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzOyAvLyBjaGFpbmluZ1xuICB9XG5cbiAgc3RvcCgpe1xuICAgIHRoaXMub3B0aW9ucy5ydW5uaW5nID0gZmFsc2U7XG5cbiAgICByZXR1cm4gdGhpczsgLy8gY2hhaW5pbmdcbiAgfVxuXG4gIGRlc3Ryb3koKXtcbiAgICByZXR1cm4gdGhpczsgLy8gY2hhaW5pbmdcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExheW91dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXlvdXQuanMiLCIvLyBUT0RPIGFwcGx5IGZvcmNlcyB0byB0aGlzIG5vZGVcbmxldCB0aWNrTm9kZSA9IGZ1bmN0aW9uKCBvcHRpb25zLCBwICl7XG4gIHAueCA9IE1hdGgucmFuZG9tKCkgKiAxMDA7XG4gIHAueSA9IE1hdGgucmFuZG9tKCkgKiAxMDA7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgdGlja05vZGUgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hbGdvcml0aG0uanMiLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICBhbmltYXRlOiB0cnVlLCAvLyB3aGV0aGVyIHRvIHNob3cgdGhlIGxheW91dCBhcyBpdCdzIHJ1bm5pbmc7IHNwZWNpYWwgJ2VuZCcgdmFsdWUgbWFrZXMgdGhlIGxheW91dCBhbmltYXRlIGxpa2UgYSBkaXNjcmV0ZSBsYXlvdXRcbiAgcmVmcmVzaDogMTAsIC8vIG51bWJlciBvZiB0aWNrcyBwZXIgZnJhbWU7IGhpZ2hlciBpcyBmYXN0ZXIgYnV0IG1vcmUgamVya3lcbiAgbWF4SXRlcmF0aW9uczogMTAwMCwgLy8gbWF4IGl0ZXJhdGlvbnMgYmVmb3JlIHRoZSBsYXlvdXQgd2lsbCBiYWlsIG91dFxuICBtYXhTaW11bGF0aW9uVGltZTogNDAwMCwgLy8gbWF4IGxlbmd0aCBpbiBtcyB0byBydW4gdGhlIGxheW91dFxuICB1bmdyYWJpZnlXaGlsZVNpbXVsYXRpbmc6IGZhbHNlLCAvLyBzbyB5b3UgY2FuJ3QgZHJhZyBub2RlcyBkdXJpbmcgbGF5b3V0XG4gIGZpdDogdHJ1ZSwgLy8gb24gZXZlcnkgbGF5b3V0IHJlcG9zaXRpb24gb2Ygbm9kZXMsIGZpdCB0aGUgdmlld3BvcnRcbiAgcGFkZGluZzogMzAsIC8vIHBhZGRpbmcgYXJvdW5kIHRoZSBzaW11bGF0aW9uXG4gIGJvdW5kaW5nQm94OiB1bmRlZmluZWQsIC8vIGNvbnN0cmFpbiBsYXlvdXQgYm91bmRzOyB7IHgxLCB5MSwgeDIsIHkyIH0gb3IgeyB4MSwgeTEsIHcsIGggfVxuXG4gIC8vIGxheW91dCBldmVudCBjYWxsYmFja3NcbiAgcmVhZHk6IGZ1bmN0aW9uKCl7fSwgLy8gb24gbGF5b3V0cmVhZHlcbiAgc3RvcDogZnVuY3Rpb24oKXt9LCAvLyBvbiBsYXlvdXRzdG9wXG5cbiAgLy8gcG9zaXRpb25pbmcgb3B0aW9uc1xuICByYW5kb21pemU6IGZhbHNlLCAvLyB1c2UgcmFuZG9tIG5vZGUgcG9zaXRpb25zIGF0IGJlZ2lubmluZyBvZiBsYXlvdXRcblxuICAvLyBUT0RPIG90aGVyIG9wdGlvbnNcblxuICAvLyBpbmZpbml0ZSBsYXlvdXQgb3B0aW9uc1xuICBpbmZpbml0ZTogZmFsc2UgLy8gb3ZlcnJpZGVzIGFsbCBvdGhlciBvcHRpb25zIGZvciBhIGZvcmNlcy1hbGwtdGhlLXRpbWUgbW9kZVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGVmYXVsdHMuanMiLCJjb25zdCBMYXlvdXQgPSByZXF1aXJlKCcuL2xheW91dCcpO1xuXG4vLyByZWdpc3RlcnMgdGhlIGV4dGVuc2lvbiBvbiBhIGN5dG9zY2FwZSBsaWIgcmVmXG5sZXQgcmVnaXN0ZXIgPSBmdW5jdGlvbiggY3l0b3NjYXBlICl7XG4gIGlmKCAhY3l0b3NjYXBlICl7IHJldHVybjsgfSAvLyBjYW4ndCByZWdpc3RlciBpZiBjeXRvc2NhcGUgdW5zcGVjaWZpZWRcblxuICBjeXRvc2NhcGUoICdsYXlvdXQnLCAnZXVsZXInLCBMYXlvdXQgKTsgLy8gcmVnaXN0ZXIgd2l0aCBjeXRvc2NhcGUuanNcbn07XG5cbmlmKCB0eXBlb2YgY3l0b3NjYXBlICE9PSAndW5kZWZpbmVkJyApeyAvLyBleHBvc2UgdG8gZ2xvYmFsIGN5dG9zY2FwZSAoaS5lLiB3aW5kb3cuY3l0b3NjYXBlKVxuICByZWdpc3RlciggY3l0b3NjYXBlICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVnaXN0ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCBiYiwgY3kgKXtcbiAgaWYoIGJiID09IG51bGwgKXtcbiAgICBiYiA9IHsgeDE6IDAsIHkxOiAwLCB3OiBjeS53aWR0aCgpLCBoOiBjeS5oZWlnaHQoKSB9O1xuICB9IGVsc2UgeyAvLyBjb3B5XG4gICAgYmIgPSB7IHgxOiBiYi54MSwgeDI6IGJiLngyLCB5MTogYmIueTEsIHkyOiBiYi55MiwgdzogYmIudywgaDogYmIuaCB9O1xuICB9XG5cbiAgaWYoIGJiLngyID09IG51bGwgKXsgYmIueDIgPSBiYi54MSArIGJiLnc7IH1cbiAgaWYoIGJiLncgPT0gbnVsbCApeyBiYi53ID0gYmIueDIgLSBiYi54MTsgfVxuICBpZiggYmIueTIgPT0gbnVsbCApeyBiYi55MiA9IGJiLnkxICsgYmIuaDsgfVxuICBpZiggYmIuaCA9PSBudWxsICl7IGJiLmggPSBiYi55MiAtIGJiLnkxOyB9XG5cbiAgcmV0dXJuIGJiO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWtlLWJiLmpzIiwiY29uc3QgeyB0aWNrTm9kZSB9ID0gcmVxdWlyZSgnLi9hbGdvcml0aG0nKTtcbmNvbnN0IHsgZ2V0Tm9kZVBvc2l0aW9uRGF0YSB9ID0gcmVxdWlyZSgnLi9wb3NpdGlvbicpO1xuXG5sZXQgdGljayA9IGZ1bmN0aW9uKCBvcHRpb25zICl7XG4gIGxldCBvID0gb3B0aW9ucztcblxuICBpZiggby50aWNrSW5kZXggPj0gby5tYXhJdGVyYXRpb25zICl7IHJldHVybiB0cnVlOyB9XG5cbiAgby5wcmVUaWNrKCBvcHRpb25zICk7XG5cbiAgby5ub2Rlcy5mb3JFYWNoKCBub2RlID0+IHRpY2tOb2RlKCBvcHRpb25zLCBnZXROb2RlUG9zaXRpb25EYXRhKCBub2RlICkgKSApO1xuXG4gIG8ucG9zdFRpY2soIG9wdGlvbnMgKTtcblxuICBpZiggby5maXJzdFVwZGF0ZSApe1xuICAgIGlmKCBvLmFuaW1hdGVDb250aW51b3VzbHkgKXsgLy8gaW5kaWNhdGUgdGhlIGluaXRpYWwgcG9zaXRpb25zIGhhdmUgYmVlbiBzZXRcbiAgICAgIG8ubGF5b3V0LmVtaXQoJ2xheW91dHJlYWR5Jyk7XG4gICAgfVxuICAgIG8uZmlyc3RVcGRhdGUgPSBmYWxzZTtcbiAgfVxuXG4gIG8udGlja0luZGV4Kys7XG59O1xuXG5sZXQgbXVsdGl0aWNrID0gZnVuY3Rpb24oIG9wdGlvbnMsIG9uTm90RG9uZSwgb25Eb25lICl7XG4gIGxldCBkb25lID0gZmFsc2U7XG4gIGxldCBvID0gb3B0aW9ucztcblxuICBmb3IoIGxldCBpID0gMDsgaSA8IG8ubWF4SXRlcmF0aW9uczsgaSsrICl7XG4gICAgZG9uZSA9ICFvLnJ1bm5pbmcgfHwgdGljayggb3B0aW9ucyApO1xuXG4gICAgaWYoIGRvbmUgKXsgYnJlYWs7IH1cbiAgfVxuXG4gIGlmKCBvLmZpdCAmJiBvLmFuaW1hdGVDb250aW51b3VzbHkgKXtcbiAgICBvLmN5LmZpdCggby5wYWRkaW5nICk7XG4gIH1cblxuICBpZiggIWRvbmUgKXtcbiAgICBpZiggb25Ob3REb25lICE9IG51bGwgKXsgb25Ob3REb25lKCk7IH1cbiAgfSBlbHNlIHtcbiAgICBpZiggb25Eb25lICE9IG51bGwgKXsgb25Eb25lKCk7IH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHRpY2ssIHRpY2tOb2RlLCBtdWx0aXRpY2sgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90aWNrLmpzIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9vYmplY3QtYXNzaWduL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=