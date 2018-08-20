import { Obj } from "./object";
import { MyCircle } from "./my_circle";
export declare class World {
    time: number;
    objectCount: number;
    objects: Obj[];
    myObj: MyCircle;
    constructor();
    addObj(object: Obj): void;
    removeObj(object: Obj): void;
    clear(): void;
    readonly myObject: MyCircle;
    step(dt: number, iterations: number): void;
}
