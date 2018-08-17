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
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Square.prototype, "size", {
        get: function () {
            return unit_1.unitSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "pos", {
        set: function (value) {
            var pos = this._pos;
            pos.copy(value);
            var bounds = this._bounds;
            var halfSize = this.size / 2;
            bounds.minX = pos.x - halfSize;
            bounds.minY = pos.y - halfSize;
            bounds.maxX = pos.x + halfSize;
            bounds.maxY = pos.y + halfSize;
        },
        enumerable: true,
        configurable: true
    });
    return Square;
}(object_1.Obj));
exports.Square = Square;
//# sourceMappingURL=square.js.map