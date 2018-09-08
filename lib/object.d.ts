import { Vector } from "./vector";
import { Bounds } from "./bounds";
import * as EventEmitter from "eventemitter3";
export declare abstract class Obj extends EventEmitter {
    valid: Boolean;
    reflexible: boolean;
    userData: any;
    protected _pos: Vector;
    protected _bounds: Bounds;
    private static createdIdCount;
    private _id;
    constructor();
    readonly id: number;
    pos: Vector;
    readonly bounds: Bounds;
    updatePos(value?: Vector): void;
}
