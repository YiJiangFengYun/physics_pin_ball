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
//Right angle direct.
var DirectIRTriangle;
(function (DirectIRTriangle) {
    DirectIRTriangle[DirectIRTriangle["NEG_NEG"] = 0] = "NEG_NEG";
    DirectIRTriangle[DirectIRTriangle["POS_NEG"] = 1] = "POS_NEG";
    DirectIRTriangle[DirectIRTriangle["POS_POS"] = 3] = "POS_POS";
    DirectIRTriangle[DirectIRTriangle["NEG_POS"] = 2] = "NEG_POS";
})(DirectIRTriangle = exports.DirectIRTriangle || (exports.DirectIRTriangle = {}));
var IRTriangle = /** @class */ (function (_super) {
    __extends(IRTriangle, _super);
    function IRTriangle() {
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
    Object.defineProperty(IRTriangle.prototype, "size", {
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
    Object.defineProperty(IRTriangle.prototype, "pos", {
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
    IRTriangle.prototype.updatePos = function (value) {
        _super.prototype.updatePos.call(this, value);
        this._setBounds();
        this._setPoints();
    };
    Object.defineProperty(IRTriangle.prototype, "points", {
        get: function () {
            return this._points;
        },
        enumerable: true,
        configurable: true
    });
    IRTriangle.prototype._setBounds = function () {
        var pos = this._pos;
        var bounds = this._bounds;
        var halfSize = this._size / 2;
        bounds.minX = pos.x - halfSize;
        bounds.minY = pos.y - halfSize;
        bounds.maxX = pos.x + halfSize;
        bounds.maxY = pos.y + halfSize;
    };
    IRTriangle.prototype._setPoints = function () {
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
    IRTriangle.POINT_COUNT = 4;
    return IRTriangle;
}(object_1.Obj));
exports.IRTriangle = IRTriangle;
//# sourceMappingURL=triangle.js.map