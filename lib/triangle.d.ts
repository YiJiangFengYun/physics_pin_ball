import { Obj } from "./object";
import { Vector } from "./vector";
export declare enum DirectIRTriangle {
    LEFT_UP = 0,
    RIGHT_UP = 1,
    RIGHT_BOTTOM = 3,
    LEFT_BOTTOM = 2
}
export declare class IRTriangle extends Obj {
    direct: DirectIRTriangle;
    private _size;
    static POINT_COUNT: number;
    private _points;
    constructor();
    size: number;
    pos: Vector;
    updatePos(value?: Vector): void;
    readonly points: Vector[];
    _setBounds(): void;
    _setPoints(): void;
}
