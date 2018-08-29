import { Obj } from "./object";
import { Vector } from "./vector";
import { Rectangle } from "./rectangle";

//Right angle direct.
export enum DirectIRTriangle {
    NEG_NEG = 0,
    POS_NEG = 1,
    POS_POS = 3,
    NEG_POS = 2,
}

export class IRTriangle extends Obj {
    public direct:DirectIRTriangle;
    private _size:number;
    static POINT_COUNT:number = 4;
    private _points:Vector[];
    constructor() {
        super();
        this._size = 0;
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

    set size(value:number) {
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
        let bounds = this._bounds;
        let halfSize = this._size / 2;
        bounds.minX = pos.x - halfSize;
        bounds.minY = pos.y - halfSize;
        bounds.maxX = pos.x + halfSize;
        bounds.maxY = pos.y + halfSize;
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