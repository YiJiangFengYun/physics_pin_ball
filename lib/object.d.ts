import { Vector } from "./vector";
import { Bounds } from "./bounds";
export declare abstract class Obj {
    protected _pos: Vector;
    protected _bounds: Bounds;
    protected _velocity: Vector;
    constructor();
    pos: Vector;
    readonly bounds: Bounds;
    velocity: Vector;
}
