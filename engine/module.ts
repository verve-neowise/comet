import Endpoint from "./endpoint";
import {Guard, Interceptor} from "./context";
import {HttpMethod} from "./http/method";

class EndpointInfo {
    constructor(
        public readonly method: HttpMethod,
        public readonly path: string,
        public readonly endpoint: Endpoint
    ) {}
}

export default abstract class Module {

    readonly guards: Guard[] = []
    readonly interceptors: Interceptor[] = []
    readonly endpoints: EndpointInfo[] = []

    protected constructor() {
        this.init()
    }

    protected guard(guard: Guard) {
        this.guards.push(guard)
    }

    protected interceptor(interceptor: Interceptor) {
        this.interceptors.push(interceptor)
    }

    get(path: string, endpoint?: Endpoint<any, any>) {
        this.add(HttpMethod.GET, path, endpoint)
    }

    post(path: string, endpoint?: Endpoint<any, any>) {
        this.add(HttpMethod.POST, path, endpoint);
    }

    put(path: string, endpoint?: Endpoint<any, any>) {
        this.add(HttpMethod.PUT, path, endpoint);
    }

    delete(path: string, endpoint?: Endpoint<any, any>) {
        this.add(HttpMethod.DELETE, path, endpoint);
    }

    patch(path: string, endpoint?: Endpoint<any, any>) {
        this.add(HttpMethod.PATCH, path, endpoint);
    }

    head(path: string, endpoint?: Endpoint<any, any>) {
        this.add(HttpMethod.HEAD, path, endpoint);
    }

    options(path: string, endpoint?: Endpoint<any, any>) {
        this.add(HttpMethod.OPTIONS, path, endpoint);
    }

    private add(method: HttpMethod, path: string, endpoint?: Endpoint<any, any>): void {
        if (endpoint) {
            this.endpoints.push(new EndpointInfo(method, path, endpoint))
        }
    }

    abstract init() : void
}