import {User} from "@/types/User"
export type Group = {
    _id: string;
    createdBy: User;
    name: string;
    users: User[];
    permissions: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
};
