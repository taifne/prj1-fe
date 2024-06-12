import { AxiosResponse } from "axios"

export type ResponseBase<D = any, M = any> = {
    error: false
    success: true
    statusCode: number
    httpStatus: number
    message: string,
    data: D
    meta: M
    original: AxiosResponse<D, M>
} | {
    error: true
    success: false
    statusCode?:any
    httpStatus?:any
    message?:any
    data?:any
    meta?:any
    original?:any
    errorDetail?: unknown | any
}