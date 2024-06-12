import interceptor from "@/apis/interceptor"
import { requestApiHelper } from "@/helpers/request"

class StudyService {

    static async getAllStudyPosts() {
        let love = await requestApiHelper(
            interceptor.get(
                "studys"
            )   
        )
        console.log(love);
        return love;
    }

}

export default StudyService