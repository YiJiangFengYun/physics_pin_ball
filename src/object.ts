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
    public constructor() {
        super();
        this._id = ++Obj.createdIdCount;
    }

    public get id() {
        return this._id;
    }

    public get pos():Vector {
        return this._pos;
    }

    public set pos(value:Vector) {
        this.updatePos(value);
    }

    public get bounds():Bounds {
        return this._bounds;
    }

    public updatePos(value?:Vector) {
        if (value) {
            if (isNaN(value.x)) throw new Error("Pos x is NaN.");
            if (isNaN(value.y)) throw new Error("POs y is NaN.");
            this._pos.copy(value);
            this._emitChangePos();
        }
    }

    protected _emitChangePos() {
        this.emit("change_pos");
    }



}