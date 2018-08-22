/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @api private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {Mixed} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Boolean} exists Only check if there are listeners.
 * @returns {Array|Boolean}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event, exists) {
  var evt = prefix ? prefix + event : event
    , available = this._events[evt];

  if (exists) return !!available;
  if (!available) return [];
  if (available.fn) return [available.fn];

  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
    ee[i] = available[i].fn;
  }

  return ee;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Remove the listeners of a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {Mixed} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
         listeners.fn === fn
      && (!once || listeners.once)
      && (!context || listeners.context === context)
    ) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
           listeners[i].fn !== fn
        || (once && !listeners[i].once)
        || (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {String|Symbol} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./src/bounds.ts":
/*!***********************!*\
  !*** ./src/bounds.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Bounds = /** @class */ (function () {
    function Bounds(minX, minY, maxX, maxY) {
        if (minX === void 0) { minX = 0; }
        if (minY === void 0) { minY = 0; }
        if (maxX === void 0) { maxX = 0; }
        if (maxY === void 0) { maxY = 0; }
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    }
    Bounds.intersectBounds = function (bounds1, bounds2) {
        if (bounds1.minX > bounds2.maxX || bounds1.maxX < bounds2.minX ||
            bounds1.minY > bounds2.maxY || bounds1.maxY < bounds2.minY) {
            return false;
        }
        else {
            return true;
        }
    };
    Bounds.prototype.intersect = function (target) {
        return Bounds.intersectBounds(this, target);
    };
    return Bounds;
}());
exports.Bounds = Bounds;


/***/ }),

/***/ "./src/circle.ts":
/*!***********************!*\
  !*** ./src/circle.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var object_1 = __webpack_require__(/*! ./object */ "./src/object.ts");
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        var _this = _super.call(this) || this;
        _this._radius = 0;
        _this._setBounds();
        return _this;
    }
    Object.defineProperty(Circle.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        set: function (value) {
            this._radius = value;
            this._setBounds();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (value) {
            var pos = this._pos;
            pos.copy(value);
            this._setBounds();
        },
        enumerable: true,
        configurable: true
    });
    Circle.prototype.updatePos = function (value) {
        _super.prototype.updatePos.call(this, value);
        this._setBounds();
    };
    Circle.prototype._setBounds = function () {
        var pos = this._pos;
        var bounds = this._bounds;
        var radius = this._radius;
        bounds.minX = pos.x - radius;
        bounds.minY = pos.y - radius;
        bounds.maxX = pos.x + radius;
        bounds.maxY = pos.y + radius;
    };
    return Circle;
}(object_1.Obj));
exports.Circle = Circle;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./vector */ "./src/vector.ts"));
__export(__webpack_require__(/*! ./bounds */ "./src/bounds.ts"));
__export(__webpack_require__(/*! ./object */ "./src/object.ts"));
__export(__webpack_require__(/*! ./circle */ "./src/circle.ts"));
__export(__webpack_require__(/*! ./rectangle */ "./src/rectangle.ts"));
__export(__webpack_require__(/*! ./triangle */ "./src/triangle.ts"));
__export(__webpack_require__(/*! ./world */ "./src/world.ts"));
__export(__webpack_require__(/*! ./my_circle */ "./src/my_circle.ts"));


/***/ }),

/***/ "./src/my_circle.ts":
/*!**************************!*\
  !*** ./src/my_circle.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var circle_1 = __webpack_require__(/*! ./circle */ "./src/circle.ts");
