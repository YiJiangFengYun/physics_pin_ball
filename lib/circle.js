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
var bounds_1 = require("./bounds");
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        var _this = _super.call(this) || this;
        _this._bounds = new bounds_1.Bounds;
        _this._radius = unit_1.unitSize / 2;
        return _this;
    }
    Object.defineProperty(Circle.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "pos", {
        set: function (value) {
            var pos = this._pos;
            pos.copy(value);
            var bounds = this._bounds;
            var radius = this._radius;
            bounds.minX = pos.x - radius;
            bounds.minY = pos.y - radius;
            bounds.maxX = pos.x + radius;
            bounds.maxY = pos.y + radius;
        },
        enumerable: true,
        configurable: true
    });
    return Circle;
}(object_1.Obj));
exports.Circle = Circle;
//# sourceMappingURL=circle.js.map