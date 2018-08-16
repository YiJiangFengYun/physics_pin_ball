import { Vector } from "./vector";
import { Bounds } from "./bounds";

export abstract class Obj {
    protected _pos:Vector;
    protected _bounds:Bounds;
    protected _velocity:Vector;
    constructor() {
        this._pos = new Vector();
        this._bounds = new Bounds();
        this._velocity = new Vector();
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

    get velocity():Vector {
        return this._velocity;
    }

    set velocity(value:Vector) {
        this._velocity = value;
    }
}