import { Vector } from "./vector";
import { Bounds } from "./bounds";

export abstract class Obj {
    protected _pos:Vector;
    protected _bounds:Bounds;
    constructor() {
        this._pos = new Vector();
        this._bounds = new Bounds();
    }

    get pos():Vector {
        return this._pos;
    }

    set pos(value:Vector) {
        if (value.x === NaN) throw new Error("Pos x is NaN.");
        if (value.y === NaN) throw new Error("POs y is NaN.");
        this._pos.copy(value);
    }

    get bounds():Bounds {
        return this._bounds;
    }

    updatePos(value?:Vector) {
        if (value) {
            this._pos = value;
        }
    }
}