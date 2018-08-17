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
var unit_1 = __webpack_require__(/*! ./unit */ "./src/unit.ts");
var bounds_1 = __webpack_require__(/*! ./bounds */ "./src/bounds.ts");
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        var _this = _super.call(this) || this;
        _this._bounds = new bounds_1.Bounds;
        _this._radius = unit_1.unitSize / 2;
        return _this;
    }
    Object.defineProperty(Circle.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "pos", {
        set: function (value) {
            var pos = this._pos;
            pos.copy(value);
            var bounds = this._bounds;
            var radius = this._radius;
            bounds.minX = pos.x - radius;
            bounds.minY = pos.y - radius;
            bounds.maxX = pos.x + radius;
            bounds.maxY = pos.y + radius;
        },
        enumerable: true,
        configurable: true
    });
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

Object.defineProperty(exports, "__esModule", { value: true });
var unit_1 = __webpack_require__(/*! ./unit */ "./src/unit.ts");
exports.unitSize = unit_1.unitSize;
var vector_1 = __webpack_require__(/*! ./vector */ "./src/vector.ts");
exports.Vector = vector_1.Vector;
var bounds_1 = __webpack_require__(/*! ./bounds */ "./src/bounds.ts");
exports.Bounds = bounds_1.Bounds;
var object_1 = __webpack_require__(/*! ./object */ "./src/object.ts");
exports.Obj = object_1.Obj;
var circle_1 = __webpack_require__(/*! ./circle */ "./src/circle.ts");
exports.Circle = circle_1.Circle;
var square_1 = __webpack_require__(/*! ./square */ "./src/square.ts");
exports.Square = square_1.Square;
var world_1 = __webpack_require__(/*! ./world */ "./src/world.ts");
exports.World = world_1.World;
var my_circle_1 = __webpack_require__(/*! ./my_circle */ "./src/my_circle.ts");
exports.MyCircle = my_circle_1.MyCircle;


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
var square_1 = __webpack_require__(/*! ./square */ "./src/square.ts");
var vector_1 = __webpack_require__(/*! ./vector */ "./src/vector.ts");
var MyCircle = /** @class */ (function (_super) {
    __extends(MyCircle, _super);
    function MyCircle() {
        return _super.call(this) || this;
    }
    MyCircle.prototype.collide = function (target, result) {
        if (result == null)
            result = {
                collided: false,
                normal: null,
            };
        if (target instanceof circle_1.Circle) {
            var myCircle = this;
            var targetCircle = target;
            if (myCircle.bounds.intersect(targetCircle.bounds)) {
                var normal = vector_1.Vector.subVectors(myCircle.pos, targetCircle.pos);
                var distance = normal.magnitude();
                if (distance < (myCircle.radius + targetCircle.radius)) {
                    result.collided = true;
                    normal.normal();
                    result.normal = normal;
                }
            }
        }
        else if (target instanceof square_1.Square) {
            var myCircle = this;
            var targetSquare = target;
            if (myCircle.bounds.intersect(targetSquare.bounds)) {
                var circleCenter = myCircle.pos;
                var circleCenterX = circleCenter.x;
                var circleCenterY = circleCenter.y;
                var squareBounds = targetSquare.bounds;
                if (circleCenterX > squareBounds.minX && circleCenterX < squareBounds.maxX) {
                    if (circleCenterY > squareBounds.minY && circleCenterY < squareBounds.maxY) {
                        //The center is inside the bounds (namely, inside the square).
                        result.collided = true;
                        result.normal = null;
                    }
                    else if (circleCenterY > squareBounds.maxY) {
                        //The center is upside the bounds.
                    }
                    else if (circleCenterY < squareBounds.minY) {
                    }
                }
                else if (circleCenterY > squareBounds.minY && circleCenterY < squareBounds.maxY) {
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
        this._velocity = new vector_1.Vector();
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
    Object.defineProperty(Obj.prototype, "velocity", {
        get: function () {
            return this._velocity;
        },
        set: function (value) {
            this._velocity = value;
        },
        enumerable: true,
        configurable: true
    });
    return Obj;
}());
exports.Obj = Obj;


/***/ }),

/***/ "./src/square.ts":
/*!***********************!*\
  !*** ./src/square.ts ***!
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
var unit_1 = __webpack_require__(/*! ./unit */ "./src/unit.ts");
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Square.prototype, "size", {
        get: function () {
            return unit_1.unitSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "pos", {
        set: function (value) {
            var pos = this._pos;
            pos.copy(value);
            var bounds = this._bounds;
            var halfSize = this.size / 2;
            bounds.minX = pos.x - halfSize;
            bounds.minY = pos.y - halfSize;
            bounds.maxX = pos.x + halfSize;
            bounds.maxY = pos.y + halfSize;
        },
        enumerable: true,
        configurable: true
    });
    return Square;
}(object_1.Obj));
exports.Square = Square;


/***/ }),

/***/ "./src/unit.ts":
/*!*********************!*\
  !*** ./src/unit.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.unitSize = 100;


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
            result = vec1.clone();
        else
            result.copy(vec1);
        result.sub(vec2);
        return result;
    };
    Vector.addVectors = function (vec1, vec2, result) {
        if (!result)
            result = vec1.clone();
        else
            result.copy(vec1);
        result.add(vec2);
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
    Vector.prototype.magnitude = function () {
        var x = this.x;
        var y = this.y;
        return Math.sqrt(x * x + y * y);
    };
    Vector.prototype.normal = function () {
        var magnitude = this.magnitude();
        this.x /= magnitude;
        this.y /= magnitude;
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
var World = /** @class */ (function () {
    function World() {
        this.objects = [];
    }
    return World;
}());
exports.World = World;


/***/ })

/******/ });
//# sourceMappingURL=model.js.map