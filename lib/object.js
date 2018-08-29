"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("./vector");
var bounds_1 = require("./bounds");
var Obj = /** @class */ (function () {
    function Obj() {
        this._pos = new vector_1.Vector();
        this._bounds = new bounds_1.Bounds();
    }
    Object.defineProperty(Obj.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (value) {
            if (value.x === NaN)
                throw new Error("Pos x is NaN.");
            if (value.y === NaN)
                throw new Error("POs y is NaN.");
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
    Obj.prototype.updatePos = function (value) {
        if (value) {
            this._pos = value;
        }
    };
    return Obj;
}());
exports.Obj = Obj;
//# sourceMappingURL=object.js.map