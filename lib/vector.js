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
//# sourceMappingURL=vector.js.map