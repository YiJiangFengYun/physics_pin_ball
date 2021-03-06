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
var vector_1 = require("./vector");
var bounds_1 = require("./bounds");
var EventEmitter = require("eventemitter3");
var Obj = /** @class */ (function (_super) {
    __extends(Obj, _super);
    function Obj() {
        var _this = _super.call(this) || this;
        _this.valid = true;
        _this.reflexible = true;
        _this.userData = null;
        _this._pos = new vector_1.Vector();
        _this._bounds = new bounds_1.Bounds();
        _this._id = 0;
        _this._id = ++Obj.createdIdCount;
        return _this;
    }
    Object.defineProperty(Obj.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Obj.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (value) {
            this.updatePos(value);
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
            if (isNaN(value.x))
                throw new Error("Pos x is NaN.");
            if (isNaN(value.y))
                throw new Error("POs y is NaN.");
            this._pos.copy(value);
            this._emitChangePos();
        }
    };
    Obj.prototype._emitChangePos = function () {
        this.emit("change_pos");
    };
    Obj.createdIdCount = 0;
    return Obj;
}(EventEmitter));
exports.Obj = Obj;