var rectangle_1 = __webpack_require__(/*! ./rectangle */ "./src/rectangle.ts");
var vector_1 = __webpack_require__(/*! ./vector */ "./src/vector.ts");
var triangle_1 = __webpack_require__(/*! ./triangle */ "./src/triangle.ts");
var MyCircle = /** @class */ (function (_super) {
    __extends(MyCircle, _super);
    function MyCircle() {
        var _this = _super.call(this) || this;
        _this._velocity = new vector_1.Vector();
        return _this;
    }
    Object.defineProperty(MyCircle.prototype, "velocity", {
        get: function () {
            return this._velocity;
        },
        set: function (value) {
            this._velocity = value;
        },
        enumerable: true,
        configurable: true
    });
    MyCircle.prototype.collide = function (target, result) {
        if (result == null)
            result = {
                collided: false,
                normal: new vector_1.Vector(),
            };
        else {
            result.collided = false;
        }
        if (target instanceof circle_1.Circle) {
            var myCircle = this;
            var targetCircle = target;
            if (myCircle.bounds.intersect(targetCircle.bounds)) {
                var normal = vector_1.Vector.subVectors(myCircle.pos, targetCircle.pos);
                var distance = normal.magnitude();
                if (distance < (myCircle.radius + targetCircle.radius)) {
                    result.collided = true;
                    normal.normal();
                    result.normal.copy(normal);
                }
            }
        }
        else if (target instanceof rectangle_1.Rectangle) {
            var myCircle = this;
            var targetSquare = target;
            if (myCircle.bounds.intersect(targetSquare.bounds)) {
                var circleCenter = myCircle.pos;
                var circleCenterX = circleCenter.x;
                var circleCenterY = circleCenter.y;
                var circleRadius = myCircle.radius;
                var squareBounds = targetSquare.bounds;
                if (circleCenterX > squareBounds.minX && circleCenterX < squareBounds.maxX) {
                    if (circleCenterY > squareBounds.minY && circleCenterY < squareBounds.maxY) {
                        //The center is inside the bounds (namely, inside the square).
                        result.collided = true;
                        vector_1.Vector.normalVector(myCircle.velocity, result.normal);
                    }
                    else if (circleCenterY > squareBounds.maxY) {
                        //The center is downside the bounds.
                        if (circleCenterY - squareBounds.maxY < circleRadius) {
                            result.collided = true;
                            result.normal = new vector_1.Vector(0, 1);
                        }
                    }
                    else if (circleCenterY < squareBounds.minY) {
                        //The center is upside the bounds.
                        if (squareBounds.minY - circleCenterY < circleRadius) {
                            result.collided = true;
                            result.normal = new vector_1.Vector(0, -1);
                        }
                    }
                }
                else if (circleCenterY > squareBounds.minY && circleCenterY < squareBounds.maxY) {
                    if (circleCenterX > squareBounds.maxX) {
                        //The center is right of the bounds.
                        if (circleCenterX - squareBounds.maxX < circleRadius) {
                            result.collided = true;
                            result.normal = new vector_1.Vector(1, 0);
                        }
                    }
                    else if (circleCenterX < squareBounds.minX) {
                        //The center is left of the bounds.
                        if (squareBounds.minX - circleCenterX < circleRadius) {
                            result.collided = true;
                            result.normal = new vector_1.Vector(-1, 0);
                        }
                    }
                }
                else {
                    //Detect if any point of square is inside the circle.
                    var points = targetSquare.points;
                    var pointCount = points.length;
                    var pointHelper = new vector_1.Vector();
                    var circleRadiusSquare = circleRadius * circleRadius;
                    for (var i = 0; i < pointCount; ++i) {
                        vector_1.Vector.subVectors(circleCenter, points[i], pointHelper);
                        if (pointHelper.manitudeSquare() < circleRadiusSquare) {
                            //The point is inside the circle.
                            result.collided = true;
                            vector_1.Vector.normalVector(pointHelper, result.normal);
                            break;
                        }
                    }
                }
            }
        }
        else if (target instanceof triangle_1.IRTriangle) {
            var myCircle = this;
            var targetTriangle = target;
            if (myCircle.bounds.intersect(targetTriangle.bounds)) {
                var circleCenter = myCircle.pos;
                var circleCenterPos = [circleCenter.x, circleCenter.y];
                var circleRadius = myCircle.radius;
                var triangleBounds = targetTriangle.bounds;
                var triangleBoundsMin = [triangleBounds.minX, triangleBounds.minY];
                var triangleBoundsMax = [triangleBounds.maxX, triangleBounds.maxY];
                //00 is left 01 is midle 10 is right
                //First two bit is x and second two bit is y.
                var circlArea = 0;
                if (circleCenterPos[0] > triangleBoundsMin[0] && circleCenterPos[0] < triangleBoundsMax[0]) {
                    circlArea |= 1;
                }
                else if (circleCenterPos[0] > triangleBoundsMax[0]) {
                    circlArea |= 2;
                }
                if (circleCenterPos[1] > triangleBoundsMin[1] && circleCenterPos[1] < triangleBoundsMax[1]) {
                    circlArea |= (1 << 2);
                }
                else if (circleCenterPos[1] > triangleBoundsMax[1]) {
                    circlArea |= (2 << 2);
                }
                //rectangle 9 area.
                var findArea = false;
                for (var areaX = 0; areaX < 3; ++areaX) {
                    for (var areaY = 0; areaY < 3; ++areaY) {
                        if (((circlArea & 3) ^ areaX) == 0 && ((circlArea >> 2) ^ areaY) == 0) {
                            findArea = true;
                            var sameXDirect = areaX != 1 && (areaX >> 1) == (targetTriangle.direct & 1);
                            var sameYDirect = areaY != 1 && (areaY >> 1) == ((targetTriangle.direct >> 1) & 1);
                            if (sameXDirect || sameYDirect) {
                                if (areaX != 1 && areaY != 1) {
                                    //The circle is corner of the square.
                                    //Detect if any point of square is inside the circle.
                                    var points = targetTriangle.points;
                                    var point = points[((areaY >> 1) << 1) | (areaX >> 1)];
                                    var pointHelper = new vector_1.Vector();
                                    var circleRadiusSquare = circleRadius * circleRadius;
                                    vector_1.Vector.subVectors(circleCenter, point, pointHelper);
                                    if (pointHelper.manitudeSquare() < circleRadiusSquare) {
                                        //The point is inside the circle.
                                        result.collided = true;
                                        vector_1.Vector.normalVector(pointHelper, result.normal);
                                    }
                                }
                                else {
                                    var points = targetTriangle.points;
                                    //Right angle point.
                                    var point = points[targetTriangle.direct];
                                    if (areaX != 1) {
                                        if (Math.abs(point.x - circleCenterPos[0]) < circleRadius) {
                                            result.collided = true;
                                            result.normal = new vector_1.Vector(areaX - 1, 0);
                                        }
                                    }
                                    else {
                                        if (Math.abs(point.y - circleCenterPos[1]) < circleRadius) {
                                            result.collided = true;
                                            result.normal = new vector_1.Vector(0, areaY - 1);
                                        }
                                    }
                                }
                            }
                            else {
                                var vectorTriangleToCenter = vector_1.Vector.subVectors(myCircle.pos, targetTriangle.pos);
                                var points = targetTriangle.points;
                                //Right angle point.
                                var point = points[targetTriangle.direct];
                                var normal = vector_1.Vector.subVectors(targetTriangle.pos, point);
                                normal.normal();
                                var dot = vector_1.Vector.dotVectors(vectorTriangleToCenter, normal);
                                var circleRadius_1 = myCircle.radius;
                                if (dot < circleRadius_1) {
                                    result.collided = true;
                                    result.normal = normal;
                                }
                            }
                            break;
                        }
                    }
                    if (findArea)
                        break;
                }
            }
        }
        else {
            throw new Error("Invalid shape for collision detection.");
        }
        return result;
    };
    return MyCircle;
}(circle_1.Circle));
exports.MyCircle = MyCircle;


