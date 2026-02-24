export type Category = 'Munka' | 'Személyes' | 'Bevásárlás' | 'Egyéb';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  deadline?: string;
  category: Category;
  createdAt: number;
}
