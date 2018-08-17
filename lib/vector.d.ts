export declare class Vector {
    static subVectors(vec1: Vector, vec2: Vector, result?: Vector): Vector;
    static addVectors(vec1: Vector, vec2: Vector, result?: Vector): Vector;
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    clone(): Vector;
    copy(target: Vector): void;
    sub(target: Vector): void;
    add(target: Vector): void;
    magnitude(): number;
    normal(): void;
}
