import { Obj } from "./object";
import { Vector } from "./vector";
export declare class Rectangle extends Obj {
    private _size;
    static POINT_COUNT: number;
    private _points;
    constructor();
    size: Vector;
    pos: Vector;
    updatePos(value?: Vector): void;
    readonly points: Vector[];
    _setBounds(): void;
    _setPoints(): void;
}
