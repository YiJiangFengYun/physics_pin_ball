"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("./vector");
var bounds_1 = require("./bounds");
var Obj = /** @class */ (function () {
    function Obj() {
        this._pos = new vector_1.Vector();
        this._bounds = new bounds_1.Bounds();
        this._velocity = new vector_1.Vector();
    }
    Object.defineProperty(Obj.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (value) {
            this._pos.copy(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Obj.prototype, "bounds", {
        get: function () {
            return this._bounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Obj.prototype, "velocity", {
        get: function () {
            return this._velocity;
        },
        set: function (value) {
            this._velocity = value;
        },
        enumerable: true,
        configurable: true
    });
    return Obj;
}());
exports.Obj = Obj;
//# sourceMappingURL=object.js.map