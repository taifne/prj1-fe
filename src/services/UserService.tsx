import interceptor from "@/apis/interceptor"
import { requestApiHelper } from "@/helpers/request"
import { User } from "@/types/User"

class UserService {

    static async createUser(user: any) {
        return await requestApiHelper(
            interceptor.post(
                "users/signup",
                user
            )   
        )
    }

    static async getAllUsers() {
        let love= await requestApiHelper<User[]>(
            interceptor.get("users")
        )

        return love;
    }
}

export default UserService