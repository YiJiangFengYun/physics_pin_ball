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
var rectangle_1 = require("./rectangle");
var Rhombus = /** @class */ (function (_super) {
    __extends(Rhombus, _super);
    function Rhombus() {
        var _this = _super.call(this) || this;
        _this._size = 0;
        var points = [];
        _this._points = points;
        var POINT_COUNT = rectangle_1.Rectangle.POINT_COUNT;
        points.length = POINT_COUNT;
        for (var i = 0; i < POINT_COUNT; ++i) {
            points[i] = new vector_1.Vector();
        }
        _this._setBounds();
        _this._setPoints();
        return _this;
    }
    Object.defineProperty(Rhombus.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = value;
            this._setBounds();
            this._setPoints();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rhombus.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (value) {
            var pos = this._pos;
            pos.copy(value);
            this._setBounds();
            this._setPoints();
        },
        enumerable: true,
        configurable: true
    });
    Rhombus.prototype.updatePos = function (value) {
        _super.prototype.updatePos.call(this, value);
        this._setBounds();
        this._setPoints();
    };
    Object.defineProperty(Rhombus.prototype, "points", {
        get: function () {
            return this._points;
        },
        enumerable: true,
        configurable: true
    });
    Rhombus.prototype._setBounds = function () {
        var pos = this._pos;
        var bounds = this._bounds;
        var halfSize = this._size / 2;
        bounds.minX = pos.x - halfSize;
        bounds.minY = pos.y - halfSize;
        bounds.maxX = pos.x + halfSize;
        bounds.maxY = pos.y + halfSize;
    };
    Rhombus.prototype._setPoints = function () {
        var pos = this._pos;
        var points = this._points;
        var halfSize = this._size / 2;
        points[0].x = pos.x - halfSize;
        points[0].y = pos.y;
        points[1].x = pos.x;
        points[1].y = pos.y - halfSize;
        points[2].x = pos.x + halfSize;
        points[2].y = pos.y;
        points[3].x = pos.x;
        points[3].y = pos.y + halfSize;
    };
    Rhombus.POINT_COUNT = 4;
    return Rhombus;
}(object_1.Obj));
exports.Rhombus = Rhombus;
