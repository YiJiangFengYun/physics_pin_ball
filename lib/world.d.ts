import { Obj } from "./object";
import { Vector } from "./vector";
import { Bullet } from "./bullet";
import * as EventEmitter from "eventemitter3";
import { Collision } from "./collision";
export interface IItemSpace {
    startRow: number;
    endRow: number;
    startCol: number;
    endCol: number;
}
export declare class World extends EventEmitter {
    static BORDER_COUNT: number;
    static vectorHelper: Vector;
    width: number;
    height: number;
    startX: number;
    startY: number;
    time: number;
    bulletCount: number;
    bullets: Bullet[];
    borders: Obj[];
    itemRowCount: number;
    itemColCount: number;
    itemWidth: number;
    itemHeight: number;
    items: Obj[][];
    objectCount: number;
    objects: Obj[];
    collectionMap: {
        [idsKey: string]: boolean;
    };
    collision: Collision;
    constructor(info: {
        width: number;
        height: number;
        itemRowCount: number;
        itemColCount: number;
    });
    addBorder(border: Obj, index: number): void;
    removeBorder(borderOrIndex: Obj | number): void;
    addItem(item: Obj, row?: number, col?: number): void;
    removeItem(row: number, col: number): void;
    clearItems(): void;
    addBullet(bullet: Bullet): void;
    removeBullet(bullet: Bullet): void;
    clearBullets(): void;
    addObj(object: Obj): void;
    removeObj(object: Obj): void;
    clearObjs(): void;
    step(dt: number, iterations: number): void;
    private _collideObj;
    private _getBulletCoverItemSpaces;
    private _onChangeItemPos;
}
