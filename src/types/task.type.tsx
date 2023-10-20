export interface Task {
  id: number;
  title: string;
  dueDate: Date;
  category: string;
  status: string;
  completedDate?: Date;
}
