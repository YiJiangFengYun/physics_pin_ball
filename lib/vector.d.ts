export declare class Vector {
    static subVectors(vec1: Vector, vec2: Vector, result?: Vector): Vector;
    static addVectors(vec1: Vector, vec2: Vector, result?: Vector): Vector;
    static mulVectorMag(vec: Vector, magnitude: number, result?: Vector): Vector;
    static normalVector(vec: Vector, result?: Vector): Vector;
    static dotVectors(vec1: Vector, vec2: Vector): number;
    static reflectVector(vec: Vector, normal: Vector, result?: Vector): Vector;
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    clone(): Vector;
    copy(target: Vector): void;
    sub(target: Vector): void;
    add(target: Vector): void;
    mulMag(magnitude: number): void;
    magnitude(): number;
    manitudeSquare(): number;
    normal(): void;
    zero(): void;
    isZero(): boolean;
}
