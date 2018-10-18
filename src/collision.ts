import { Obj } from "./object";
import { Vector } from "./vector";
import { Circle } from "./circle";
import { Rectangle } from "./rectangle";
import { Bullet } from "./bullet";
import { IRTriangle } from "./triangle";
import { Rhombus } from "./rhombus";

export interface ICollideResult {
    collided: boolean; 
    relected:boolean;
    normal:Vector;
}

export interface ICollision {
    collide(bullet:Bullet, target:Obj, result?:ICollideResult):ICollideResult;
}

export class Collision {
    public collisionCircle:CollisionCircle = new CollisionCircle();
    public collisionRectangle:CollisionRectangle = new CollisionRectangle();
    public collisionIRTriangle:CollisionIRTriangle = new CollisionIRTriangle();
    public collisionRhombus:CollisionRhombus = new CollisionRhombus();
    public collide(bullet:Bullet, target:Obj, result?:ICollideResult) {
        let reflexible = bullet.reflexible && target.reflexible;
        if (result == null) result = {
                collided: false,
                relected: reflexible,
                normal: new Vector(),
            };
        else {
            result.collided = false;
            result.relected = reflexible;
            result.normal.zero();
        }
        
        if (target instanceof Circle) {
            this.collisionCircle.collide(bullet, target, result);
        } else if (target instanceof Rectangle) {
            this.collisionRectangle.collide(bullet, target, result);
        } else if (target instanceof IRTriangle) {
            this.collisionIRTriangle.collide(bullet, target, result);
        } else if (target instanceof Rhombus) {
            this.collisionRhombus.collide(bullet, target, result);
        } else {
            throw new Error("Invalid shape for collision detection.");
        }

        return result;
    }
}


export class CollisionCircle implements ICollision {
    public collide(bullet:Bullet, target:Obj, result?:ICollideResult):ICollideResult
    {
        let reflexible = bullet.reflexible && target.reflexible;
        let targetCircle = target as Circle;
        if (bullet.bounds.intersect(targetCircle.bounds)) {
            let normal = Vector.subVectors(bullet.pos, targetCircle.pos);
            let distance = normal.magnitude();
            if (distance < (bullet.radius + targetCircle.radius)) {
                result.collided = true;
                if (reflexible) {
                    normal.normal();
                    result.normal.copy(normal);
                }
            }
        }

        return;
    }
}

export class CollisionRectangle implements ICollision {
    public collide(bullet:Bullet, target:Obj, result?:ICollideResult):ICollideResult {
        let reflexible = bullet.reflexible && target.reflexible;
        let targetSquare = target as Rectangle;
        if (bullet.bounds.intersect(targetSquare.bounds)) {
            let circleCenter = bullet.pos;
            let circleCenterX = circleCenter.x;
            let circleCenterY = circleCenter.y;
            let circleRadius = bullet.radius;
            let squareBounds = targetSquare.bounds;
            if (circleCenterX > squareBounds.minX && circleCenterX < squareBounds.maxX) {
                if (circleCenterY > squareBounds.minY && circleCenterY < squareBounds.maxY) {
                    //The center is inside the bounds (namely, inside the square).
                    result.collided = true;
                    if (reflexible)Vector.normalVector(bullet.velocity, result.normal);
                } else if (circleCenterY > squareBounds.maxY) {
                    //The center is downside the bounds.
                    if (circleCenterY - squareBounds.maxY < circleRadius) {
                        result.collided = true;
                        if (reflexible)result.normal = new Vector(0, 1);
                    }
                } else if (circleCenterY < squareBounds.minY) {
                    //The center is upside the bounds.
                    if (squareBounds.minY - circleCenterY < circleRadius) {
                        result.collided = true;
                        if (reflexible)result.normal = new Vector(0, -1);
                    }
                }
            } else if (circleCenterY > squareBounds.minY && circleCenterY < squareBounds.maxY) {
                if (circleCenterX > squareBounds.maxX) {
                    //The center is right of the bounds.
                    if (circleCenterX - squareBounds.maxX < circleRadius) {
                        result.collided = true;
                        if (reflexible)result.normal = new Vector(1, 0);
                    }
                } else if (circleCenterX < squareBounds.minX) {
                    //The center is left of the bounds.
                    if (squareBounds.minX - circleCenterX < circleRadius) {
                        result.collided = true;
                        if (reflexible)result.normal = new Vector(-1, 0);
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
                        if (reflexible)Vector.normalVector(pointHelper, result.normal);
                        break;
                    }
                }
            }
        }
        return result;
    }
}

