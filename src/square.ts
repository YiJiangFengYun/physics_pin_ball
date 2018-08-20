import { Obj } from "./object";
import { Vector } from "./vector";

export class Square extends Obj {
    private _size:number;
    static POINT_COUNT:number = 4;
    private _points:Vector[];
    constructor() {
        super();
        this._size = 0;
        let points:Vector[] = [];
        this._points = points;
        const POINT_COUNT = Square.POINT_COUNT;
        points.length = POINT_COUNT;
        for (let i = 0; i < POINT_COUNT; ++i) {
            points[i] = new Vector();
        }
    }

    get size() {
        return this._size;
    }

    set size(value:number) {
        this._size = value;
    }

    get pos() {
        return this._pos;
    }

    set pos(value:Vector) {
        var pos = this._pos;
        pos.copy(value);
        var bounds = this._bounds;
        var halfSize = this.size / 2;
        bounds.minX = pos.x - halfSize;
        bounds.minY = pos.y - halfSize;
        bounds.maxX = pos.x + halfSize;
        bounds.maxY = pos.y + halfSize;

        let points = this._points;
        points[0].x = bounds.minX;
        points[0].y = bounds.minY;
        points[1].x = bounds.maxX;
        points[1].y = bounds.minY;
        points[2].x = bounds.maxX;
        points[2].y = bounds.maxY;
        points[3].x = bounds.minX;
        points[3].y = bounds.maxY;
    }

    get points() {
        return this._points;
    }
}