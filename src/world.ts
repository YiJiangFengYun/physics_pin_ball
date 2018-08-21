import { Obj } from "./object";
import { Vector } from "./vector";
import { MyCircle, ICollideResult } from "./my_circle";

export class World {

    time:number;
    objectCount:number;
    objects: Obj[];
    myObj:MyCircle;

    constructor() {
        this.time = 0;
        this.objectCount = 0;
        this.objects = [];
        this.myObj = new MyCircle();
    }

    addObj(object:Obj) {
        if (this.objectCount < this.objects.length) {
            this.objects[this.objectCount++] = object;
        }
        else {
            this.objects.length = 2 * this.objects.length;
            this.objects[this.objectCount++] = object;
        }
    }

    removeObj(object:Obj) {
        let objectCount = this.objectCount;
        let objects = this.objects;
        for (let i = 0; i < objectCount; ++i) {
            if (object == objects[i]) {
                --objectCount;
                if (i < objectCount) {
                    objects[i] = objects[objectCount];
                    objects[objectCount] = null;
                }

                this.objectCount = objectCount;
                return;
            }
        }
    }

    clear() {
        this.objectCount = 0;
    }

    get myObject() {
        return this.myObj;
    }

    step(dt: number, iterations: number):void {

        dt = dt || 0;
        iterations = iterations || 1;

        let cachePosHelper:Vector = new Vector();
        let nextPosHelper:Vector = new Vector();
        let collisionResultHelper:ICollideResult = { collided:false, normal: new Vector()};
        let collisionNormlHelper:Vector = new Vector();
        let reflectResultHelper:Vector = new Vector();

        let minDt:number = dt / iterations;
        for (let iteration = 0; iteration < iterations; ++iteration) {
            let objectCount = this.objectCount;
            let objects = this.objects;
            let myBody = this.myObj;

            //Cache current position.
            let cachePos = cachePosHelper;
            cachePos.copy(myBody.pos);

            //Caculate next position.
            let nextPos = nextPosHelper;
            nextPos.x = myBody.pos.x + myBody.velocity.x * minDt;
            nextPos.y = myBody.pos.y + myBody.velocity.y * minDt;
            myBody.pos = nextPos;

            //Detect collision.
            let collisioned = false;
            let collisionResult = collisionResultHelper;
            let collsionNormal = collisionNormlHelper;
            collsionNormal.zero();
            for (let i = 0; i < objectCount; ++i) {
                let object = objects[i];
                myBody.collide(object, collisionResult);
                if (collisionResult.collided) {
                    collisioned = true;
                    collsionNormal.add(collisionResult.normal);
                }
            }

            //Final collsion result.
            let reflectResult = reflectResultHelper;
            if (collisioned) {
                //Recover to cached pre postion.
                myBody.pos = cachePos;
                //Set new velocity according to collision normal.
                Vector.reflectVector(myBody.velocity, collsionNormal, reflectResult);
                if (Math.abs(reflectResult.magnitude() - myBody.velocity.magnitude()) > 10) 
                    throw new Error('Velocity changed');
                myBody.velocity.copy(reflectResult);

                //Move
                let nextPos = nextPosHelper;
                nextPos.x = myBody.pos.x + myBody.velocity.x * minDt;
                nextPos.y = myBody.pos.y + myBody.velocity.y * minDt;
                myBody.pos = nextPos;
            }
        }

        this.time += dt;
    }
}