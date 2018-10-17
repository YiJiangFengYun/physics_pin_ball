import { Obj } from "./object";
import { Bullet } from "./bullet";
import * as EventEmitter from "eventemitter3";
import { Collision } from "./collision";
export declare class World extends EventEmitter {
    time: number;
    objectCount: number;
    objects: Obj[];
    bulletCount: number;
    bullets: Bullet[];
    collectionMap: {
        [idsKey: string]: boolean;
    };
    collision: Collision;
    constructor();
    addObj(object: Obj): void;
    removeObj(object: Obj): void;
    clearObjs(): void;
    addBullet(bullet: Bullet): void;
    removeBullet(bullet: Bullet): void;
    clearBullets(): void;
    step(dt: number, iterations: number): void;
}
