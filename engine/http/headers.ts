type HttpHeadersKeys =
    | "accept"
    | "accept-charset"
    | "accept-encoding"
    | "accept-language"
    | "authorization"
    | "cache-control"
    | "connection"
    | "content-length"
    | "content-type"
    | "cookie"
    | "host"
    | "origin"
    | "referer"
    | "user-agent";

export type HttpHeaders = {
    [key in HttpHeadersKeys]: string
}