import { Obj } from "./object";
import { Bounds } from "./bounds";
import { Vector } from "./vector";

export class Circle extends Obj {
    private _radius:number;
    constructor() {
        super();
        this._radius = 0;
        this._setBounds();
    }

    get radius():number {
        return this._radius;
    }

    set radius(value:number) {
        this._radius = value;
    }

    get pos() {
        return this._pos;
    }

    set pos(value:Vector) {
        var pos = this._pos;
        pos.copy(value);
        this._setBounds();
    }

    _setBounds() {
        let pos = this._pos;
        var bounds = this._bounds;
        var radius = this._radius;
        bounds.minX = pos.x - radius;
        bounds.minY = pos.y - radius;
        bounds.maxX = pos.x + radius;
        bounds.maxY = pos.y + radius;
    }
}