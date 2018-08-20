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
var object_1 = require("./object");
var unit_1 = require("./unit");
var vector_1 = require("./vector");
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square() {
        var _this = _super.call(this) || this;
        var points = [];
        _this._points = points;
        var POINT_COUNT = Square.POINT_COUNT;
        points.length = POINT_COUNT;
        for (var i = 0; i < POINT_COUNT; ++i) {
            points[i] = new vector_1.Vector();
        }
        return _this;
    }
    Object.defineProperty(Square.prototype, "size", {
        get: function () {
            return unit_1.unitSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (value) {
            var pos = this._pos;
            pos.copy(value);
            var bounds = this._bounds;
            var halfSize = this.size / 2;
            bounds.minX = pos.x - halfSize;
            bounds.minY = pos.y - halfSize;
            bounds.maxX = pos.x + halfSize;
            bounds.maxY = pos.y + halfSize;
            var points = this._points;
            points[0].x = bounds.minX;
            points[0].y = bounds.minY;
            points[1].x = bounds.maxX;
            points[1].y = bounds.minY;
            points[2].x = bounds.maxX;
            points[2].y = bounds.maxY;
            points[3].x = bounds.minX;
            points[3].y = bounds.maxY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "points", {
        get: function () {
            return this._points;
        },
        enumerable: true,
        configurable: true
    });
    Square.POINT_COUNT = 4;
    return Square;
}(object_1.Obj));
exports.Square = Square;
//# sourceMappingURL=square.js.map