import { uniqID } from "helpers";
import { userDto } from "./types";

export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const lessons = ["Math", "History", "coding"] as const;

export const DATA: Array<userDto> = [
  {
    id: uniqID(),
    name: "Aldo",
    schedule: [
      {
        id: uniqID(),
        lesson: lessons[0],
        days: [1],
      },
      {
        id: uniqID(),
        lesson: lessons[1],
        days: [5],
      },
    ],
  },
  {
    id: uniqID(),
    name: "Zara",
    schedule: [
      {
        id: uniqID(),
        lesson: lessons[1],
        days: [2],
      },

      {
        id: uniqID(),
        lesson: lessons[0],
        days: [4],
      },
    ],
  },
  {
    id: uniqID(),
    name: "Beckham",
    schedule: [
      {
        id: uniqID(),
        lesson: lessons[2],
        days: [1, 2],
      },
    ],
  },
  {
    id: uniqID(),
    name: "Marcelo",
    schedule: [
      {
        id: uniqID(),
        lesson: lessons[2],
        days: [5],
      },

      {
        id: uniqID(),
        lesson: lessons[0],
        days: [3],
      },
    ],
  },
];
