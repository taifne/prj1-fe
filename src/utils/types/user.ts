export type UserType = {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: UserDetail;
};

export type UserDetail = {
  createdAt: string;
  active: boolean;
  id: string;
  userName: string;
  email: string;
  status: string;
  modified: string;
  role: string
};
export type TenantUser = {
  fullName: string,
  tenantId: string,
  active: string,
  updatedDate: string

}
