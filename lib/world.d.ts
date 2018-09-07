import { Obj } from "./object";
import { Bullet } from "./bullet";
import * as EventEmitter from "eventemitter3";
export declare class World extends EventEmitter {
    time: number;
    objectCount: number;
    objects: Obj[];
    bulletCount: number;
    bullets: Bullet[];
    constructor();
    addObj(object: Obj): void;
    removeObj(object: Obj): void;
    clearObjs(): void;
    addbullet(bullet: Bullet): void;
    removebullet(bullet: Bullet): void;
    clearbullets(): void;
    step(dt: number, iterations: number): void;
}
