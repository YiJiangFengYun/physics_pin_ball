import { Obj } from "./object";
import { Vector } from "./vector";
export declare enum DirectIRTriangle {
    NEG_NEG = 0,
    POS_NEG = 1,
    POS_POS = 3,
    NEG_POS = 2
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
