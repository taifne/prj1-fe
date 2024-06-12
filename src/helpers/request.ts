import { AxiosResponse } from "axios";

type ResponseBase<D = any, M = any> = {
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

const requestApiHelper = async <D = any, M = any>(promise: Promise<AxiosResponse<ResponseBase<D, M>>>): Promise<ResponseBase<D, M>> => {
    try {
        const { data } = await promise
        return data
    } catch (error) {
        return {
            error: true,
            success: false,
            errorDetail: error
        }
    }
}

export {
    requestApiHelper
};

