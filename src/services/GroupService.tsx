import interceptor from "modules/ManageAccount/apis/interceptor"
import { requestApiHelper } from "modules/ManageAccount/helpers/request"
import Group from "modules/ManageAccount/types/Group"

class GroupService {

    static async createUser(user) {
        return await requestApiHelper(
            interceptor.post(
                "iam/users",
                user
            )
        )
    }

    static async getGroups() {
        return await requestApiHelper<Group[]>(
            interceptor.get("iam/groups")
        )
    }
}

export default GroupService