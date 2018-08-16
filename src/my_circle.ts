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
            let my_circle = this;
            let target_circle = target as Circle;
            let normal = Vector.subVectors(my_circle.pos, target_circle.pos);
            let distance = normal.magnitude();
            if (distance < (my_circle.radius + target_circle.radius)) {
                result.collided = true;
                normal.normal();
                result.normal = normal;
            }
        } else if (target instanceof Square) {

        } else {
            throw new Error("Invalid shape for collision detection.");
        }

        return result;
    }
}