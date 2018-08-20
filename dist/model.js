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
        points[0].x = bounds.minX;
        points[0].y = bounds.minY;
        points[1].x = bounds.maxX;
        points[1].y = bounds.minY;
        points[2].x = bounds.maxX;
        points[2].y = bounds.maxY;
        points[3].x = bounds.minX;
        points[3].y = bounds.maxY;
    };
    Rectangle.POINT_COUNT = 4;
    return Rectangle;
}(object_1.Obj));
exports.Rectangle = Rectangle;


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

Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = __webpack_require__(/*! ./vector */ "./src/vector.ts");
var my_circle_1 = __webpack_require__(/*! ./my_circle */ "./src/my_circle.ts");
var World = /** @class */ (function () {
    function World() {
        this.time = 0;
        this.objectCount = 0;
        this.objects = [];
        this.myObj = new my_circle_1.MyCircle();
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
    World.prototype.clear = function () {
        this.objectCount = 0;
    };
    Object.defineProperty(World.prototype, "myObject", {
        get: function () {
            return this.myObj;
        },
        enumerable: true,
        configurable: true
    });
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
            var objectCount = this.objectCount;
            var objects = this.objects;
            var myBody = this.myObj;
            //Cache current position.
            var cachePos = cachePosHelper;
            cachePos.copy(myBody.pos);
            //Caculate next position.
            var nextPos = nextPosHelper;
            nextPos.x = myBody.pos.x + myBody.velocity.x * minDt;
            nextPos.y = myBody.pos.y + myBody.velocity.y * minDt;
            myBody.pos = nextPos;
            //Detect collision.
            var collisioned = false;
            var collisionResult = collisionResultHelper;
            var collsionNormal = collisionNormlHelper;
            collsionNormal.zero();
            for (var i = 0; i < objectCount; ++i) {
                var object = objects[i];
                myBody.collide(object, collisionResult);
                if (collisionResult.collided) {
                    collisioned = true;
                    collsionNormal.add(collisionResult.normal);
                }
            }
            //Final collsion result.
            var reflectResult = reflectResultHelper;
            if (collisioned) {
                //Recover to cached pre postion.
                myBody.pos = cachePos;
                //Set new velocity according to collision normal.
                vector_1.Vector.reflectVector(myBody.velocity, collsionNormal, reflectResult);
                myBody.velocity.copy(reflectResult);
                //Move
                var nextPos_1 = nextPosHelper;
                nextPos_1.x = myBody.pos.x + myBody.velocity.x * minDt;
                nextPos_1.y = myBody.pos.y + myBody.velocity.y * minDt;
                myBody.pos = nextPos_1;
            }
        }
        this.time += dt;
    };
    return World;
}());
exports.World = World;


/***/ })

/******/ });
//# sourceMappingURL=model.js.map