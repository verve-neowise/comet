import express, {Express, Handler, NextFunction, Request, Response, Router} from 'express'
import Module from "./module";
import { Input } from "./context";
import {EngineNode} from "./node";

export default class Engine<T extends Input = Input> extends EngineNode<T> {

    private readonly express: Express = express()

    private readonly modules: { path: string, module: Module<any> }[] = []

    module(path: string, module: Module<any>) {
        this.modules.push({
            path,
            module
        })
    }

    public prepare() {

        super.prepare(this.express)

        this.modules.forEach(( { path, module } ) => {
            this.attachModule(path, module)
        })
    }

    private attachModule(path: string, module: Module<any>) {
        const router = Router({ mergeParams: true })

        router.use(contextProvider)

        module.prepare(router)

        this.express.use(path, router)
    }

    start(port: number | undefined) {

        this.prepare()

        this.express.listen(port, () => {
            console.log('Server is running on port ' + port)
        })
    }
}


function contextProvider(req: Request, res: Response, next: NextFunction) {
    res.locals.context = {
        params: parseObject(req.params),
        query: parseObject(req.query),
        headers: parseObject(req.headers),
        body: req.body,
        locals: {},
        request: req,
        response: res
    }

    next()
}

function parseObject<T extends Object>(obj: T): { [K in keyof T]: string } {
    const result = {} as { [K in keyof T]: string };
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = String(obj[key]);
        }
    }
    return result;
}