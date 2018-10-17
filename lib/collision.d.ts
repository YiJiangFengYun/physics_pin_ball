import { Obj } from "./object";
import { Vector } from "./vector";
import { Bullet } from "./bullet";
export interface ICollideResult {
    collided: boolean;
    relected: boolean;
    normal: Vector;
}
export interface ICollision {
    collide(bullet: Bullet, target: Obj, result?: ICollideResult): ICollideResult;
}
export declare class Collision {
    collisionCircle: CollisionCircle;
    collisionRectangle: CollisionRectangle;
    collisionIRTriangle: CollisionIRTriangle;
    collide(bullet: Bullet, target: Obj, result?: ICollideResult): ICollideResult;
}
export declare class CollisionCircle implements ICollision {
    collide(bullet: Bullet, target: Obj, result?: ICollideResult): ICollideResult;
}
export declare class CollisionRectangle implements ICollision {
    collide(bullet: Bullet, target: Obj, result?: ICollideResult): ICollideResult;
}
export declare class CollisionIRTriangle implements ICollision {
    collide(bullet: Bullet, target: Obj, result?: ICollideResult): ICollideResult;
}
