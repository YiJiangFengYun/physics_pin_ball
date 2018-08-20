import { Obj } from "./object";
import { Vector } from "./vector";
export declare class Rectangle extends Obj {
    private _width;
    private _height;
    static POINT_COUNT: number;
    private _points;
    constructor();
    width: number;
    height: number;
    pos: Vector;
    readonly points: Vector[];
}
