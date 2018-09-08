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

    collectionMap:{[idsKey:string]: boolean};

    constructor() {
        super()
        this.time = 0;
        this.objectCount = 0;
        this.objects = [];
        this.bulletCount = 0;
        this.bullets = [];

        this.collectionMap = {};
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
                let bullet = bullets[bulletIndex];
                if (! bullet.valid) continue;
    
                //Cache current position.
                let cachePos = cachePosHelper;
                cachePos.copy(bullet.pos);
    
                //Caculate next position.
                let nextPos = nextPosHelper;
                nextPos.x = bullet.pos.x + bullet.velocity.x * minDt;
                nextPos.y = bullet.pos.y + bullet.velocity.y * minDt;
                bullet.pos = nextPos;
    
                //Detect collision.
                let collided = false;
                let collisionResult = collisionResultHelper;
                let collsionNormal = collisionNormlHelper;
                collsionNormal.zero();
                for (let i = 0; i < objectCount; ++i) {
                    let object = objects[i];
                    if ( ! object.valid) continue;
                    let objCollided = false;
                    bullet.collide(object, collisionResult);
                    if (collisionResult.collided) {
                        collided = true;
                        objCollided = true;
                        if (collisionResult.relected) collsionNormal.add(collisionResult.normal);
                    }

                    let preObjCollided = this.collectionMap[bullet.id + "_" + object.id] || false;
                    this.collectionMap[bullet.id + "_" + object.id] = objCollided;

                    if (collisionResult.relected && preObjCollided == false && objCollided == true) {
                        this.emit("collision_begin", bullet, object);
                        object.emit("collision_begin", bullet);
                        bullet.emit("collision_begin", object);
                    } 
                    
                    if (objCollided) {
                        this.emit("collided", bullet, object);
                        object.emit("collided", bullet);
                        bullet.emit("collided", object);
                    }
                    
                    if (collisionResult.relected && preObjCollided == true && objCollided == false) {
                        this.emit("collsion_end", bullet, object);
                        object.emit("collsion_end", bullet);
                        bullet.emit("collsion_end", object);
                    }
                }

    
                //Final collsion result.
                if (collided && collsionNormal.isZero() == false) {
                    let reflectResult = reflectResultHelper;
                    //Recover to cached pre postion.
                    bullet.pos = cachePos;
                    let cacheMagnitude = bullet.velocity.magnitude();
                    //Set new velocity according to collision normal.
                    Vector.reflectVector(bullet.velocity, collsionNormal, reflectResult);

                    // if (Math.abs(reflectResult.magnitude() - myBody.velocity.magnitude()) > 10) 
                    //     throw new Error('Velocity is changed!');
                    // myBody.velocity.copy(reflectResult);
    
                    reflectResult.normal();
                    reflectResult.mulMag(cacheMagnitude);
                    bullet.velocity = reflectResult;
    
                    //Move
                    let nextPos = nextPosHelper;
                    nextPos.x = bullet.pos.x + bullet.velocity.x * minDt;
                    nextPos.y = bullet.pos.y + bullet.velocity.y * minDt;
                    bullet.pos = nextPos;

                }
            }

            
        }

        this.time += dt;
    }
}