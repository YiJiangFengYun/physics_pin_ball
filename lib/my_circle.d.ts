import { Circle } from "./circle";
import { Obj } from "./object";
import { Vector } from "./vector";
export interface ICollideResult {
    collided: boolean;
    normal: Vector;
}
export declare class MyCircle extends Circle {
    private _velocity;
    constructor();
    velocity: Vector;
    collide(target: Obj, result?: ICollideResult): ICollideResult;
}
