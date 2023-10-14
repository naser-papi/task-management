export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskSatus;
}

export enum TaskSatus {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}
