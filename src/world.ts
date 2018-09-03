import { Obj } from "./object";
import { Vector } from "./vector";
import { MyCircle, ICollideResult } from "./my_circle";
import * as eventemitter3 from "eventemitter3";

export class World extends eventemitter3.EventEmitter {

    time:number;
    objectCount:number;
    objects: Obj[];
    myCircleCount:number;
    myCircles:MyCircle[];

    constructor() {
        super()
        this.time = 0;
        this.objectCount = 0;
        this.objects = [];
        this.myCircleCount = 0;
        this.myCircles = [];
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

    clearObjs() {
        this.objectCount = 0;
    }

    addMyCircle(myCircle:MyCircle) {
        if (this.myCircleCount < this.myCircles.length) {
            this.myCircles[this.myCircleCount++] = myCircle;
        }
        else {
            this.myCircles.length = 2 * this.myCircles.length;
            this.myCircles[this.myCircleCount++] = myCircle;
        }
    }

    removeMyCircle(myCircle:MyCircle) {
        let myCircleCount = this.myCircleCount;
        let myCircles = this.myCircles;
        for (let i = 0; i < myCircleCount; ++i) {
            if (myCircle == myCircles[i]) {
                --myCircleCount;
                if (i < myCircleCount) {
                    myCircles[i] = myCircles[myCircleCount];
                    myCircles[myCircleCount] = null;
                }

                this.myCircleCount = myCircleCount;
                return;
            }
        }
    }

    clearMyCircles() {
        this.myCircleCount = 0;
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
            let myCircleCount = this.myCircleCount;
            let myCircles = this.myCircles;
            for (let myCircleIndex = 0; myCircleIndex < myCircleCount; ++myCircleIndex) {
                let objectCount = this.objectCount;
                let objects = this.objects;
                let myBody = myCircles[myCircleIndex];
                if (! myBody.valid) continue;
    
                //Cache current position.
                let cachePos = cachePosHelper;
                cachePos.copy(myBody.pos);
    
                //Caculate next position.
                let nextPos = nextPosHelper;
                nextPos.x = myBody.pos.x + myBody.velocity.x * minDt;
                nextPos.y = myBody.pos.y + myBody.velocity.y * minDt;
                myBody.pos = nextPos;
    
                //Detect collision.
                let collided = false;
                let collisionResult = collisionResultHelper;
                let collsionNormal = collisionNormlHelper;
                collsionNormal.zero();
                for (let i = 0; i < objectCount; ++i) {
                    let object = objects[i];
                    if ( ! object.valid) continue;
                    myBody.collide(object, collisionResult);
                    if (collisionResult.collided) {
                        collided = true;
                        collsionNormal.add(collisionResult.normal);
                        this.emit("collided", object, myBody);
                    }
                }
    
                //Final collsion result.
                let reflectResult = reflectResultHelper;
                if (collided) {
                    //Recover to cached pre postion.
                    myBody.pos = cachePos;
                    let cacheMagnitude = myBody.velocity.magnitude();
                    //Set new velocity according to collision normal.
                    Vector.reflectVector(myBody.velocity, collsionNormal, reflectResult);

                    // if (Math.abs(reflectResult.magnitude() - myBody.velocity.magnitude()) > 10) 
                    //     throw new Error('Velocity is changed!');
                    // myBody.velocity.copy(reflectResult);
    
                    reflectResult.normal();
                    reflectResult.mulMag(cacheMagnitude);
                    myBody.velocity = reflectResult;
    
                    //Move
                    let nextPos = nextPosHelper;
                    nextPos.x = myBody.pos.x + myBody.velocity.x * minDt;
                    nextPos.y = myBody.pos.y + myBody.velocity.y * minDt;
                    myBody.pos = nextPos;

                }
            }

            
        }

        this.time += dt;
    }
}