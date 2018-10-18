import { Obj } from "./object";
import { Vector } from "./vector";
import { Rectangle } from "./rectangle";

export class Rhombus extends Obj {
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
        let pos = this._pos;
        let points = this._points;
        let halfSize = this._size / 2;
        points[0].x = pos.x - halfSize;
        points[0].y = pos.y
        points[1].x = pos.x;
        points[1].y = pos.y - halfSize;
        points[3].x = pos.x + halfSize;
        points[3].y = pos.y;
        points[2].x = pos.x;
        points[2].y = pos.y + halfSize;
    }
    // private _size:number = 0;
    // private _rectangle:Rectangle = new Rectangle();
    // private _angle:number = Math.PI / 2;
    // private _rhombusToRectangle:number = Math.sqrt(2) / 2;
    // constructor() {
    //     super();
    //     this._setBounds();
    //     this._setRectangle();
    // }

    // get size() {
    //     return this._size;
    // }

    // set size(size:number) {
    //     this._size = size;
    //     this._setBounds();
    //     this._setRectangle();
    // }

    // get pos() {
    //     return this._pos;
    // }

    // set pos(value:Vector) {
    //     var pos = this._pos;
    //     pos.copy(value);
    //     this._setBounds();
    //     this._setRectangle();
    // }

    // updatePos(value?:Vector) {
    //     super.updatePos(value);
    //     this._setBounds();
    //     this._setRectangle();
    // }

    // _setBounds() {
    //     let pos = this._pos;
    //     let size = this._size;
    //     let bounds = this._bounds;
    //     let halfSize = size / 2;

    //     bounds.minX = pos.x - halfSize;
    //     bounds.minY = pos.y - halfSize;
    //     bounds.maxX = pos.x + halfSize;
    //     bounds.maxY = pos.y + halfSize;
    // }

    // _setRectangle() {
    //     let pos
    //     let rectangle = this._rectangle;
    //     let size = this._size;
    //     let rectangleSize = size * this._rhombusToRectangle;
    //     rectangle.size = new Vector(rectangleSize, rectangleSize);
    // }
}