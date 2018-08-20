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