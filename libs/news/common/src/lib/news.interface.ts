export interface INews {
  _id: string;
  title: string;
  description: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsEntity {
  _id: string;
  title: string;
  description: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;

  newsRemoveRun: boolean;
  newsRemoveError: Record<string, any> | null;

  newsChangeRun: boolean;
  newsChangeError: Record<string, any> | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface News extends NewsEntity {}

export interface CreateNews {
  title: string;
  description: string;
}

export type UpdateNews = Partial<CreateNews> & { _id: string };
