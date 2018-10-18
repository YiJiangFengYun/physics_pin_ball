import { Vector } from "./vector";
export declare class Bounds {
    static intersectBounds(bounds1: Bounds, bounds2: Bounds): boolean;
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    constructor(minX?: number, minY?: number, maxX?: number, maxY?: number);
    intersect(target: Bounds): boolean;
    copyFromOffset(target: Bounds, offset: Vector): void;
}
