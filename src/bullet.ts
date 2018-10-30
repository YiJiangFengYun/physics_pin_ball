import { Circle } from "./circle";
import { Obj } from "./object";
import { Rectangle } from "./rectangle";
import { Vector } from "./vector";
import { IRTriangle } from "./triangle";
import { ICollideResult } from "./collision";

export class Bullet extends Circle {

    private _velocity:Vector;

    constructor() {
        super();
        this._velocity = new Vector();

    }

    get velocity():Vector {
        return this._velocity;
    }

    set velocity(value:Vector) {
        if (isNaN(value.x)) throw new Error("Velocity x is NaN.");
        if (isNaN(value.y)) throw new Error("Velocity y is NaN.");
        this._velocity.copy(value);
    }

    protected _emitChangePos() {
    }

    
}