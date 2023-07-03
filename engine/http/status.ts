export class HttpResponse {

    constructor(
        public readonly code: number,
        public readonly message: string,
        public readonly data: any
    ) {}
}

export function Continue(message?: string, data?: any) {
  return new HttpResponse(100, message ?? "Continue", data);
}

export function SwitchingProtocols(message?: string, data?: any) {
  return new HttpResponse(101, message ?? "Switching Protocols", data);
}

export function OK(message?: string, data?: any) {
  return new HttpResponse(200, message ?? "OK", data);
}

export function Created(message?: string, data?: any) {
  return new HttpResponse(201, message ?? "Created", data);
}

export function Accepted(message?: string, data?: any) {
  return new HttpResponse(202, message ?? "Accepted", data);
}

export function NonAuthoritativeInformation(message?: string, data?: any) {
  return new HttpResponse(203, message ?? "Non-Authoritative Information", data);
}

export function NoContent(message?: string, data?: any) {
  return new HttpResponse(204, message ?? "No Content", data);
}

export function ResetContent(message?: string, data?: any) {
  return new HttpResponse(205, message ?? "Reset Content", data);
}

export function PartialContent(message?: string, data?: any) {
  return new HttpResponse(206, message ?? "Partial Content", data);
}

export function MultipleChoices(message?: string, data?: any) {
  return new HttpResponse(300, message ?? "Multiple Choices", data);
}

export function MovedPermanently(message?: string, data?: any) {
  return new HttpResponse(301, message ?? "Moved Permanently", data);
}

export function Found(message?: string, data?: any) {
  return new HttpResponse(302, message ?? "Found", data);
}

export function SeeOther(message?: string, data?: any) {
  return new HttpResponse(303, message ?? "See Other", data);
}

export function NotModified(message?: string, data?: any) {
  return new HttpResponse(304, message ?? "Not Modified", data);
}

export function UseProxy(message?: string, data?: any) {
  return new HttpResponse(305, message ?? "Use Proxy", data);
}

export function TemporaryRedirect(message?: string, data?: any) {
  return new HttpResponse(307, message ?? "Temporary Redirect", data);
}

export function PermanentRedirect(message?: string, data?: any) {
  return new HttpResponse(308, message ?? "Permanent Redirect", data);
}

export function BadRequest(message?: string, data?: any) {
  return new HttpResponse(400, message ?? "Bad Request", data);
}

export function Unauthorized(message?: string, data?: any) {
  return new HttpResponse(401, message ?? "Unauthorized", data);
}

export function PaymentRequired(message?: string, data?: any) {
  return new HttpResponse(402, message ?? "Payment Required", data);
}

export function Forbidden(message?: string, data?: any) {
  return new HttpResponse(403, message ?? "Forbidden", data);
}

export function NotFound(message?: string, data?: any) {
  return new HttpResponse(404, message ?? "Not Found", data);
}

export function MethodNotAllowed(message?: string, data?: any) {
  return new HttpResponse(405, message ?? "Method Not Allowed", data);
}

export function NotAcceptable(message?: string, data?: any) {
  return new HttpResponse(406, message ?? "Not Acceptable", data);
}

export function ProxyAuthenticationRequired(message?: string, data?: any) {
  return new HttpResponse(407, message ?? "Proxy Authentication Required", data);
}

export function RequestTimeout(message?: string, data?: any) {
  return new HttpResponse(408, message

 ?? "Request Timeout", data);
}

export function Conflict(message?: string, data?: any) {
  return new HttpResponse(409, message ?? "Conflict", data);
}

export function Gone(message?: string, data?: any) {
  return new HttpResponse(410, message ?? "Gone", data);
}

export function LengthRequired(message?: string, data?: any) {
  return new HttpResponse(411, message ?? "Length Required", data);
}

export function PreconditionFailed(message?: string, data?: any) {
  return new HttpResponse(412, message ?? "Precondition Failed", data);
}

export function PayloadTooLarge(message?: string, data?: any) {
  return new HttpResponse(413, message ?? "Payload Too Large", data);
}

export function URITooLong(message?: string, data?: any) {
  return new HttpResponse(414, message ?? "URI Too Long", data);
}

export function UnsupportedMediaType(message?: string, data?: any) {
  return new HttpResponse(415, message ?? "Unsupported Media Type", data);
}

export function RangeNotSatisfiable(message?: string, data?: any) {
  return new HttpResponse(416, message ?? "Range Not Satisfiable", data);
}

export function ExpectationFailed(message?: string, data?: any) {
  return new HttpResponse(417, message ?? "Expectation Failed", data);
}

export function MisdirectedRequest(message?: string, data?: any) {
  return new HttpResponse(421, message ?? "Misdirected Request", data);
}

export function UnprocessableEntity(message?: string, data?: any) {
  return new HttpResponse(422, message ?? "Unprocessable Entity", data);
}

export function Locked(message?: string, data?: any) {
  return new HttpResponse(423, message ?? "Locked", data);
}

export function FailedDependency(message?: string, data?: any) {
  return new HttpResponse(424, message ?? "Failed Dependency", data);
}

export function TooEarly(message?: string, data?: any) {
  return new HttpResponse(425, message ?? "Too Early", data);
}

export function UpgradeRequired(message?: string, data?: any) {
  return new HttpResponse(426, message ?? "Upgrade Required", data);
}

export function PreconditionRequired(message?: string, data?: any) {
  return new HttpResponse(428, message ?? "Precondition Required", data);
}

export function TooManyRequests(message?: string, data?: any) {
  return new HttpResponse(429, message ?? "Too Many Requests", data);
}

export function RequestHeaderFieldsTooLarge(message?: string, data?: any) {
  return new HttpResponse(431, message ?? "Request Header Fields Too Large", data);
}

export function UnavailableForLegalReasons(message?: string, data?: any) {
  return new HttpResponse(451, message ?? "Unavailable For Legal Reasons", data);
}

export function InternalServerError(message?: string, data?: any) {
  return new HttpResponse(500, message ?? "Internal Server Error", data);
}

export function NotImplemented(message?: string, data?: any) {
  return new HttpResponse(501, message ?? "Not Implemented", data);
}

export function BadGateway(message?: string, data?: any) {
  return new HttpResponse(502, message ?? "Bad Gateway", data);
}

export function ServiceUnavailable(message?: string, data?: any) {
  return new HttpResponse(503, message ?? "Service Unavailable", data);
}

export function GatewayTimeout(message?: string, data?: any) {
  return new HttpResponse(504, message ?? "Gateway Timeout", data);
}

export function HTTPVersionNotSupported(message?: string, data?: any) {
  return new HttpResponse(505, message ?? "HTTP Version Not Supported",

 data);
}

export function VariantAlsoNegotiates(message?: string, data?: any) {
  return new HttpResponse(506, message ?? "Variant Also Negotiates", data);
}

export function InsufficientStorage(message?: string, data?: any) {
  return new HttpResponse(507, message ?? "Insufficient Storage", data);
}

export function LoopDetected(message?: string, data?: any) {
  return new HttpResponse(508, message ?? "Loop Detected", data);
}

export function NotExtended(message?: string, data?: any) {
  return new HttpResponse(510, message ?? "Not Extended", data);
}

export function NetworkAuthenticationRequired(message?: string, data?: any) {
  return new HttpResponse(511, message ?? "Network Authentication Required", data);
}
