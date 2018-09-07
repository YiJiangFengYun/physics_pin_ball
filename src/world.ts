import { Obj } from "./object";
import { Vector } from "./vector";
import { Bullet, ICollideResult } from "./bullet";
import * as EventEmitter from "eventemitter3";

export class World extends EventEmitter {

    time:number;
    objectCount:number;
    objects: Obj[];
    bulletCount:number;
    bullets:Bullet[];

    constructor() {
        super()
        this.time = 0;
        this.objectCount = 0;
        this.objects = [];
        this.bulletCount = 0;
        this.bullets = [];
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

    addBullet(bullet:Bullet) {
        if (this.bulletCount < this.bullets.length) {
            this.bullets[this.bulletCount++] = bullet;
        }
        else {
            this.bullets.length = 2 * this.bullets.length;
            this.bullets[this.bulletCount++] = bullet;
        }
    }

    removeBullet(bullet:Bullet) {
        let bulletCount = this.bulletCount;
        let bullets = this.bullets;
        for (let i = 0; i < bulletCount; ++i) {
            if (bullet == bullets[i]) {
                --bulletCount;
                if (i < bulletCount) {
                    bullets[i] = bullets[bulletCount];
                    bullets[bulletCount] = null;
                }

                this.bulletCount = bulletCount;
                return;
            }
        }
    }

    clearBullets() {
        this.bulletCount = 0;
    }

    step(dt: number, iterations: number):void {

        dt = dt || 0;
        iterations = iterations || 1;

        let cachePosHelper:Vector = new Vector();
        let nextPosHelper:Vector = new Vector();
        let collisionResultHelper:ICollideResult = { collided:false, relected:false, normal: new Vector()};
        let collisionNormlHelper:Vector = new Vector();
        let reflectResultHelper:Vector = new Vector();

        let minDt:number = dt / iterations;
        for (let iteration = 0; iteration < iterations; ++iteration) {
            let bulletCount = this.bulletCount;
            let bullets = this.bullets;
            for (let bulletIndex = 0; bulletIndex < bulletCount; ++bulletIndex) {
                let objectCount = this.objectCount;
                let objects = this.objects;
                let myBody = bullets[bulletIndex];
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
                        if (collisionResult.relected) collsionNormal.add(collisionResult.normal);
                        this.emit("collided", object, myBody);
                        object.emit("collided", myBody);
                        myBody.emit("collided", object);
                    }
                }
    
                //Final collsion result.
                if (collided && collsionNormal.isZero() == false) {
                    let reflectResult = reflectResultHelper;
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