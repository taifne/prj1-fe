import interceptor from "modules/ManageAccount/apis/interceptor"
import { requestApiHelper } from "modules/ManageAccount/helpers/request"
import { User } from "modules/ManageAccount/types/User"

class UserService {

    static async createUser(user) {
        return await requestApiHelper(
            interceptor.post(
                "iam/users",
                user
            )
        )
    }

    static async getUsers() {
        return await requestApiHelper<User[]>(
            interceptor.get("iam/users")
        )
    }
}

export default UserService