import { Obj } from "./object";
import { unitSize } from "./unit";

export class Circle extends Obj {
    constructor() {
        super();
    }

    get radius():number {
        return unitSize;
    }
}