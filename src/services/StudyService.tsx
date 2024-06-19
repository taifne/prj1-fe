import interceptor from "@/apis/interceptor"
import { requestApiHelper } from "@/helpers/request"
import { Event } from "@/types/eventinput";

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

    static async deletePost(id:string) {
        let love= await requestApiHelper(
            interceptor.put(
                `studys/${id}`
            )   
        )
        return love;
    }

    static async createNewSeNew(event: Event) {
        return await requestApiHelper(
            interceptor.post(
                "studys/create",
                event
            )   
        )
    }


}

export default StudyService