import { Obj } from "./object";
import { Vector } from "./vector";

export class Rectangle extends Obj {
    private _size:Vector;
    static POINT_COUNT:number = 4;
    private _points:Vector[];
    constructor() {
        super();
        this._size = new Vector();
        let points:Vector[] = [];
        this._points = points;
        const POINT_COUNT = Rectangle.POINT_COUNT;
        points.length = POINT_COUNT;
        for (let i = 0; i < POINT_COUNT; ++i) {
            points[i] = new Vector();
        }
        this._setBounds();
        this._setPoints();
    }

    get size() {
        return this._size;
    }

    set size(value:Vector) {
        this._size = value;
        this._setBounds();
        this._setPoints();
    }

    get pos() {
        return this._pos;
    }

    set pos(value:Vector) {
        var pos = this._pos;
        pos.copy(value);
        
        this._setBounds();
        this._setPoints();
        
    }

    updatePos(value?:Vector) {
        super.updatePos(value);
        this._setBounds();
        this._setPoints();
    }

    get points() {
        return this._points;
    }

    _setBounds() {
        let pos = this._pos;
        let size = this._size;
        let bounds = this._bounds;
        let halfWidth = size.x / 2;
        let halfHeight = size.y / 2;
        bounds.minX = pos.x - halfWidth;
        bounds.minY = pos.y - halfHeight;
        bounds.maxX = pos.x + halfWidth;
        bounds.maxY = pos.y + halfHeight;
    }

    _setPoints() {
        let bounds = this._bounds;
        let points = this._points;
        //0 is 0(y)0(x)
        points[0].x = bounds.minX;
        points[0].y = bounds.minY;
        //1 is 0(y)1(x)
        points[1].x = bounds.maxX;
        points[1].y = bounds.minY;
        //3 is 1(y)1(x)
        points[3].x = bounds.maxX;
        points[3].y = bounds.maxY;
        //2 is 1(y)0(x)
        points[2].x = bounds.minX;
        points[2].y = bounds.maxY;
    }
}