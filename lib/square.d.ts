import { Obj } from "./object";
import { Vector } from "./vector";
export declare class Square extends Obj {
    static POINT_COUNT: number;
    private _points;
    constructor();
    readonly size: number;
    pos: Vector;
    readonly points: Vector[];
}
