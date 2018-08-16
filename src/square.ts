import { Obj } from "./object";
import { unitSize } from "./unit";

export class Square extends Obj {

    constructor() {
        super();
    }

    size() {
        return unitSize;
    }
}