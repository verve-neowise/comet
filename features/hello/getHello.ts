import {Endpoint} from "../../engine";
import { Context } from "../../engine/context";
import { CommonInput } from "../shared/input";
import {HttpResponse, OK} from "../../engine/http/status";

interface HelloInput extends CommonInput {
    query: {
        name: string | undefined
    }
}

export class GetHello extends Endpoint<HelloInput, HttpResponse> {

    init() {
    }

    async execute(context: Context<HelloInput>) {
        return OK(`Hello ${context.query.name}`)
    }
}