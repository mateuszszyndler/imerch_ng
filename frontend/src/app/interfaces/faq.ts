export interface Faq {
  _id: string | null;
  question: string;
  answer: string;
  deletedAt: Date | null;
  isActive: boolean;
  version: number;
}
