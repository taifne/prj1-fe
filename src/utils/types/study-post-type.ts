
export type StydyType = {
  _id: string;
  title: string;
  description: string;
  link: string;
  startDay: string;
  endDay: string;
  createdBy: {
      _id: string;
      avatar: string;
      status: string;
      fullName: string;
  };
  image: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

