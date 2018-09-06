import { Vector } from "./vector";
import { Bounds } from "./bounds";
import * as EventEmitter from "eventemitter3";
export declare abstract class Obj extends EventEmitter {
    valid: Boolean;
    userData: any;
    protected _pos: Vector;
    protected _bounds: Bounds;
    constructor();
    pos: Vector;
    readonly bounds: Bounds;
    updatePos(value?: Vector): void;
}
