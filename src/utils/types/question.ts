import { User } from '@/utils/types/user'
export type Question = {
    _id:string;
    title: string;
    body: string;
    user: User; // Assuming the ObjectId is represented as a string in the frontend
    votes: number;
    createdAt: Date;
};