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
var rectangle_1 = require("./rectangle");
var vector_1 = require("./vector");
var triangle_1 = require("./triangle");
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
            if (isNaN(value.x))
                throw new Error("Velocity x is NaN.");
            if (isNaN(value.y))
                throw new Error("Velocity y is NaN.");
            this._velocity.copy(value);
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
                        // Vector.subVectors(circleCenter, points[i], pointHelper);
                        vector_1.Vector.subVectors(points[i], targetSquare.pos, pointHelper);
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
                                    // Vector.subVectors(circleCenter, point, pointHelper);
                                    vector_1.Vector.subVectors(point, targetTriangle.pos, pointHelper);
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
