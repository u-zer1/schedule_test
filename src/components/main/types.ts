import { scheduleTypes } from "constans/types";

export type dayTypes = {
  id: number;
  lesson: string;
  days: number[];
};

export type dropTypes = {
  event: React.DragEvent<HTMLElement>;
  userId: number;
  position: number;
};

export type dragTypes = Omit<dropTypes, "position"> & {
  schedule: scheduleTypes;
};
