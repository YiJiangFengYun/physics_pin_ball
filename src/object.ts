import { Vector } from "./vector";
import { Bounds } from "./bounds";
import * as EventEmitter from "eventemitter3";

export abstract class Obj extends EventEmitter {
    public valid:Boolean = true;
    public reflexible:boolean = true;
    public userData:any = null;
    protected _pos:Vector = new Vector();
    protected _bounds:Bounds = new Bounds();

    private static createdIdCount = 0;
    private _id:number = 0;
    constructor() {
        super();
        this._id = ++Obj.createdIdCount;
    }

    public get id() {
        return this._id;
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