import { Obj } from "./object";
import { Vector } from "./vector";
export declare enum DirectIRTriangle {
    LEFT_UP = 0,
    RIGHT_UP = 1,
    RIGHT_BOTTOM = 2,
    LEFT_BOTTOM = 3
}
export declare class IRTriangle extends Obj {
    direct: DirectIRTriangle;
    private _size;
    constructor();
    size: number;
    pos: Vector;
    updatePos(value?: Vector): void;
    _setBounds(): void;
}
