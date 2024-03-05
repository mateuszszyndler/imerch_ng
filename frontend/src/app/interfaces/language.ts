export interface Language {
  _id: string;
  name: string;
  code: string;
  deletedAt: Date | null;
  isActive: boolean;
  version: number;
}