export class CollisionIRTriangle implements ICollision {
    public collide(bullet:Bullet, target:Obj, result?:ICollideResult):ICollideResult {
        let reflexible = bullet.reflexible && target.reflexible;
        let targetTriangle = target as IRTriangle;
        if (bullet.bounds.intersect(targetTriangle.bounds)) {
            let circleCenter = bullet.pos;
            let circleCenterPos = [circleCenter.x, circleCenter.y];
            let circleRadius = bullet.radius;
            let triangleBounds = targetTriangle.bounds;
            let triangleBoundsMin = [triangleBounds.minX, triangleBounds.minY];
            let triangleBoundsMax = [triangleBounds.maxX, triangleBounds.maxY];
            //00 is left 01 is midle 10 is right
            //First two bit is x and second two bit is y.
            let circlArea = 0;
            if (circleCenterPos[0] > triangleBoundsMin[0] && circleCenterPos[0] < triangleBoundsMax[0]) {
                circlArea |= 1;
            } else if (circleCenterPos[0] > triangleBoundsMax[0]) {
                circlArea |= 2;
            }
            if (circleCenterPos[1] > triangleBoundsMin[1] && circleCenterPos[1] < triangleBoundsMax[1]) {
                circlArea |= (1 << 2);
            } else if (circleCenterPos[1] > triangleBoundsMax[1]) {
                circlArea |= (2 << 2);
            }
            //rectangle 9 area.
            let findArea = false;
            for (let areaX = 0; areaX < 3; ++areaX) {
                for (let areaY = 0; areaY < 3; ++areaY) {
                    if (((circlArea & 3) ^ areaX) == 0 && ((circlArea >> 2) ^ areaY) == 0) {
                        findArea = true;
                        let sameXDirect = areaX != 1 && (areaX >> 1) == (targetTriangle.direct & 1);
                        let sameYDirect = areaY != 1 && (areaY >> 1) == ((targetTriangle.direct >> 1) & 1);
                        if (sameXDirect || sameYDirect) {
                            if (areaX != 1 && areaY != 1) {
                                //The circle is corner of the square.
                                //Detect if any point of square is inside the circle.
                                let points = targetTriangle.points;
                                let point = points[((areaY >> 1) << 1) | (areaX >> 1)];
                                let pointHelper = new Vector();
                                let circleRadiusSquare:number = circleRadius * circleRadius;
                                Vector.subVectors(circleCenter, point, pointHelper);
                                if (pointHelper.manitudeSquare() < circleRadiusSquare) {
                                    //The point is inside the circle.
                                    result.collided = true;
                                    if (reflexible)Vector.normalVector(pointHelper, result.normal);
                                }  
                            } else {
                                let points = targetTriangle.points;
                                //Right angle point.
                                let point = points[targetTriangle.direct];
                                if (areaX != 1) {
                                    if (Math.abs(point.x - circleCenterPos[0]) < circleRadius) {
                                        result.collided = true;
                                        if (reflexible)result.normal = new Vector(areaX - 1, 0);
                                    }
                                } else {
                                    if (Math.abs(point.y - circleCenterPos[1]) < circleRadius) {
                                        result.collided = true;
                                        if (reflexible)result.normal = new Vector(0, areaY - 1);
                                    }
                                }
                            }
                        } else {
                            let vectorTriangleToCenter = Vector.subVectors(bullet.pos, targetTriangle.pos);
                            let points = targetTriangle.points;
                                //Right angle point.
                            let point = points[targetTriangle.direct];
                            let normal = Vector.subVectors(targetTriangle.pos, point);
                            normal.normal();
                            let dot = Vector.dotVectors(vectorTriangleToCenter, normal);
                            let circleRadius = bullet.radius;
                            if (dot < circleRadius) {
                                result.collided = true;
                                if (reflexible)result.normal = normal;
                            }
                        }
                        break;
                    }
                }
                if (findArea) break;
            }
        }
        return;
    }
}

