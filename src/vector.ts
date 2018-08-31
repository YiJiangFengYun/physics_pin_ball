export class Vector {
    public static subVectors(vec1:Vector, vec2:Vector, result?:Vector):Vector {
        if (! result) result = new Vector();
        result.x = vec1.x - vec2.x;
        result.y = vec1.y - vec2.y;
        return result;
    }

    public static addVectors(vec1:Vector, vec2:Vector, result?:Vector):Vector {
        if (! result) result = new Vector();
        result.x = vec1.x + vec2.x;
        result.y = vec1.y + vec2.y;
        return result;
    }

    public static mulVectorMag(vec:Vector, magnitude:number, result?:Vector):Vector {
        if (! result) result = new Vector();
        result.x = vec.x * magnitude;
        result.y = vec.y * magnitude;
        return result;
    }

    public static normalVector(vec:Vector, result?:Vector):Vector {
        if (! result) result = vec.clone();
        else result.copy(vec);
        result.normal();
        return result;
    }

    public static dotVectors(vec1:Vector, vec2:Vector):number {
        return vec1.x * vec2.x + vec1.y * vec2.y;
    }

    public static reflectVector(vec:Vector, normal:Vector, result?:Vector):Vector {
        if (! result) result = new Vector();
        else if (result == vec) {
            throw new Error("The result shouldn't be argument vec.");
        }
        let dot = Vector.dotVectors(vec, normal);
        if (dot < 0) {
            result.copy(normal);
            result.mulMag(dot * 2);
            Vector.subVectors(vec, result, result);
        } else {
            result.copy(normal);
            result.mulMag(vec.magnitude());
        }
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

    mulMag(magnitude:number):void {
        this.x *= magnitude;
        this.y *= magnitude;
    }

    magnitude():number {
        var x = this.x;
        var y = this.y;
        return Math.sqrt(x * x + y * y);
    }

    manitudeSquare():number {
        var x = this.x;
        var y = this.y;
        return x * x + y * y;
    }

    normal():void {
        let magnitude = this.magnitude();
        this.x /= magnitude;
        this.y /= magnitude;
    }

    zero():void {
        this.x = 0;
        this.y = 0;
    }
}