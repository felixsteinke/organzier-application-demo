export interface Task {
  id?: number;
  title?: string;
  entryDate?: Date;
  estimate?: number;
  priority?: string;
  dueDate?: Date;
  done?: boolean;
  description?: string;
}
