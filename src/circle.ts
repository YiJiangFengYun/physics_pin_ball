import { Obj } from "./object";
import { unitSize } from "./unit";
import { Bounds } from "./bounds";
import { Vector } from "./vector";

export class Circle extends Obj {
    private _radius:number;
    constructor() {
        super();
        this._bounds = new Bounds;
        this._radius = unitSize / 2;
    }

    get radius():number {
        return this._radius;
    }

    set pos(value:Vector) {
        var pos = this._pos;
        pos.copy(value);
        var bounds = this._bounds;
        var radius = this._radius;
        bounds.minX = pos.x - radius;
        bounds.minY = pos.y - radius;
        bounds.maxX = pos.x + radius;
        bounds.maxY = pos.y + radius;
    }
}