interface GetMe {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    isVerified: boolean;
    status: string;
    role: string;
    permissions: string[];
    createdAt: string;
    updatedAt: string;
    fullName: string;
    group: Group[];
}

interface Group {
    _id: string;
    createdBy: string;
    name: string;
    color: string;
    users: GroupUser[];
    permissions: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface GroupUser {
    _id: string;
  group: string[];
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  isVerified: boolean;
  status: string;
  role: string;
  permissions: (string | null)[];
  createdAt: string;
  updatedAt: string;
  fullName: string;
  __v: number;
}
