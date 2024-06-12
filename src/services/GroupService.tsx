import interceptor from "@/apis/interceptor"
import { requestApiHelper } from "@/helpers/request"

class GroupService {

    static async getAllGroup() {
        let love= await requestApiHelper(
            interceptor.get(
                "groups"
            )   
        )
        console.log(love);
        return love;
    }
    static async craeteNewGroup(group: any) {
        return await requestApiHelper(
            interceptor.post(
                "groups",
                group
            )   
        )
    }

}

export default GroupService