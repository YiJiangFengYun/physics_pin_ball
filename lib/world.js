"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("./vector");
var my_circle_1 = require("./my_circle");
var World = /** @class */ (function () {
    function World() {
        this.time = 0;
        this.objectCount = 0;
        this.objects = [];
        this.myObj = new my_circle_1.MyCircle();
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
    World.prototype.clear = function () {
        this.objectCount = 0;
    };
    Object.defineProperty(World.prototype, "myObject", {
        get: function () {
            return this.myObj;
        },
        enumerable: true,
        configurable: true
    });
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
            var objectCount = this.objectCount;
            var objects = this.objects;
            var myBody = this.myObj;
            //Cache current position.
            var cachePos = cachePosHelper;
            cachePos.copy(myBody.pos);
            //Caculate next position.
            var nextPos = nextPosHelper;
            nextPos.x = myBody.pos.x + myBody.velocity.x * minDt;
            nextPos.y = myBody.pos.y + myBody.velocity.y * minDt;
            myBody.pos = nextPos;
            //Detect collision.
            var collisioned = false;
            var collisionResult = collisionResultHelper;
            var collsionNormal = collisionNormlHelper;
            collsionNormal.zero();
            for (var i = 0; i < objectCount; ++i) {
                var object = objects[i];
                myBody.collide(object, collisionResult);
                if (collisionResult.collided) {
                    collisioned = true;
                    collsionNormal.add(collisionResult.normal);
                }
            }
            //Final collsion result.
            var reflectResult = reflectResultHelper;
            if (collisioned) {
                //Recover to cached pre postion.
                myBody.pos = cachePos;
                //Set new velocity according to collision normal.
                vector_1.Vector.reflectVector(myBody.velocity, collsionNormal, reflectResult);
                myBody.velocity.copy(reflectResult);
                //Move
                var nextPos_1 = nextPosHelper;
                nextPos_1.x = myBody.pos.x + myBody.velocity.x * minDt;
                nextPos_1.y = myBody.pos.y + myBody.velocity.y * minDt;
                myBody.pos = nextPos_1;
            }
        }
        this.time += dt;
    };
    return World;
}());
exports.World = World;
//# sourceMappingURL=world.js.map