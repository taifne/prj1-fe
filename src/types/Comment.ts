import { User } from "./User"
export interface Comment {
    id: string;
    content: string;
    parentId: number | null;
    createdAt: string;
    deletedAt: string | null;
    user: User;
    likes: like[],
    replies: Comment[];
}
export interface CommentCreate {
    questionId: string | null;
    content: string;
    parentId: string | null;



}

export interface like {
    id: string;
    username: string;

  }
  
  
export interface CommentUpdate {
    content: string;
    likes: string[];
}

export type CommentData = Comment[];
