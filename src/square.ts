import { Obj } from "./object";
import { unitSize } from "./unit";
import { Vector } from "./vector";

export class Square extends Obj {
    constructor() {
        super();
    }

    get size() {
        return unitSize;
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
    }
}