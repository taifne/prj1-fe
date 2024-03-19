import interceptor from "modules/ManageAccount/apis/interceptor"
import { requestApiHelper } from "modules/ManageAccount/helpers/request"
import { Policy } from "modules/ManageAccount/types/Policy"

class PolicyService {

    static async createPolicy(policy: { name: string, policy: object }) {
        return await requestApiHelper(
            interceptor.post(
                "iam/polices",
                policy
            )
        )
    }

    static async getPolices() {
        return await requestApiHelper<Policy[]>(
            interceptor.get("iam/polices")
        )
    }
}

export default PolicyService