export class CollisionRhombus implements ICollision {
    public static COS_SIN_45:number = Math.sqrt(2) / 2;
    public collide(bullet:Bullet, target:Obj, result?:ICollideResult):ICollideResult {
        let reflexible = bullet.reflexible && target.reflexible;
        let targetRhombus = target as Rhombus;
        if (bullet.bounds.intersect(targetRhombus.bounds)) {
            let circleCenter = bullet.pos;
            let circleCenterX = circleCenter.x;
            let circleCenterY = circleCenter.y;
            let circleRadius = bullet.radius;
            let cosSin45 = CollisionRhombus.COS_SIN_45;
            let circleCenterXRelateTarget = circleCenterX - target.pos.x;
            let circleCenterYRelateTarget = circleCenterY - target.pos.y;
            let circleCenterXRotate = (circleCenterXRelateTarget + circleCenterYRelateTarget) * cosSin45;
            let circleCenterYRotate = ( - circleCenterXRelateTarget + circleCenterYRelateTarget) * cosSin45;
            let halfMinSize = targetRhombus.size * cosSin45 / 2;
            if (circleCenterXRotate > - halfMinSize && circleCenterXRotate < halfMinSize) {
                if (circleCenterYRotate > - halfMinSize && circleCenterYRotate < halfMinSize) {
                    //The center is inside the bounds (namely, inside the square).
                    result.collided = true;
                    if (reflexible)Vector.normalVector(bullet.velocity, result.normal);
                } else if (circleCenterYRotate > halfMinSize) {
                    if (circleCenterYRotate - halfMinSize < circleRadius) {
                        result.collided = true;
                        if (reflexible)result.normal = new Vector(-cosSin45, cosSin45);
                    }
                } else if (circleCenterYRotate < - halfMinSize) {
                    if (- halfMinSize - circleCenterYRotate < circleRadius) {
                        result.collided = true;
                        if (reflexible)result.normal = new Vector(cosSin45, - cosSin45);
                    }
                }
            } else if (circleCenterYRotate > - halfMinSize && circleCenterYRotate < halfMinSize) {
                if (circleCenterXRotate > halfMinSize) {
                    if (circleCenterXRotate - halfMinSize < circleRadius) {
                        result.collided = true;
                        if (reflexible)result.normal = new Vector(cosSin45, cosSin45);
                    }
                } else if (circleCenterXRotate < - halfMinSize) {
                    if (- halfMinSize - circleCenterXRotate < circleRadius) {
                        result.collided = true;
                        if (reflexible)result.normal = new Vector(- cosSin45, - cosSin45);
                    }
                }
            } else {
                //Detect if any point of square is inside the circle.
                let points = targetRhombus.points;
                let pointCount = points.length;
                let pointHelper:Vector = new Vector();
                let circleRadiusSquare:number = circleRadius * circleRadius;
                for (let i = 0; i < pointCount; ++i) {
                    Vector.subVectors(circleCenter, points[i], pointHelper);
                    if (pointHelper.manitudeSquare() < circleRadiusSquare) {
                        //The point is inside the circle.
                        result.collided = true;
                        if (reflexible)Vector.normalVector(pointHelper, result.normal);
                        break;
                    }
                }
            }
        }

        return result;
    }
}
