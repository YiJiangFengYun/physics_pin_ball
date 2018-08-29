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
