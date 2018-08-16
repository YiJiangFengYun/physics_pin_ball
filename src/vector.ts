export class Vector {
    public static subVectors(vec1:Vector, vec2:Vector, result?:Vector):Vector {
        if (! result) result = vec1.clone();
        else result.copy(vec1);
        result.sub(vec2);
        return result;
    }

    public static addVectors(vec1:Vector, vec2:Vector, result?:Vector):Vector {
        if (! result) result = vec1.clone();
        else result.copy(vec1);
        result.add(vec2);
        return result;
    }

    x:number;
    y:number;
    constructor(x:number = 0, y:number = 0) {
        this.x = x;
        this.y = y;
    }

    clone():Vector {
        return new Vector(this.x, this.y);
    }

    copy(target:Vector):void {
        this.x = target.x;
        this.y = target.y;
    }

    sub(target:Vector):void {
        this.x -= target.x;
        this.y -= target.y;
    }

    add(target:Vector):void {
        this.x += target.x;
        this.y += target.y;
    }

    magnitude():number {
        var x = this.x;
        var y = this.y;
        return Math.sqrt(x * x + y * y);
    }

    normal():void {
        let magnitude = this.magnitude();
        this.x /= magnitude;
        this.y /= magnitude;
    }
}