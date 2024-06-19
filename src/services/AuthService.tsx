import interceptor from "@/apis/interceptor"
import { requestApiHelper } from "@/helpers/request"
import { SignUpInfo, LoginInfo } from "@/types/SignUpAccount"
import { useDispatch } from 'react-redux';
import { ResponseBase } from "@/types/ResponseBase"
import { AxiosError, AxiosResponse } from "axios"
import { login } from "@/store/slices/auth"
class AuthService {

    static async Register(signUpdt: SignUpInfo) {
        return await requestApiHelper(
            interceptor.post(
                "auth/signup",
                signUpdt
            )
        )
    }

    static async GetMe() {
        return await requestApiHelper<GetMe>(
            interceptor.get(
                "auth/me"
            )
        )

    }
    static async Logout() {
        return await requestApiHelper(
            interceptor.get(
                "auth/logout"
            )
        )

    }




    static async Login(lgdata: LoginInfo): Promise<any> {
        try {
            const response: AxiosResponse<any> = await interceptor.post(
                "auth/login",
                lgdata
            );



            localStorage.setItem('token', response.data?.accessToken);

            // Return the response data as JSON
            return response.data;
        } catch (error: any) {
            // If it's an AxiosError, handle it and return the response data if available
            if (error.isAxiosError) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    return axiosError.response.data;
                }
            }
            // If it's not an AxiosError or if there's no response data, rethrow the error
            throw error;
        }
    }
}
export default AuthService