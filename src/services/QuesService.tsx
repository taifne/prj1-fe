import interceptor from "@/apis/interceptor"
import { requestApiHelper } from "@/helpers/request"
import { User } from "@/types/User"
import { Question } from "@/types/Ques"
class QuesService {

    static async createUser(user: any) {
        return await requestApiHelper(
            interceptor.post(
                "questions",
                user
            )
        )
    }


    static async getAllQuestion() {
        let quess = await requestApiHelper<Question[]>(
            interceptor.get("questions")
        )
        return quess;
    }
    static async getAQuestion(id: string) {
        let ques = await requestApiHelper<Question[]>(
            interceptor.get(`questions/${id}`)
        )
        return ques;
    }
    static async getALLCommentforthisQuestions(id: string) {
        let commentTree = await requestApiHelper<Comment[]>(
            interceptor.get(`comments/question/${id}`)
        )
        return commentTree;
    }
}

export default QuesService