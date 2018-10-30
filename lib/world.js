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
var object_1 = require("./object");
var vector_1 = require("./vector");
var EventEmitter = require("eventemitter3");
var collision_1 = require("./collision");
var World = /** @class */ (function (_super) {
    __extends(World, _super);
    function World(info) {
        var _this = _super.call(this) || this;
        _this.width = info.width;
        _this.height = info.height;
        _this.startX = info.width / 2;
        _this.startY = info.height / 2;
        _this.time = 0;
        _this.bulletCount = 0;
        _this.bullets = [];
        _this.borders = [];
        _this.borders.length = World.BORDER_COUNT;
        _this.itemRowCount = info.itemRowCount;
        _this.itemColCount = info.itemColCount;
        _this.itemWidth = info.width / info.itemColCount;
        _this.itemHeight = info.height / info.itemRowCount;
        var items = [];
        _this.items = items;
        _this.items.length = info.itemRowCount;
        for (var i = 0; i < info.itemRowCount; ++i) {
            items[i] = [];
            items[i].length = info.itemColCount;
        }
        _this.objectCount = 0;
        _this.objects = [];
        _this.collectionMap = {};
        _this.collision = new collision_1.Collision();
        return _this;
    }
    World.prototype.addBorder = function (border, index) {
        if (index >= World.BORDER_COUNT)
            throw new Error("Index of the border is out of range of " + World.BORDER_COUNT);
        if (this.borders[index]) {
            console.warn("The border at the index has exist!");
            this.removeBorder(index);
        }
        this.borders[index] = border;
    };
    World.prototype.removeBorder = function (borderOrIndex) {
        var index = borderOrIndex instanceof object_1.Obj ? this.borders.indexOf(borderOrIndex) : borderOrIndex;
        if (index >= 0) {
            this.borders[index] = null;
        }
    };
    World.prototype.addItem = function (item, row, col) {
        if (row === void 0) { row = 0; }
        if (col === void 0) { col = 0; }
        if (row >= this.itemRowCount)
            throw new Error("Row of the item is out of range of row count " + this.itemRowCount);
        if (col >= this.itemColCount)
            throw new Error("Col of the item is out of range of col count " + this.itemColCount);
        var items = this.items;
        if (items[row][col]) {
            console.warn("The items[" + row + "][" + col + "] has exist!");
            this.removeItem(row, col);
        }
        items[row][col] = item;
        item.on("change_pos", this._onChangeItemPos, this);
    };
    World.prototype.removeItem = function (row, col) {
        if (this.items[row][col])
            this.items[row][col].off("change_pos", this._onChangeItemPos, this);
        this.items[row][col] = null;
    };
    World.prototype.clearItems = function () {
        var rowCount = this.itemRowCount;
        var colCount = this.itemColCount;
        var items = this.items;
        for (var i = 0; i < rowCount; ++i) {
            for (var j = 0; j < colCount; ++j) {
                items[i][j] = null;
            }
        }
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
    World.prototype.step = function (dt, iterations) {
        dt = dt || 0;
        iterations = iterations || 1;
        var cachePosHelper = new vector_1.Vector();
        var nextPosHelper = new vector_1.Vector();
        var collisionResultHelper = { collided: false, relected: false, normal: new vector_1.Vector() };
        var collisionNormlHelper = new vector_1.Vector();
        var reflectResultHelper = new vector_1.Vector();
        var itemSpaceHelper = {};
        var minDt = dt / iterations;
        for (var iteration = 0; iteration < iterations; ++iteration) {
            var bulletCount = this.bulletCount;
            var bullets = this.bullets;
            for (var bulletIndex = 0; bulletIndex < bulletCount; ++bulletIndex) {
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
                var collisionNormal = collisionNormlHelper;
                collisionNormal.zero();
                ////item
                var items = this.items;
                var itemspace = itemSpaceHelper;
                this._getBulletCoverItemSpaces(bullet, itemspace);
                for (var row = itemspace.startRow; row <= itemspace.endRow; ++row) {
                    for (var col = itemspace.startCol; col <= itemspace.endCol; ++col) {
                        var item = items[row][col];
                        if (!item || !item.valid)
                            continue;
                        collided = this._collideObj(bullet, item, collisionResult, collisionNormal);
                    }
                }
                ////obj
                var objectCount = this.objectCount;
                var objects = this.objects;
                for (var i = 0; i < objectCount; ++i) {
                    var object = objects[i];
                    if (!object.valid)
                        continue;
                    collided = this._collideObj(bullet, object, collisionResult, collisionNormal);
                }
                //Final collsion result.
                if (collided && collisionNormal.isZero() == false) {
                    var reflectResult = reflectResultHelper;
                    //Recover to cached pre postion.
                    bullet.pos = cachePos;
                    var cacheMagnitude = bullet.velocity.magnitude();
                    //Set new velocity according to collision normal.
                    vector_1.Vector.reflectVector(bullet.velocity, collisionNormal, reflectResult);
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
    World.prototype._collideObj = function (bullet, object, collisionResult, collsionNormal) {
        var collided = false;
        var objCollided = false;
        this.collision.collide(bullet, object, collisionResult);
        if (collisionResult.collided) {
            collided = true;
            objCollided = true;
            if (collisionResult.relected)
                collsionNormal.add(collisionResult.normal);
        }
        var preObjCollided = this.collectionMap[bullet.id + "_" + object.id] || false;
        this.collectionMap[bullet.id + "_" + object.id] = objCollided;
        if (!collisionResult.relected && preObjCollided == false && objCollided == true) {
            this.emit("collision_begin", bullet, object);
            object.emit("collision_begin", bullet);
            bullet.emit("collision_begin", object);
        }
        if (objCollided) {
            this.emit("collided", bullet, object);
            object.emit("collided", bullet);
            bullet.emit("collided", object);
        }
        if (!collisionResult.relected && preObjCollided == true && objCollided == false) {
            this.emit("collsion_end", bullet, object);
            object.emit("collsion_end", bullet);
            bullet.emit("collsion_end", object);
        }
        return collided;
    };
    World.prototype._getBulletCoverItemSpaces = function (bullet, result) {
        var bounds = bullet.bounds;
        var startX = this.startX;
        var startY = this.startY;
        var itemWidth = this.itemWidth;
        var itemHeight = this.itemHeight;
        var startCol = Math.round((bounds.minX - startX) / itemWidth);
        var endCol = Math.round((bounds.maxX - startX) / itemWidth);
        var startRow = Math.round((bounds.minY - startY) / itemHeight);
        var endRow = Math.round((bounds.maxY - startY) / itemHeight);
        result.startCol = startCol;
        result.endCol = endCol;
        result.startRow = startRow;
        result.endRow = endRow;
    };
    World.prototype._onChangeItemPos = function () {
        console.error("It changed item pos.");
    };
    World.BORDER_COUNT = 4;
    return World;
}(EventEmitter));
exports.World = World;
