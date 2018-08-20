import { Obj } from "./object";
import { Vector } from "./vector";

export class Rectangle extends Obj {
    private _width:number;
    private _height:number;
    static POINT_COUNT:number = 4;
    private _points:Vector[];
    constructor() {
        super();
        this._width = 0;
        this._height = 0;
        let points:Vector[] = [];
        this._points = points;
        const POINT_COUNT = Rectangle.POINT_COUNT;
        points.length = POINT_COUNT;
        for (let i = 0; i < POINT_COUNT; ++i) {
            points[i] = new Vector();
        }
    }

    get width() {
        return this._width;
    }

    set width(value:number) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value:number) {
        this._height = value;
    }

    get pos() {
        return this._pos;
    }

    set pos(value:Vector) {
        var pos = this._pos;
        pos.copy(value);
        var bounds = this._bounds;
        var halfWidth = this._width / 2;
        var halfHeight = this._height / 2;
        bounds.minX = pos.x - halfWidth;
        bounds.minY = pos.y - halfHeight;
        bounds.maxX = pos.x + halfWidth;
        bounds.maxY = pos.y + halfHeight;

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