/***/ }),

/***/ "./src/object.ts":
/*!***********************!*\
  !*** ./src/object.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = __webpack_require__(/*! ./vector */ "./src/vector.ts");
var bounds_1 = __webpack_require__(/*! ./bounds */ "./src/bounds.ts");
var Obj = /** @class */ (function () {
    function Obj() {
        this._pos = new vector_1.Vector();
        this._bounds = new bounds_1.Bounds();
    }
    Object.defineProperty(Obj.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (value) {
            this._pos.copy(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Obj.prototype, "bounds", {
        get: function () {
            return this._bounds;
        },
        enumerable: true,
        configurable: true
    });
    Obj.prototype.updatePos = function (value) {
        if (value) {
            this._pos = value;
        }
    };
    return Obj;
}());
exports.Obj = Obj;


/***/ }),

/***/ "./src/rectangle.ts":
/*!**************************!*\
  !*** ./src/rectangle.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var object_1 = __webpack_require__(/*! ./object */ "./src/object.ts");
var vector_1 = __webpack_require__(/*! ./vector */ "./src/vector.ts");
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        var _this = _super.call(this) || this;
        _this._width = 0;
        _this._height = 0;
        var points = [];
        _this._points = points;
        var POINT_COUNT = Rectangle.POINT_COUNT;
        points.length = POINT_COUNT;
        for (var i = 0; i < POINT_COUNT; ++i) {
            points[i] = new vector_1.Vector();
        }
        _this._setBounds();
        _this._setPoints();
        return _this;
    }
    Object.defineProperty(Rectangle.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
            this._setBounds();
            this._setPoints();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
            this._setBounds();
            this._setPoints();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (value) {
            var pos = this._pos;
            pos.copy(value);
            this._setBounds();
            this._setPoints();
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.updatePos = function (value) {
        _super.prototype.updatePos.call(this, value);
        this._setBounds();
        this._setPoints();
    };
    Object.defineProperty(Rectangle.prototype, "points", {
        get: function () {
            return this._points;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype._setBounds = function () {
        var pos = this._pos;
        var bounds = this._bounds;
        var halfWidth = this._width / 2;
        var halfHeight = this._height / 2;
        bounds.minX = pos.x - halfWidth;
        bounds.minY = pos.y - halfHeight;
        bounds.maxX = pos.x + halfWidth;
        bounds.maxY = pos.y + halfHeight;
    };
    Rectangle.prototype._setPoints = function () {
        var bounds = this._bounds;
        var points = this._points;
        //0 is 0(y)0(x)
        points[0].x = bounds.minX;
        points[0].y = bounds.minY;
        //1 is 0(y)1(x)
        points[1].x = bounds.maxX;
        points[1].y = bounds.minY;
        //3 is 1(y)1(x)
        points[3].x = bounds.maxX;
        points[3].y = bounds.maxY;
        //2 is 1(y)0(x)
        points[2].x = bounds.minX;
        points[2].y = bounds.maxY;
    };
    Rectangle.POINT_COUNT = 4;
    return Rectangle;
}(object_1.Obj));
exports.Rectangle = Rectangle;


/***/ }),

/***/ "./src/triangle.ts":
/*!*************************!*\
  !*** ./src/triangle.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var object_1 = __webpack_require__(/*! ./object */ "./src/object.ts");
