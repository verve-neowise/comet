import {Module} from "../../engine";
import {GetHello} from "./getHello";

export class HelloModule extends Module {

    constructor() {
        super();
    }

    init(): void {
        this.get( "/hello", new GetHello())
    }
}