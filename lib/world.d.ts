import { Obj } from "./object";
import { MyCircle } from "./my_circle";
export declare class World {
    time: number;
    objectCount: number;
    objects: Obj[];
    myCircleCount: number;
    myCircles: MyCircle[];
    constructor();
    addObj(object: Obj): void;
    removeObj(object: Obj): void;
    clearObjs(): void;
    addMyCircle(myCircle: MyCircle): void;
    removeMyCircle(myCircle: MyCircle): void;
    clearMyCircles(): void;
    step(dt: number, iterations: number): void;
}
