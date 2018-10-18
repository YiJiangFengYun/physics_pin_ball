"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("./vector");
var circle_1 = require("./circle");
var rectangle_1 = require("./rectangle");
var triangle_1 = require("./triangle");
var rhombus_1 = require("./rhombus");
var Collision = /** @class */ (function () {
    function Collision() {
        this.collisionCircle = new CollisionCircle();
        this.collisionRectangle = new CollisionRectangle();
        this.collisionIRTriangle = new CollisionIRTriangle();
        this.collisionRhombus = new CollisionRhombus();
    }
    Collision.prototype.collide = function (bullet, target, result) {
        var reflexible = bullet.reflexible && target.reflexible;
        if (result == null)
            result = {
                collided: false,
                relected: reflexible,
                normal: new vector_1.Vector(),
            };
        else {
            result.collided = false;
            result.relected = reflexible;
            result.normal.zero();
        }
        if (target instanceof circle_1.Circle) {
            this.collisionCircle.collide(bullet, target, result);
        }
        else if (target instanceof rectangle_1.Rectangle) {
            this.collisionRectangle.collide(bullet, target, result);
        }
        else if (target instanceof triangle_1.IRTriangle) {
            this.collisionIRTriangle.collide(bullet, target, result);
        }
        else if (target instanceof rhombus_1.Rhombus) {
            this.collisionRhombus.collide(bullet, target, result);
        }
        else {
            throw new Error("Invalid shape for collision detection.");
        }
        return result;
    };
    return Collision;
}());
exports.Collision = Collision;
var CollisionCircle = /** @class */ (function () {
    function CollisionCircle() {
    }
    CollisionCircle.prototype.collide = function (bullet, target, result) {
        var reflexible = bullet.reflexible && target.reflexible;
        var targetCircle = target;
        if (bullet.bounds.intersect(targetCircle.bounds)) {
            var normal = vector_1.Vector.subVectors(bullet.pos, targetCircle.pos);
            var distance = normal.magnitude();
            if (distance < (bullet.radius + targetCircle.radius)) {
                result.collided = true;
                if (reflexible) {
                    normal.normal();
                    result.normal.copy(normal);
                }
            }
        }
        return;
    };
    return CollisionCircle;
}());
exports.CollisionCircle = CollisionCircle;
var CollisionRectangle = /** @class */ (function () {
    function CollisionRectangle() {
    }
    CollisionRectangle.prototype.collide = function (bullet, target, result) {
        var reflexible = bullet.reflexible && target.reflexible;
        var targetSquare = target;
        if (bullet.bounds.intersect(targetSquare.bounds)) {
            var circleCenter = bullet.pos;
            var circleCenterX = circleCenter.x;
            var circleCenterY = circleCenter.y;
            var circleRadius = bullet.radius;
            var squareBounds = targetSquare.bounds;
            if (circleCenterX > squareBounds.minX && circleCenterX < squareBounds.maxX) {
                if (circleCenterY > squareBounds.minY && circleCenterY < squareBounds.maxY) {
                    //The center is inside the bounds (namely, inside the square).
                    result.collided = true;
                    if (reflexible)
                        vector_1.Vector.normalVector(bullet.velocity, result.normal);
                }
                else if (circleCenterY > squareBounds.maxY) {
                    //The center is downside the bounds.
                    if (circleCenterY - squareBounds.maxY < circleRadius) {
                        result.collided = true;
                        if (reflexible)
                            result.normal = new vector_1.Vector(0, 1);
                    }
                }
                else if (circleCenterY < squareBounds.minY) {
                    //The center is upside the bounds.
                    if (squareBounds.minY - circleCenterY < circleRadius) {
                        result.collided = true;
                        if (reflexible)
                            result.normal = new vector_1.Vector(0, -1);
                    }
                }
            }
            else if (circleCenterY > squareBounds.minY && circleCenterY < squareBounds.maxY) {
                if (circleCenterX > squareBounds.maxX) {
                    //The center is right of the bounds.
                    if (circleCenterX - squareBounds.maxX < circleRadius) {
                        result.collided = true;
                        if (reflexible)
                            result.normal = new vector_1.Vector(1, 0);
                    }
                }
                else if (circleCenterX < squareBounds.minX) {
                    //The center is left of the bounds.
                    if (squareBounds.minX - circleCenterX < circleRadius) {
                        result.collided = true;
                        if (reflexible)
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
                        if (reflexible)
                            vector_1.Vector.normalVector(pointHelper, result.normal);
                        break;
                    }
                }
            }
        }
        return result;
    };
    return CollisionRectangle;
}());
exports.CollisionRectangle = CollisionRectangle;
var CollisionIRTriangle = /** @class */ (function () {
    function CollisionIRTriangle() {
    }
    CollisionIRTriangle.prototype.collide = function (bullet, target, result) {
        var reflexible = bullet.reflexible && target.reflexible;
        var targetTriangle = target;
        if (bullet.bounds.intersect(targetTriangle.bounds)) {
            var circleCenter = bullet.pos;
            var circleCenterPos = [circleCenter.x, circleCenter.y];
            var circleRadius = bullet.radius;
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
                                    if (reflexible)
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
                                        if (reflexible)
                                            result.normal = new vector_1.Vector(areaX - 1, 0);
                                    }
                                }
                                else {
                                    if (Math.abs(point.y - circleCenterPos[1]) < circleRadius) {
                                        result.collided = true;
                                        if (reflexible)
                                            result.normal = new vector_1.Vector(0, areaY - 1);
                                    }
                                }
                            }
                        }
                        else {
                            var vectorTriangleToCenter = vector_1.Vector.subVectors(bullet.pos, targetTriangle.pos);
                            var points = targetTriangle.points;
                            //Right angle point.
                            var point = points[targetTriangle.direct];
                            var normal = vector_1.Vector.subVectors(targetTriangle.pos, point);
                            normal.normal();
                            var dot = vector_1.Vector.dotVectors(vectorTriangleToCenter, normal);
                            var circleRadius_1 = bullet.radius;
                            if (dot < circleRadius_1) {
                                result.collided = true;
                                if (reflexible)
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
        return;
    };
    return CollisionIRTriangle;
}());
exports.CollisionIRTriangle = CollisionIRTriangle;
var CollisionRhombus = /** @class */ (function () {
    function CollisionRhombus() {
    }
    CollisionRhombus.prototype.collide = function (bullet, target, result) {
        var reflexible = bullet.reflexible && target.reflexible;
        var targetRhombus = target;
        if (bullet.bounds.intersect(targetRhombus.bounds)) {
            var circleCenter = bullet.pos;
            var circleCenterX = circleCenter.x;
            var circleCenterY = circleCenter.y;
            var circleRadius = bullet.radius;
            var cosSin45 = CollisionRhombus.COS_SIN_45;
            var circleCenterXRelateTarget = circleCenterX - target.pos.x;
            var circleCenterYRelateTarget = circleCenterY - target.pos.y;
            var circleCenterXRotate = (circleCenterXRelateTarget + circleCenterYRelateTarget) * cosSin45;
            var circleCenterYRotate = (-circleCenterXRelateTarget + circleCenterYRelateTarget) * cosSin45;
            var halfMinSize = targetRhombus.size * cosSin45;
            if (circleCenterXRotate > -halfMinSize && circleCenterXRotate < halfMinSize) {
                if (circleCenterYRotate > -halfMinSize && circleCenterYRotate < halfMinSize) {
                    //The center is inside the bounds (namely, inside the square).
                    result.collided = true;
                    if (reflexible)
                        vector_1.Vector.normalVector(bullet.velocity, result.normal);
                }
                else if (circleCenterYRotate > halfMinSize) {
                    if (circleCenterYRotate - halfMinSize < circleRadius) {
                        result.collided = true;
                        if (reflexible)
                            result.normal = new vector_1.Vector(-cosSin45, cosSin45);
                    }
                }
                else if (circleCenterYRotate < -halfMinSize) {
                    if (-halfMinSize - circleCenterYRotate < circleRadius) {
                        result.collided = true;
                        if (reflexible)
                            result.normal = new vector_1.Vector(cosSin45, -cosSin45);
                    }
                }
            }
            else if (circleCenterYRotate > -halfMinSize && circleCenterYRotate < halfMinSize) {
                if (circleCenterXRotate > halfMinSize) {
                    if (circleCenterXRotate - halfMinSize < circleRadius) {
                        result.collided = true;
                        if (reflexible)
                            result.normal = new vector_1.Vector(cosSin45, cosSin45);
                    }
                }
                else if (circleCenterXRotate < -halfMinSize) {
                    if (-halfMinSize - circleCenterXRotate < circleRadius) {
                        result.collided = true;
                        if (reflexible)
                            result.normal = new vector_1.Vector(-cosSin45, -cosSin45);
                    }
                }
            }
            else {
                //Detect if any point of square is inside the circle.
                var points = targetRhombus.points;
                var pointCount = points.length;
                var pointHelper = new vector_1.Vector();
                var circleRadiusSquare = circleRadius * circleRadius;
                for (var i = 0; i < pointCount; ++i) {
                    vector_1.Vector.subVectors(circleCenter, points[i], pointHelper);
                    if (pointHelper.manitudeSquare() < circleRadiusSquare) {
                        //The point is inside the circle.
                        result.collided = true;
                        if (reflexible)
                            vector_1.Vector.normalVector(pointHelper, result.normal);
                        break;
                    }
                }
            }
        }
        return result;
    };
    CollisionRhombus.COS_SIN_45 = Math.sqrt(2) / 2;
    return CollisionRhombus;
}());
exports.CollisionRhombus = CollisionRhombus;
