import {Input, Context, Guard, Interceptor} from "./context";
import {HttpResponse} from "./http/status";

export default abstract class Endpoint<I extends Input = Input, R = HttpResponse> {

    readonly guards: Guard<I>[] = []
    readonly interceptors: Interceptor<I>[] = []

    constructor() {
        this.init()
    }

    abstract init() : void

    protected guard(guard: Guard<I>) {
        this.guards.push(guard)
    }
    protected interceptor(interceptor: Interceptor<I>) {
        this.interceptors.push(interceptor)
    }

    abstract execute(context: Context<I>): R | Promise<R> | Promise<void> | void
}