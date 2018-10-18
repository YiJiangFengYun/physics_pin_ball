import { Vector } from "./vector";

export class Bounds {
    public static intersectBounds(bounds1:Bounds, bounds2:Bounds):boolean {
        if (bounds1.minX > bounds2.maxX || bounds1.maxX < bounds2.minX || 
            bounds1.minY > bounds2.maxY || bounds1.maxY < bounds2.minY) {
            return false;
        } else {
            return true;
        }
    }

    minX:number;
    minY:number;
    maxX:number;
    maxY:number;
    constructor(minX:number = 0, minY:number = 0, maxX:number = 0, maxY:number = 0) {
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    intersect(target:Bounds):boolean {
        return Bounds.intersectBounds(this, target);
    }

    copyFromOffset(target:Bounds, offset:Vector) {
        this.minX = target.minX + offset.x;
        this.minY = target.minY + offset.y;
        this.maxX = target.maxX + offset.x;
        this.maxY = target.maxY + offset.y;
    }
}