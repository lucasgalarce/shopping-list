export enum Status {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface TaskBody {
  title: string;
  description: string;
  status: Status;
}
