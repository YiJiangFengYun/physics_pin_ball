import { Obj } from "./object";
import { Bounds } from "./bounds";
import { Vector } from "./vector";

export class Circle extends Obj {
    private _radius:number;
    public constructor() {
        super();
        this._radius = 0;
        this._setBounds();
    }

    public get radius():number {
        return this._radius;
    }

    public set radius(value:number) {
        this._radius = value;
        this._setBounds();
    }

    public get pos() {
        return this._pos;
    }

    public set pos(value:Vector) {
        var pos = this._pos;
        pos.copy(value);
        this._setBounds();
    }

    public updatePos(value?:Vector) {
        super.updatePos(value);
        this._setBounds();
    }

    private _setBounds() {
        let pos = this._pos;
        var bounds = this._bounds;
        var radius = this._radius;
        bounds.minX = pos.x - radius;
        bounds.minY = pos.y - radius;
        bounds.maxX = pos.x + radius;
        bounds.maxY = pos.y + radius;
    }
}