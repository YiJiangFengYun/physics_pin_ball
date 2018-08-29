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
var eventemitter3 = require("eventemitter3");
var World = /** @class */ (function (_super) {
    __extends(World, _super);
    function World() {
        var _this = _super.call(this) || this;
        _this.time = 0;
        _this.objectCount = 0;
        _this.objects = [];
        _this.myCircleCount = 0;
        _this.myCircles = [];
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
    World.prototype.addMyCircle = function (myCircle) {
        if (this.myCircleCount < this.myCircles.length) {
            this.myCircles[this.myCircleCount++] = myCircle;
        }
        else {
            this.myCircles.length = 2 * this.myCircles.length;
            this.myCircles[this.myCircleCount++] = myCircle;
        }
    };
    World.prototype.removeMyCircle = function (myCircle) {
        var myCircleCount = this.myCircleCount;
        var myCircles = this.myCircles;
        for (var i = 0; i < myCircleCount; ++i) {
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
    };
    World.prototype.clearMyCircles = function () {
        this.myCircleCount = 0;
    };
    World.prototype.step = function (dt, iterations) {
        dt = dt || 0;
        iterations = iterations || 1;
        var cachePosHelper = new vector_1.Vector();
        var nextPosHelper = new vector_1.Vector();
        var collisionResultHelper = { collided: false, normal: new vector_1.Vector() };
        var collisionNormlHelper = new vector_1.Vector();
        var reflectResultHelper = new vector_1.Vector();
        var minDt = dt / iterations;
        for (var iteration = 0; iteration < iterations; ++iteration) {
            var myCircleCount = this.myCircleCount;
            var myCircles = this.myCircles;
            for (var myCircleIndex = 0; myCircleIndex < myCircleCount; ++myCircleIndex) {
                var objectCount = this.objectCount;
                var objects = this.objects;
                var myBody = myCircles[myCircleIndex];
                //Cache current position.
                var cachePos = cachePosHelper;
                cachePos.copy(myBody.pos);
                //Caculate next position.
                var nextPos = nextPosHelper;
                nextPos.x = myBody.pos.x + myBody.velocity.x * minDt;
                nextPos.y = myBody.pos.y + myBody.velocity.y * minDt;
                myBody.pos = nextPos;
                //Detect collision.
                var collided = false;
                var collisionResult = collisionResultHelper;
                var collsionNormal = collisionNormlHelper;
                collsionNormal.zero();
                for (var i = 0; i < objectCount; ++i) {
                    var object = objects[i];
                    myBody.collide(object, collisionResult);
                    if (collisionResult.collided) {
                        collided = true;
                        collsionNormal.add(collisionResult.normal);
                        this.emit("collided", object);
                    }
                }
                //Final collsion result.
                var reflectResult = reflectResultHelper;
                if (collided) {
                    //Recover to cached pre postion.
                    myBody.pos = cachePos;
                    var cacheMagnitude = myBody.velocity.magnitude();
                    //Set new velocity according to collision normal.
                    vector_1.Vector.reflectVector(myBody.velocity, collsionNormal, reflectResult);
                    // if (Math.abs(reflectResult.magnitude() - myBody.velocity.magnitude()) > 10) 
                    //     throw new Error('Velocity is changed!');
                    // myBody.velocity.copy(reflectResult);
                    reflectResult.normal();
                    reflectResult.mulMag(cacheMagnitude);
                    myBody.velocity = reflectResult;
                    //Move
                    var nextPos_1 = nextPosHelper;
                    nextPos_1.x = myBody.pos.x + myBody.velocity.x * minDt;
                    nextPos_1.y = myBody.pos.y + myBody.velocity.y * minDt;
                    myBody.pos = nextPos_1;
                }
            }
        }
        this.time += dt;
    };
    return World;
}(eventemitter3.EventEmitter));
exports.World = World;
