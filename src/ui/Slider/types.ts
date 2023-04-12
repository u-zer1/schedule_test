import { scheduleTypes } from "constans/types";

export type SliderProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  start?: number;
  end?: number;
  schedule: Array<scheduleTypes>;
};
