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
var circle_1 = require("./circle");
var square_1 = require("./square");
var vector_1 = require("./vector");
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
        else if (target instanceof square_1.Square) {
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
//# sourceMappingURL=my_circle.js.map