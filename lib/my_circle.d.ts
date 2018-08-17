import { Circle } from "./circle";
import { Obj } from "./object";
import { Vector } from "./vector";
export declare class MyCircle extends Circle {
    constructor();
    collide(target: Obj, result?: {
        collided: boolean;
        normal: Vector;
    }): {
        collided: boolean;
        normal: Vector;
    };
}
