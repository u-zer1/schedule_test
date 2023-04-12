export type userDto = {
  id: number;
  name: string;
  schedule: Array<scheduleTypes>;
};

export type scheduleTypes = {
  id: number;
  lesson: string;
  days: Array<number>;
};