var vector_1 = __webpack_require__(/*! ./vector */ "./src/vector.ts");
var rectangle_1 = __webpack_require__(/*! ./rectangle */ "./src/rectangle.ts");
//Right angle direct.
var DirectIRTriangle;
(function (DirectIRTriangle) {
    DirectIRTriangle[DirectIRTriangle["LEFT_UP"] = 0] = "LEFT_UP";
    DirectIRTriangle[DirectIRTriangle["RIGHT_UP"] = 1] = "RIGHT_UP";
    DirectIRTriangle[DirectIRTriangle["RIGHT_BOTTOM"] = 3] = "RIGHT_BOTTOM";
    DirectIRTriangle[DirectIRTriangle["LEFT_BOTTOM"] = 2] = "LEFT_BOTTOM";
})(DirectIRTriangle = exports.DirectIRTriangle || (exports.DirectIRTriangle = {}));
var IRTriangle = /** @class */ (function (_super) {
    __extends(IRTriangle, _super);
    function IRTriangle() {
        var _this = _super.call(this) || this;
        _this._size = 0;
        var points = [];
        _this._points = points;
        var POINT_COUNT = rectangle_1.Rectangle.POINT_COUNT;
        points.length = POINT_COUNT;
        for (var i = 0; i < POINT_COUNT; ++i) {
            points[i] = new vector_1.Vector();
        }
        _this._setBounds();
        _this._setPoints();
        return _this;
    }
    Object.defineProperty(IRTriangle.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = value;
            this._setBounds();
            this._setPoints();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IRTriangle.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (value) {
            var pos = this._pos;
            pos.copy(value);
            this._setBounds();
            this._setPoints();
        },
        enumerable: true,
        configurable: true
    });
    IRTriangle.prototype.updatePos = function (value) {
        _super.prototype.updatePos.call(this, value);
        this._setBounds();
        this._setPoints();
    };
    Object.defineProperty(IRTriangle.prototype, "points", {
        get: function () {
            return this._points;
        },
        enumerable: true,
        configurable: true
    });
    IRTriangle.prototype._setBounds = function () {
        var pos = this._pos;
        var bounds = this._bounds;
        var halfSize = this._size / 2;
        bounds.minX = pos.x - halfSize;
        bounds.minY = pos.y - halfSize;
        bounds.maxX = pos.x + halfSize;
        bounds.maxY = pos.y + halfSize;
    };
    IRTriangle.prototype._setPoints = function () {
        var bounds = this._bounds;
        var points = this._points;
        //0 is 0(y)0(x)
        points[0].x = bounds.minX;
        points[0].y = bounds.minY;
        //1 is 0(y)1(x)
        points[1].x = bounds.maxX;
        points[1].y = bounds.minY;
        //3 is 1(y)1(x)
        points[3].x = bounds.maxX;
        points[3].y = bounds.maxY;
        //2 is 1(y)0(x)
        points[2].x = bounds.minX;
        points[2].y = bounds.maxY;
    };
    IRTriangle.POINT_COUNT = 4;
    return IRTriangle;
}(object_1.Obj));
exports.IRTriangle = IRTriangle;


