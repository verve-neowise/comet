import Endpoint from "./endpoint";
import { Input } from "./context";
import {HttpMethod} from "./http/method";
import {EngineNode} from "./node";
import {Handler, IRouter} from "express";

class EndpointInfo<T extends Input = Input> {
    constructor(
        public readonly method: HttpMethod,
        public readonly path: string,
        public readonly endpoint: Endpoint<T>
    ) {}
}

export default abstract class Module<T extends Input = Input> extends EngineNode<T> {

    readonly endpoints: EndpointInfo<T>[] = []

    protected constructor() {
        super()
        this.init()
    }

    get(path: string, endpoint?: Endpoint<T>) {
        this.add(HttpMethod.GET, path, endpoint)
    }

    post(path: string, endpoint?: Endpoint<T, any>) {
        this.add(HttpMethod.POST, path, endpoint);
    }

    put(path: string, endpoint?: Endpoint<T, any>) {
        this.add(HttpMethod.PUT, path, endpoint);
    }

    delete(path: string, endpoint?: Endpoint<T, any>) {
        this.add(HttpMethod.DELETE, path, endpoint);
    }

    patch(path: string, endpoint?: Endpoint<T, any>) {
        this.add(HttpMethod.PATCH, path, endpoint);
    }

    head(path: string, endpoint?: Endpoint<T, any>) {
        this.add(HttpMethod.HEAD, path, endpoint);
    }

    options(path: string, endpoint?: Endpoint<T, any>) {
        this.add(HttpMethod.OPTIONS, path, endpoint);
    }

    private add(method: HttpMethod, path: string, endpoint?: Endpoint<T, any>): void {
        if (endpoint) {
            this.endpoints.push(new EndpointInfo(method, path, endpoint))
        }
    }

    public prepare(iRouter: IRouter) {
        super.prepare(iRouter)

        this.endpoints.forEach(info => {

            const handlers: Handler[] = []

            info.endpoint.interceptors.forEach(interceptor => {
                handlers.push(this.interceptorHandler(interceptor))
            })

            info.endpoint.guards.forEach(guard => {
                handlers.push(this.guardHandler(guard))
            })

            handlers.push(this.endpointHandler(info.endpoint))

            iRouter[info.method](info.path, handlers)
        })
    }

    abstract init() : void
}