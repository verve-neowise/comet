import { HttpHeaders } from "./http/headers";
import { HttpResponse } from "./http/status";
import {Request, Response} from "express";

export type StringParams = {
    [x: string]: string
}

export interface Input<Params = StringParams | any, Queries = StringParams | any, Headers extends { } = HttpHeaders | any, Body extends { } | any = any, Locals extends { } | any = any> {
    params: Params
    query: Queries
    headers: Headers
    body: { [key: string] : any } & Body
    locals: { [key: string] : any } & Locals,
    request: Request
    response: Response
}

export interface BaseInput extends Input {
}

type InternalContext<T extends Input = Input> = {
    [key in keyof T]: T[key]
}

export type Context<T extends Input = Input> = {
    params: T['params']
    query: T['query']
    headers: T['headers']
    body: T['body']
    locals: T['locals']
} & InternalContext<T>;

export class Locals {
}

export type Guard<I extends Input = BaseInput> = (context: Context<I>) => boolean
export type Interceptor<I extends Input = BaseInput> = (context: Context<I>) => HttpResponse | Promise<HttpResponse> | Locals | Promise<Locals> | void