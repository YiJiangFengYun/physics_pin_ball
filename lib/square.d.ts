import { Obj } from "./object";
import { Vector } from "./vector";
export declare class Square extends Obj {
    private _size;
    static POINT_COUNT: number;
    private _points;
    constructor();
    size: number;
    pos: Vector;
    readonly points: Vector[];
}
