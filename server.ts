import Engine from "./engine/engine";
import {HelloModule} from "./features/hello";

const engine = new Engine()

engine.module('/hello', new HelloModule())

engine.start(3000)