/***/ }),

/***/ "./src/vector.ts":
/*!***********************!*\
  !*** ./src/vector.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector.subVectors = function (vec1, vec2, result) {
        if (!result)
            result = new Vector();
        result.x = vec1.x - vec2.x;
        result.y = vec1.y - vec2.y;
        return result;
    };
    Vector.addVectors = function (vec1, vec2, result) {
        if (!result)
            result = new Vector();
        result.x = vec1.x + vec2.x;
        result.y = vec1.y + vec2.y;
        return result;
    };
    Vector.mulVectorMag = function (vec, magnitude, result) {
        if (!result)
            result = new Vector();
        result.x = vec.x * magnitude;
        result.y = vec.y * magnitude;
        return result;
    };
    Vector.normalVector = function (vec, result) {
        if (!result)
            result = vec.clone();
        else
            result.copy(vec);
        result.normal();
        return result;
    };
    Vector.dotVectors = function (vec1, vec2) {
        return vec1.x * vec2.x + vec1.y * vec2.y;
    };
    Vector.reflectVector = function (vec, normal, result) {
        if (!result)
            result = new Vector();
        else if (result == vec) {
            throw new Error("The result shouldn't be argument vec.");
        }
        var dot = Vector.dotVectors(vec, normal);
        result.copy(normal);
        result.mulMag(dot * 2);
        Vector.subVectors(vec, result, result);
        return result;
    };
    Vector.prototype.clone = function () {
        return new Vector(this.x, this.y);
    };
    Vector.prototype.copy = function (target) {
        this.x = target.x;
        this.y = target.y;
    };
    Vector.prototype.sub = function (target) {
        this.x -= target.x;
        this.y -= target.y;
    };
    Vector.prototype.add = function (target) {
        this.x += target.x;
        this.y += target.y;
    };
    Vector.prototype.mulMag = function (magnitude) {
        this.x *= magnitude;
        this.y *= magnitude;
    };
    Vector.prototype.magnitude = function () {
        var x = this.x;
        var y = this.y;
        return Math.sqrt(x * x + y * y);
    };
    Vector.prototype.manitudeSquare = function () {
        var x = this.x;
        var y = this.y;
        return x * x + y * y;
    };
    Vector.prototype.normal = function () {
        var magnitude = this.magnitude();
        this.x /= magnitude;
        this.y /= magnitude;
    };
    Vector.prototype.zero = function () {
        this.x = 0;
        this.y = 0;
    };
    return Vector;
}());
exports.Vector = Vector;


/***/ }),

/***/ "./src/world.ts":
/*!**********************!*\
  !*** ./src/world.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = __webpack_require__(/*! ./vector */ "./src/vector.ts");
