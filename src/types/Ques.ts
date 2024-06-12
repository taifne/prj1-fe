import { User } from './User'
export type Question = {
    title: string;
    body: string;
    user: Pick<User, 'avatar' | 'fullName'>;
    votes: number;
    createdAt: Date;
    _id:string
};