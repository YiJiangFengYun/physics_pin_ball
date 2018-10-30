import { Obj } from "./object";
import { Vector } from "./vector";
import { Bullet } from "./bullet";
import * as EventEmitter from "eventemitter3";
import { Collision, ICollideResult } from "./collision";

export interface IItemSpace  {
    startRow:number; 
    endRow:number; 
    startCol:number; 
    endCol:number;
}

export class World extends EventEmitter {
    static BORDER_COUNT = 4;
    static vectorHelper = new Vector();
    width:number;
    height:number;
    startX:number;
    startY:number;
    time:number;
    
    bulletCount:number;
    bullets:Bullet[];

    borders:Obj[];

    itemRowCount:number;
    itemColCount:number;
    itemWidth:number;
    itemHeight:number;
    items:Obj[][];

    objectCount:number;
    objects: Obj[];

    collectionMap:{[idsKey:string]: boolean};

    collision:Collision;

    constructor(
        info: {
            width:number;
            height:number;
            itemRowCount:number; 
            itemColCount:number;
        }
    ) {
        super();
        this.width = info.width;
        this.height = info.height;
        this.startX = - info.width / 2;
        this.startY = - info.height / 2;
        this.time = 0;
        this.bulletCount = 0;
        this.bullets = [];

        this.borders = [];
        this.borders.length = World.BORDER_COUNT;

        this.itemRowCount = info.itemRowCount;
        this.itemColCount = info.itemColCount;
        this.itemWidth = info.width / info.itemColCount;
        this.itemHeight = info.height / info.itemRowCount;

        let items:Obj[][] = [];
        this.items = items;
        this.items.length = info.itemRowCount;
        for (let i = 0; i < info.itemRowCount; ++i) {
            items[i] = [];
            items[i].length = info.itemColCount;
        }

        this.objectCount = 0;
        this.objects = [];

        this.collectionMap = {};

        this.collision = new Collision();
    }

    addBorder(border:Obj, index:number) {
        if (index >= World.BORDER_COUNT) throw new Error("Index of the border is out of range of " + World.BORDER_COUNT);
        if (this.borders[index]) {
            console.warn("The border at the index has exist!");
            this.removeBorder(index);
        }
        this.borders[index] = border;
    }

    removeBorder(borderOrIndex:Obj | number) {
        let index = borderOrIndex instanceof Obj ? this.borders.indexOf(borderOrIndex as Obj) : borderOrIndex;
        if (index >= 0) {
            this.borders[index] = null;
        }
    }

    addItem(item:Obj, row:number = 0, col:number = 0) {
        if (row >= this.itemRowCount) throw new Error("Row of the item is out of range of row count " + this.itemRowCount);
        if (col >= this.itemColCount) throw new Error("Col of the item is out of range of col count " + this.itemColCount);
        let items = this.items;
        if (items[row][col]) {
            console.warn("The items[" + row + "][" + col + "] has exist!");
            this.removeItem(row, col);
        }
        items[row][col] = item;
        let pos = World.vectorHelper;
        pos.x = this.startX + this.itemWidth / 2 * (col + 1);
        pos.y = this.startY + this.itemHeight / 2 * (row + 1);
        item.updatePos(pos);
        item.on("change_pos", this._onChangeItemPos, this);
    }

    removeItem(row:number, col:number) {
        if (this.items[row][col])this.items[row][col].off("change_pos", this._onChangeItemPos, this);
        this.items[row][col] = null;
    }

