import express, {Express, Handler, NextFunction, Request, Response, Router} from 'express'
import Module from "./module";
import Endpoint from "./endpoint";
import {Context, Guard, Interceptor} from "./context";
import {HttpResponse} from "./http/status";

export default class Engine {

    private readonly express: Express = express()

    module(path: string, module: Module) {
        const router = Router({mergeParams: true})

        router.use(contextProvider)

        module.interceptors.forEach(interceptor => {
            router.use(interceptorHandler(interceptor))
        })

        module.guards.forEach(interceptor => {
            router.use(guardHandler(interceptor))
        })

        module.endpoints.forEach(info => {

            const handlers: Handler[] = []

            info.endpoint.interceptors.forEach(interceptor => {
                handlers.push(interceptorHandler(interceptor))
            })

            info.endpoint.guards.forEach(interceptor => {
                handlers.push(guardHandler(interceptor))
            })

            handlers.push(endpointHandler(info.endpoint))

            router[info.method](info.path, handlers)
        })

        this.express.use(path, router)
    }

    start(port: number | undefined) {
        this.express.listen(port, () => {
            console.log('Server is running on port ' + port)
        })
    }
}

function interceptorHandler(interceptor: Interceptor) {
    return (req: Request, res: Response, next: NextFunction) => {

        const context: Context = res.locals.context

        try {
            const response = interceptor(context)

            if (response === undefined) {
                next()
            }
            else if (response instanceof HttpResponse) {
                res.status(response.code).json(response)
            }
            else if (response instanceof Promise) {
                response.then(result => {
                    if (result instanceof HttpResponse) {
                        res.status(result.code).json(result)
                    }
                    else {
                        context.locals = result
                        next()
                    }
                })
                .catch(error => {
                    next(error)
                })
            }
            else {
                context.locals = response
                next()
            }
        } catch (error: any) {
            next(error)
        }
    }
}

function guardHandler(guard: Guard) {
    return (req: Request, res: Response, next: NextFunction) => {

        const context: Context = res.locals.context

        try {
            const response = guard(context)

            if (response) {
                next()
            }
            else {
                res.sendStatus(403)
            }
        } catch (error: any) {
            next(error)
        }
    }
}

function endpointHandler(endpoint: Endpoint) {
    return (req: Request, res: Response, next: NextFunction) => {

        const context: Context = res.locals.context

        try {
            const response = endpoint.execute(context)

            if (response === undefined) {
                res.sendStatus(200)
            }
            else if (response instanceof HttpResponse) {
                res.status(response.code).json(response)
            }
            else {
                response.then(result => {
                    if (result == undefined) {
                        res.sendStatus(200)
                    }
                    else {
                        res.status(result.code).json(result)
                    }
                })
                .catch(error => {
                    next(error)
                })
            }
        } catch (error: any) {
            next(error)
        }
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