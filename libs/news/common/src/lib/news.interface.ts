export interface INews {
  _id: string;
  title: string;
  description: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNews {
  title: string;
  description: string;
}

export type UpdateNews = Partial<INews>;