    clearItems() {
        let rowCount = this.itemRowCount;
        let colCount = this.itemColCount;
        let items = this.items;
        for (let i = 0; i < rowCount; ++i) {
            for (let j = 0; j < colCount; ++j) {
                items[i][j] = null;
            }
        }
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

    step(dt: number, iterations: number):void {

        dt = dt || 0;
        iterations = iterations || 1;

        let cachePosHelper:Vector = new Vector();
        let nextPosHelper:Vector = new Vector();
        let collisionResultHelper:ICollideResult = { collided:false, relected:false, normal: new Vector()};
        let collisionNormlHelper:Vector = new Vector();
        let reflectResultHelper:Vector = new Vector();
        let itemSpaceHelper:IItemSpace = {} as IItemSpace;

        let minDt:number = dt / iterations;
        for (let iteration = 0; iteration < iterations; ++iteration) {
            let bulletCount = this.bulletCount;
            let bullets = this.bullets;
            for (let bulletIndex = 0; bulletIndex < bulletCount; ++bulletIndex) {
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
                let collisionNormal = collisionNormlHelper;
                collisionNormal.zero();

                ///border
                let borders = this.borders;
                let borderCount = borders.length;
                for (let i = 0; i < borderCount; ++i) {
                    let border = borders[i];
                    if ( ! border || ! border.valid) continue;
                    collided = this._collideObj(bullet, border, collisionResult, collisionNormal);
                }

                ////item
                let items = this.items;
                let itemspace = itemSpaceHelper;
                this._getBulletCoverItemSpaces(bullet, itemspace);
                for (let row = itemspace.startRow; row <= itemspace.endRow; ++row) {
                    for (let col = itemspace.startCol; col <= itemspace.endCol; ++col) {
                        let item = items[row][col];
                        if (! item || ! item.valid) continue;
                        collided = this._collideObj(bullet, item, collisionResult, collisionNormal);
                    }
                }


                ////obj
                let objectCount = this.objectCount;
                let objects = this.objects;
                for (let i = 0; i < objectCount; ++i) {
                    let object = objects[i];
                    if ( ! object.valid) continue;
                    collided = this._collideObj(bullet, object, collisionResult, collisionNormal);
                }
    
                //Final collsion result.
                if (collided && collisionNormal.isZero() == false) {
                    let reflectResult = reflectResultHelper;
                    //Recover to cached pre postion.
                    bullet.pos = cachePos;
                    let cacheMagnitude = bullet.velocity.magnitude();
                    //Set new velocity according to collision normal.
                    Vector.reflectVector(bullet.velocity, collisionNormal, reflectResult);

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

    private _collideObj(bullet:Bullet, object:Obj, collisionResult:ICollideResult, collsionNormal:Vector):boolean {
        let collided = false;
        let objCollided = false;
        this.collision.collide(bullet, object, collisionResult);
        if (collisionResult.collided) {
            collided = true;
            objCollided = true;
            if (collisionResult.relected) collsionNormal.add(collisionResult.normal);
        }
        
        let preObjCollided = this.collectionMap[bullet.id + "_" + object.id] || false;
        this.collectionMap[bullet.id + "_" + object.id] = objCollided
        if ( ! collisionResult.relected && preObjCollided == false && objCollided == true) {
            this.emit("collision_begin", bullet, object);
            object.emit("collision_begin", bullet);
            bullet.emit("collision_begin", object);
        } 
        
        if (objCollided) {
            this.emit("collided", bullet, object);
            object.emit("collided", bullet);
            bullet.emit("collided", object);
        }
        
        if ( ! collisionResult.relected && preObjCollided == true && objCollided == false) {
            this.emit("collsion_end", bullet, object);
            object.emit("collsion_end", bullet);
            bullet.emit("collsion_end", object);
        }

        return collided;
    }

    private _getBulletCoverItemSpaces(bullet:Bullet, result?:IItemSpace):void {
        let bounds = bullet.bounds;
        let startX = this.startX;
        let startY = this.startY;
        let itemWidth = this.itemWidth;
        let itemHeight = this.itemHeight;
        let rowCount = this.itemRowCount;
        let colCount = this.itemColCount;
        let startCol = Math.round((bounds.minX - startX) / itemWidth);
        let endCol = Math.round((bounds.maxX - startX) / itemWidth);
        let startRow = Math.round((bounds.minY - startY) / itemHeight);
        let endRow = Math.round((bounds.maxY - startY) / itemHeight);
        result.startCol = Math.max(0, Math.min(colCount, startCol));
        result.endCol = Math.max(0, Math.min(colCount, endCol));
        result.startRow = Math.max(0, Math.min(rowCount, startRow));
        result.endRow = Math.max(0, Math.min(rowCount, endRow));
    }

    private _onChangeItemPos() {
        console.error("It changed item pos.");
    }
}