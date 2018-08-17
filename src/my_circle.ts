import { Circle } from "./circle";
import { Obj } from "./object";
import { Square } from "./square";
import { Vector } from "./vector";

export class MyCircle extends Circle {

    constructor() {
        super();
    }

    collide(target:Obj, result?:{collided: boolean; normal:Vector;}) {
        if (result == null) result = {
                collided: false,
                normal: null,
            };
        if (target instanceof Circle) {
            let myCircle = this;
            let targetCircle = target as Circle;
            if (myCircle.bounds.intersect(targetCircle.bounds)) {
                let normal = Vector.subVectors(myCircle.pos, targetCircle.pos);
                let distance = normal.magnitude();
                if (distance < (myCircle.radius + targetCircle.radius)) {
                    result.collided = true;
                    normal.normal();
                    result.normal = normal;
                }
            }
        } else if (target instanceof Square) {
            let myCircle = this;
            let targetSquare = target as Square;
            if (myCircle.bounds.intersect(targetSquare.bounds)) {
                let circleCenter = myCircle.pos;
                let circleCenterX = circleCenter.x;
                let circleCenterY = circleCenter.y;
                let squareBounds = targetSquare.bounds;
                if (circleCenterX > squareBounds.minX && circleCenterX < squareBounds.maxX) {
                    if (circleCenterY > squareBounds.minY && circleCenterY < squareBounds.maxY) {
                        //The center is inside the bounds (namely, inside the square).
                        result.collided = true;
                        result.normal = null;
                    } else if (circleCenterY > squareBounds.maxY) {
                        //The center is upside the bounds.

                    } else if (circleCenterY < squareBounds.minY) {
                        
                    }
                } else if (circleCenterY > squareBounds.minY && circleCenterY < squareBounds.maxY) {

                }
            }
        } else {
            throw new Error("Invalid shape for collision detection.");
        }

        return result;
    }
}