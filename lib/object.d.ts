import { Vector } from "./vector";
import { Bounds } from "./bounds";
export declare abstract class Obj {
    valid: Boolean;
    protected _pos: Vector;
    protected _bounds: Bounds;
    constructor();
    pos: Vector;
    readonly bounds: Bounds;
    updatePos(value?: Vector): void;
}
