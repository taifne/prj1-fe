import interceptor from "@/apis/interceptor"
import { requestApiHelper } from "@/helpers/request"
import { User } from "@/types/User"
import { Question } from "@/types/Ques"
import { CommentCreate, CommentData, CommentUpdate } from "@/types/Comment";
class CommentServce {

    static async createAComment(data:Partial<CommentCreate>): Promise<CommentData | null> {
        try {
     
            const response = await interceptor.post(`/comments/create`,data);
            return response.data;
        } catch (error) {
            console.error("Error fetching comments:", error);
            return null;
        }
    }

    static async getALLCommentforthisQuestions(id:string|null) {
      let commentTree= await requestApiHelper<Comment[]>(
        interceptor.get(`comments/question/${id}`)
      )
      return commentTree;
    }
    static async deleteMyComment(id: string): Promise<CommentData | null> {
      try {
          const response = await interceptor.delete(`/comments/${id}`);
          return response.data;
      } catch (error) {
          console.error("Error fetching comments:", error);
          return null;
      }
  }
  
  static async likeComment(data:Partial<CommentUpdate>,Id:string): Promise<CommentData | null> {
    try {
        console.log(data);
        const response = await interceptor.patch(`/comments/${Id}`,data);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return null;
    }
}
}

export default CommentServce ;