var eventemitter3 = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
var World = /** @class */ (function (_super) {
    __extends(World, _super);
    function World() {
        var _this = _super.call(this) || this;
        _this.time = 0;
        _this.objectCount = 0;
        _this.objects = [];
        _this.myCircleCount = 0;
        _this.myCircles = [];
        return _this;
    }
    World.prototype.addObj = function (object) {
        if (this.objectCount < this.objects.length) {
            this.objects[this.objectCount++] = object;
        }
        else {
            this.objects.length = 2 * this.objects.length;
            this.objects[this.objectCount++] = object;
        }
    };
    World.prototype.removeObj = function (object) {
        var objectCount = this.objectCount;
        var objects = this.objects;
        for (var i = 0; i < objectCount; ++i) {
            if (object == objects[i]) {
                --objectCount;
                if (i < objectCount) {
                    objects[i] = objects[objectCount];
                    objects[objectCount] = null;
                }
                this.objectCount = objectCount;
                return;
            }
        }
    };
    World.prototype.clearObjs = function () {
        this.objectCount = 0;
    };
    World.prototype.addMyCircle = function (myCircle) {
        if (this.myCircleCount < this.myCircles.length) {
            this.myCircles[this.myCircleCount++] = myCircle;
        }
        else {
            this.myCircles.length = 2 * this.myCircles.length;
            this.myCircles[this.myCircleCount++] = myCircle;
        }
    };
    World.prototype.removeMyCircle = function (myCircle) {
        var myCircleCount = this.myCircleCount;
        var myCircles = this.myCircles;
        for (var i = 0; i < myCircleCount; ++i) {
            if (myCircle == myCircles[i]) {
                --myCircleCount;
                if (i < myCircleCount) {
                    myCircles[i] = myCircles[myCircleCount];
                    myCircles[myCircleCount] = null;
                }
                this.myCircleCount = myCircleCount;
                return;
            }
        }
    };
    World.prototype.clearMyCircles = function () {
        this.myCircleCount = 0;
    };
    World.prototype.step = function (dt, iterations) {
        dt = dt || 0;
        iterations = iterations || 1;
        var cachePosHelper = new vector_1.Vector();
        var nextPosHelper = new vector_1.Vector();
        var collisionResultHelper = { collided: false, normal: new vector_1.Vector() };
        var collisionNormlHelper = new vector_1.Vector();
        var reflectResultHelper = new vector_1.Vector();
        var minDt = dt / iterations;
        for (var iteration = 0; iteration < iterations; ++iteration) {
            var myCircleCount = this.myCircleCount;
            var myCircles = this.myCircles;
            for (var myCircleIndex = 0; myCircleIndex < myCircleCount; ++myCircleIndex) {
                var objectCount = this.objectCount;
                var objects = this.objects;
                var myBody = myCircles[myCircleIndex];
                //Cache current position.
                var cachePos = cachePosHelper;
                cachePos.copy(myBody.pos);
                //Caculate next position.
                var nextPos = nextPosHelper;
                nextPos.x = myBody.pos.x + myBody.velocity.x * minDt;
                nextPos.y = myBody.pos.y + myBody.velocity.y * minDt;
                myBody.pos = nextPos;
                //Detect collision.
                var collided = false;
                var collisionResult = collisionResultHelper;
                var collsionNormal = collisionNormlHelper;
                collsionNormal.zero();
                for (var i = 0; i < objectCount; ++i) {
                    var object = objects[i];
                    myBody.collide(object, collisionResult);
                    if (collisionResult.collided) {
                        collided = true;
                        collsionNormal.add(collisionResult.normal);
                        this.emit("collided", object);
                    }
                }
                //Final collsion result.
                var reflectResult = reflectResultHelper;
                if (collided) {
                    //Recover to cached pre postion.
                    myBody.pos = cachePos;
                    var cacheMagnitude = myBody.velocity.magnitude();
                    //Set new velocity according to collision normal.
                    vector_1.Vector.reflectVector(myBody.velocity, collsionNormal, reflectResult);
                    // if (Math.abs(reflectResult.magnitude() - myBody.velocity.magnitude()) > 10) 
                    //     throw new Error('Velocity is changed!');
                    // myBody.velocity.copy(reflectResult);
                    reflectResult.normal();
                    reflectResult.mulMag(cacheMagnitude);
                    myBody.velocity.copy(reflectResult);
                    //Move
                    var nextPos_1 = nextPosHelper;
                    nextPos_1.x = myBody.pos.x + myBody.velocity.x * minDt;
                    nextPos_1.y = myBody.pos.y + myBody.velocity.y * minDt;
                    myBody.pos = nextPos_1;
                }
            }
        }
        this.time += dt;
    };
    return World;
}(eventemitter3.EventEmitter));
exports.World = World;


/***/ })

/******/ });
//# sourceMappingURL=model.js.map