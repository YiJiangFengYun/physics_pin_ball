import { Obj } from "./object";
import { Vector } from "./vector";
export declare class Circle extends Obj {
    private _radius;
    constructor();
    radius: number;
    pos: Vector;
    _setBounds(): void;
}
