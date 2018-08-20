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
var vector_1 = require("./vector");
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
        return _this;
    }
    Object.defineProperty(Rectangle.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
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
            var bounds = this._bounds;
            var halfWidth = this._width / 2;
            var halfHeight = this._height / 2;
            bounds.minX = pos.x - halfWidth;
            bounds.minY = pos.y - halfHeight;
            bounds.maxX = pos.x + halfWidth;
            bounds.maxY = pos.y + halfHeight;
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
    Object.defineProperty(Rectangle.prototype, "points", {
        get: function () {
            return this._points;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.POINT_COUNT = 4;
    return Rectangle;
}(object_1.Obj));
exports.Rectangle = Rectangle;
//# sourceMappingURL=rectangle.js.map