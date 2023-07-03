import {Context, Guard, Input, Interceptor} from "./context";
import {IRouter, NextFunction, Request, Response} from "express";
import {HttpResponse} from "./http/status";
import Endpoint from "./endpoint";

export abstract class EngineNode<T extends Input> {

    readonly interceptors: { path?: string, interceptor: Interceptor<T> }[] = []
    readonly guards: { path?: string, guard: Guard<T> }[] = []

    protected guard(guard: Guard<T>): void;
    protected guard(path: string, guard: Guard<T>): void;
    protected guard(pathOrGuard: string | Guard<T>, guard?: Guard<T>) {
        if (typeof pathOrGuard == 'string' && guard) {
            this.guards.push({
                path: pathOrGuard,
                guard
            })
        }
        else if (guard) {
            this.guards.push({
                guard
            })
        }
    }

    protected interceptor(interceptor: Interceptor<T>): void
    protected interceptor(path: string, interceptor: Interceptor<T>): void

    protected interceptor(pathOrInterceptor: string | Interceptor<T>, interceptor?: Interceptor<T>): void {
        if (typeof pathOrInterceptor == 'string' && interceptor) {
            this.interceptors.push({
                path: pathOrInterceptor,
                interceptor
            })
        }
        else if (interceptor) {
            this.interceptors.push({
                interceptor
            })
        }
    }

    prepare(iRouter: IRouter) {
        this.interceptors.forEach(item => {

            const handler = this.interceptorHandler(item.interceptor)

            if (item.path) {
                iRouter.use(item.path, handler)
            }
            else {
                iRouter.use(handler)
            }
        })

        this.guards.forEach(item => {

            const handler = this.guardHandler(item.guard)

            if (item.path) {
                iRouter.use(item.path, handler)
            }
            else {
                iRouter.use(handler)
            }
        })
    }


    protected interceptorHandler<T extends Input = Input>(interceptor: Interceptor<T>) {
        return (req: Request, res: Response, next: NextFunction) => {

            const context: Context<T> = res.locals.context

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

    protected guardHandler<T extends Input = Input>(guard: Guard<T>) {

        return (req: Request, res: Response, next: NextFunction) => {

            const context: Context<T> = res.locals.context

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

    protected endpointHandler<T extends Input = Input>(endpoint: Endpoint<T>) {
        return (req: Request, res: Response, next: NextFunction) => {

            const context: Context<T> = res.locals.context

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
}