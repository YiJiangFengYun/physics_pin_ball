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
