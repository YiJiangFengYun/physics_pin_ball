"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("./vector");
var EventEmitter = require("eventemitter3");
var World = /** @class */ (function (_super) {
    __extends(World, _super);
    function World() {
        var _this = _super.call(this) || this;
        _this.time = 0;
        _this.objectCount = 0;
        _this.objects = [];
        _this.bulletCount = 0;
        _this.bullets = [];
        _this.collectionMap = {};
        return _this;
    }
    World.prototype.addObj = function (object) {
        if (this.objectCount < this.objects.length) {
            this.objects[this.objectCount++] = object;
        }
        else {
            this.objects.length = 2 * this.objects.length;
            this.objects[this.objectCount++] = object;
        }
    };
    World.prototype.removeObj = function (object) {
        var objectCount = this.objectCount;
        var objects = this.objects;
        for (var i = 0; i < objectCount; ++i) {
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
    };
    World.prototype.clearObjs = function () {
        this.objectCount = 0;
    };
    World.prototype.addBullet = function (bullet) {
        if (this.bulletCount < this.bullets.length) {
            this.bullets[this.bulletCount++] = bullet;
        }
        else {
            this.bullets.length = 2 * this.bullets.length;
            this.bullets[this.bulletCount++] = bullet;
        }
    };
    World.prototype.removeBullet = function (bullet) {
        var bulletCount = this.bulletCount;
        var bullets = this.bullets;
        for (var i = 0; i < bulletCount; ++i) {
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
    };
    World.prototype.clearBullets = function () {
        this.bulletCount = 0;
    };
    World.prototype.step = function (dt, iterations) {
        dt = dt || 0;
        iterations = iterations || 1;
        var cachePosHelper = new vector_1.Vector();
        var nextPosHelper = new vector_1.Vector();
        var collisionResultHelper = { collided: false, relected: false, normal: new vector_1.Vector() };
        var collisionNormlHelper = new vector_1.Vector();
        var reflectResultHelper = new vector_1.Vector();
        var minDt = dt / iterations;
        for (var iteration = 0; iteration < iterations; ++iteration) {
            var bulletCount = this.bulletCount;
            var bullets = this.bullets;
            for (var bulletIndex = 0; bulletIndex < bulletCount; ++bulletIndex) {
                var objectCount = this.objectCount;
                var objects = this.objects;
                var bullet = bullets[bulletIndex];
                if (!bullet.valid)
                    continue;
                //Cache current position.
                var cachePos = cachePosHelper;
                cachePos.copy(bullet.pos);
                //Caculate next position.
                var nextPos = nextPosHelper;
                nextPos.x = bullet.pos.x + bullet.velocity.x * minDt;
                nextPos.y = bullet.pos.y + bullet.velocity.y * minDt;
                bullet.pos = nextPos;
                //Detect collision.
                var collided = false;
                var collisionResult = collisionResultHelper;
                var collsionNormal = collisionNormlHelper;
                collsionNormal.zero();
                for (var i = 0; i < objectCount; ++i) {
                    var object = objects[i];
                    if (!object.valid)
                        continue;
                    var objCollided = false;
                    bullet.collide(object, collisionResult);
                    if (collisionResult.collided) {
                        collided = true;
                        objCollided = true;
                        if (collisionResult.relected)
                            collsionNormal.add(collisionResult.normal);
                    }
                    var preObjCollided = this.collectionMap[bullet.id + "_" + object.id] || false;
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
                    var reflectResult = reflectResultHelper;
                    //Recover to cached pre postion.
                    bullet.pos = cachePos;
                    var cacheMagnitude = bullet.velocity.magnitude();
                    //Set new velocity according to collision normal.
                    vector_1.Vector.reflectVector(bullet.velocity, collsionNormal, reflectResult);
                    // if (Math.abs(reflectResult.magnitude() - myBody.velocity.magnitude()) > 10) 
                    //     throw new Error('Velocity is changed!');
                    // myBody.velocity.copy(reflectResult);
                    reflectResult.normal();
                    reflectResult.mulMag(cacheMagnitude);
                    bullet.velocity = reflectResult;
                    //Move
                    var nextPos_1 = nextPosHelper;
                    nextPos_1.x = bullet.pos.x + bullet.velocity.x * minDt;
                    nextPos_1.y = bullet.pos.y + bullet.velocity.y * minDt;
                    bullet.pos = nextPos_1;
                }
            }
        }
        this.time += dt;
    };
    return World;
}(EventEmitter));
exports.World = World;
