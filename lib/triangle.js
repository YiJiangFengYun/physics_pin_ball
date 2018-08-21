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
var DirectIRTriangle;
(function (DirectIRTriangle) {
    DirectIRTriangle[DirectIRTriangle["LEFT_UP"] = 0] = "LEFT_UP";
    DirectIRTriangle[DirectIRTriangle["RIGHT_UP"] = 1] = "RIGHT_UP";
    DirectIRTriangle[DirectIRTriangle["RIGHT_BOTTOM"] = 2] = "RIGHT_BOTTOM";
    DirectIRTriangle[DirectIRTriangle["LEFT_BOTTOM"] = 3] = "LEFT_BOTTOM";
})(DirectIRTriangle = exports.DirectIRTriangle || (exports.DirectIRTriangle = {}));
var IRTriangle = /** @class */ (function (_super) {
    __extends(IRTriangle, _super);
    function IRTriangle() {
        var _this = _super.call(this) || this;
        _this._size = 0;
        _this._setBounds();
        return _this;
    }
    Object.defineProperty(IRTriangle.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = value;
            this._setBounds();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IRTriangle.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (value) {
            this._pos.copy(value);
            this._setBounds();
        },
        enumerable: true,
        configurable: true
    });
    IRTriangle.prototype.updatePos = function (value) {
        _super.prototype.updatePos.call(this, value);
        this._setBounds();
    };
    IRTriangle.prototype._setBounds = function () {
        var pos = this._pos;
        var bounds = this._bounds;
        var size = this._size;
        var halfSize = size / 2;
        bounds.minX = pos.x - halfSize;
        bounds.minY = pos.y - halfSize;
        bounds.maxX = pos.x + halfSize;
        bounds.maxY = pos.y + halfSize;
    };
    return IRTriangle;
}(object_1.Obj));
exports.IRTriangle = IRTriangle;
//# sourceMappingURL=triangle.js.map