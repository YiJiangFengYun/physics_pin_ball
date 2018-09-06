import { Vector } from "./vector";
import { Bounds } from "./bounds";
import * as EventEmitter from "eventemitter3";

export abstract class Obj extends EventEmitter {
    public valid:Boolean;
    protected _pos:Vector;
    protected _bounds:Bounds;
    constructor() {
        super();
        this._pos = new Vector();
        this._bounds = new Bounds();
        this.valid = true;
    }

    get pos():Vector {
        return this._pos;
    }

    set pos(value:Vector) {
        if (isNaN(value.x)) throw new Error("Pos x is NaN.");
        if (isNaN(value.y)) throw new Error("POs y is NaN.");
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