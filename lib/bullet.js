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
var circle_1 = require("./circle");
var vector_1 = require("./vector");
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super.call(this) || this;
        _this._velocity = new vector_1.Vector();
        return _this;
    }
    Object.defineProperty(Bullet.prototype, "velocity", {
        get: function () {
            return this._velocity;
        },
        set: function (value) {
            if (isNaN(value.x))
                throw new Error("Velocity x is NaN.");
            if (isNaN(value.y))
                throw new Error("Velocity y is NaN.");
            this._velocity.copy(value);
        },
        enumerable: true,
        configurable: true
    });
    Bullet.prototype._emitChangePos = function () {
    };
    return Bullet;
}(circle_1.Circle));
exports.Bullet = Bullet;
