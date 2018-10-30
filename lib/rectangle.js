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
        _this._size = new vector_1.Vector();
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
    Object.defineProperty(Rectangle.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size.copy(value);
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
        var size = this._size;
        var bounds = this._bounds;
        var halfWidth = size.x / 2;
        var halfHeight = size.y / 2;
        bounds.minX = pos.x - halfWidth;
        bounds.minY = pos.y - halfHeight;
        bounds.maxX = pos.x + halfWidth;
        bounds.maxY = pos.y + halfHeight;
    };
    Rectangle.prototype._setPoints = function () {
        var bounds = this._bounds;
        var points = this._points;
        //0 is 0(y)0(x)
        points[0].x = bounds.minX;
        points[0].y = bounds.minY;
        //1 is 0(y)1(x)
        points[1].x = bounds.maxX;
        points[1].y = bounds.minY;
        //3 is 1(y)1(x)
        points[3].x = bounds.maxX;
        points[3].y = bounds.maxY;
        //2 is 1(y)0(x)
        points[2].x = bounds.minX;
        points[2].y = bounds.maxY;
    };
    Rectangle.POINT_COUNT = 4;
    return Rectangle;
}(object_1.Obj));
exports.Rectangle = Rectangle;
