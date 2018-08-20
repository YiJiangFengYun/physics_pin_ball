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
                let circleRadius = myCircle.radius;
                let squareBounds = targetSquare.bounds;
                if (circleCenterX > squareBounds.minX && circleCenterX < squareBounds.maxX) {
                    if (circleCenterY > squareBounds.minY && circleCenterY < squareBounds.maxY) {
                        //The center is inside the bounds (namely, inside the square).
                        result.collided = true;
                        result.normal = null;
                    } else if (circleCenterY > squareBounds.maxY) {
                        //The center is downside the bounds.
                        if (circleCenterY - squareBounds.maxY < circleRadius) {
                            result.collided = true;
                            result.normal = new Vector(0, 1);
                        }

                    } else if (circleCenterY < squareBounds.minY) {
                        //The center is upside the bounds.
                        if (squareBounds.minY - circleCenterY < circleRadius) {
                            result.collided = true;
                            result.normal = new Vector(0, -1);
                        }
                    }
                } else if (circleCenterY > squareBounds.minY && circleCenterY < squareBounds.maxY) {
                    if (circleCenterX > squareBounds.maxX) {
                        //The center is right of the bounds.
                        if (circleCenterX - squareBounds.maxX < circleRadius) {
                            result.collided = true;
                            result.normal = new Vector(1, 0);
                        }
                    } else if (circleCenterX < squareBounds.minX) {
                        //The center is left of the bounds.
                        if (squareBounds.minX - circleCenterX < circleRadius) {
                            result.collided = true;
                            result.normal = new Vector(-1, 0);
                        }
                    }
                } else {
                    //Detect if any point of square is inside the circle.
                    let points = targetSquare.points;
                    let pointCount = points.length;
                    let pointHelper:Vector = new Vector();
                    let circleRadiusSquare:number = circleRadius * circleRadius;
                    for (let i = 0; i < pointCount; ++i) {
                        Vector.subVectors(circleCenter, points[i], pointHelper);
                        if (pointHelper.manitudeSquare() < circleRadiusSquare) {
                            //The point is inside the circle.
                            result.collided = true;
                            result.normal = pointHelper;
                            break;
                        }
                    }
                }
            }
        } else {
            throw new Error("Invalid shape for collision detection.");
        }

        return result;
    }
}