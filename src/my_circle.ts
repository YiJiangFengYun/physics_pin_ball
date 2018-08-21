import { Circle } from "./circle";
import { Obj } from "./object";
import { Rectangle } from "./rectangle";
import { Vector } from "./vector";

export interface ICollideResult {
    collided: boolean; normal:Vector;
}

export class MyCircle extends Circle {

    private _velocity:Vector;

    constructor() {
        super();
        this._velocity = new Vector();

    }

    get velocity():Vector {
        return this._velocity;
    }

    set velocity(value:Vector) {
        this._velocity = value;
    }

    collide(target:Obj, result?:ICollideResult) {
        if (result == null) result = {
                collided: false,
                normal: new Vector(),
            };
        else {
            result.collided = false;
        }
        if (target instanceof Circle) {
            let myCircle = this;
            let targetCircle = target as Circle;
            if (myCircle.bounds.intersect(targetCircle.bounds)) {
                let normal = Vector.subVectors(myCircle.pos, targetCircle.pos);
                let distance = normal.magnitude();
                if (distance < (myCircle.radius + targetCircle.radius)) {
                    result.collided = true;
                    normal.normal();
                    result.normal.copy(normal);
                }
            }
        } else if (target instanceof Rectangle) {
            let myCircle = this;
            let targetSquare = target as Rectangle;
            if (myCircle.bounds.intersect(targetSquare.bounds)) {
                let circleCenter = myCircle.pos;
                let circleCenterX = circleCenter.x;
                let circleCenterY = circleCenter.y;
                let circleRadius = myCircle.radius;
                let squareBounds = targetSquare.bounds;

                //00 is left 01 is midle 10 is right
                //First two bit is x and second two bit is y.
                let circlArea = 0;

                if (circleCenterX > squareBounds.minX && circleCenterX < squareBounds.maxX) {
                    circlArea |= 1;
                } else if (circleCenterX > squareBounds.maxX) {
                    circlArea |= 2;
                }

                if (circleCenterY > squareBounds.minY && circleCenterY < squareBounds.maxY) {
                    circlArea |= (1 << 2);
                } else if (circleCenterY > squareBounds.maxY) {
                    circlArea |= (2 << 2);
                }

                //rectangle 9 area.
                let findArea = false;
                for (let areaX = 0; areaX < 3; ++areaX) {
                    for (let areaY = 0; areaY < 3; ++areaY) {
                        if ((circlArea ^ areaX) == 0 && ((circlArea >> 2) ^ areaY) == 0) {
                            findArea = true;
                            //There 3 possible condition for each area.
                            if (areaX == 1 && areaY == 1) {
                                //The center is inside the bounds (namely, inside the square).
                                result.collided = true;
                                Vector.normalVector(myCircle.velocity, result.normal);
                            } else if (areaX != 1 && areaY != 1) {
                                //The circle is corner of the square.
                                //Detect if any point of square is inside the circle.
                                let points = targetSquare.points;
                                let point = points[((areaY >> 1) << 1) | (areaX >> 1)];
                                let pointHelper = new Vector();
                                let circleRadiusSquare:number = circleRadius * circleRadius;
                                Vector.subVectors(circleCenter, point, pointHelper);
                                if (pointHelper.manitudeSquare() < circleRadiusSquare) {
                                    //The point is inside the circle.
                                    result.collided = true;
                                    Vector.normalVector(pointHelper, result.normal);
                                }  
                            } else {
                                result.collided = true;
                                result.normal = new Vector(areaX - 1, areaY - 1);
                            }
                            break;
                        }
                    }
                    if (findArea) break;
                }


                // if (circleCenterX > squareBounds.minX && circleCenterX < squareBounds.maxX) {
                //     if (circleCenterY > squareBounds.minY && circleCenterY < squareBounds.maxY) {
                //         //The center is inside the bounds (namely, inside the square).
                //         result.collided = true;
                //         Vector.normalVector(myCircle.velocity, result.normal);
                //     } else if (circleCenterY > squareBounds.maxY) {
                //         //The center is downside the bounds.
                //         if (circleCenterY - squareBounds.maxY < circleRadius) {
                //             result.collided = true;
                //             result.normal = new Vector(0, 1);
                //         }

                //     } else if (circleCenterY < squareBounds.minY) {
                //         //The center is upside the bounds.
                //         if (squareBounds.minY - circleCenterY < circleRadius) {
                //             result.collided = true;
                //             result.normal = new Vector(0, -1);
                //         }
                //     }
                // } else if (circleCenterY > squareBounds.minY && circleCenterY < squareBounds.maxY) {
                //     if (circleCenterX > squareBounds.maxX) {
                //         //The center is right of the bounds.
                //         if (circleCenterX - squareBounds.maxX < circleRadius) {
                //             result.collided = true;
                //             result.normal = new Vector(1, 0);
                //         }
                //     } else if (circleCenterX < squareBounds.minX) {
                //         //The center is left of the bounds.
                //         if (squareBounds.minX - circleCenterX < circleRadius) {
                //             result.collided = true;
                //             result.normal = new Vector(-1, 0);
                //         }
                //     }
                // } else {
                //     //Detect if any point of square is inside the circle.
                //     let points = targetSquare.points;
                //     let pointCount = points.length;
                //     let pointHelper:Vector = new Vector();
                //     let circleRadiusSquare:number = circleRadius * circleRadius;
                //     for (let i = 0; i < pointCount; ++i) {
                //         Vector.subVectors(circleCenter, points[i], pointHelper);
                //         if (pointHelper.manitudeSquare() < circleRadiusSquare) {
                //             //The point is inside the circle.
                //             result.collided = true;
                //             Vector.normalVector(pointHelper, result.normal);
                //             break;
                //         }
                //     }
                // }
            }
        } else {
            throw new Error("Invalid shape for collision detection.");
        }

        return result;
    }
}