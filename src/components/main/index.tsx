import React from "react";
import { Modal, Slider } from "ui";
import { dayTypes, dragTypes, dropTypes } from "./types";
import { DATA, daysOfWeek, lessons } from "constans";
import { uniqID } from "helpers";
import "./styles.scss";

export const Main: React.FC = () => {
  const [isOpenModal, setOpenModal] = React.useState(false);

  const [data, setData] = React.useState(DATA);
  const [newItem, setNewItem] = React.useState<
    dayTypes & { userId: Number | null }
  >({
    id: uniqID(),
    days: [],
    lesson: "",
    userId: null,
  });

  // dd states
  const [dorpState, setDropState] = React.useState<dayTypes>();
  const [isDropped, setIsDropped] = React.useState<boolean>(false);

  // get day index
  const getDayPosition = (day: string) => {
    return daysOfWeek?.findIndex((item) => item === day) + 1;
  };

  // get day name
  const getDayName = (days: Array<number>) => {
    const [start] = days;
    return `${daysOfWeek[start - 1]}`;
  };

  // check moved position
  const checkPosition = (
    userId: number,
    days: Array<number>,
    newPosition: number
  ) => {
    const [start, end] = days;
    if (start > 5 || end > 5) return true;
    if (start !== newPosition) return true;

    return data[userId]?.schedule.some(
      (item) => item.days.includes(start) || item.days.includes(end)
    );
  };

  const handleAddItem = () => {
    const { userId, ...rest } = newItem;
    if (userId) {
      const userIndex = data.findIndex((user) => user.id === userId);
      data[userIndex].schedule.push(rest);
      setData(data);
      setOpenModal(false);
    }
  };

  const handleMouseEnter = (userId: number, newposition: number) => {
    if (checkPosition(userId, [newposition], newposition)) return;
    setNewItem((state) => ({
      ...state,
      id: uniqID(),
      userId: userId,
      days: [newposition],
    }));
    setOpenModal(true);
  };

  const onDragOver = ({ event }: dropTypes) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const onDragStart = ({ event: e, schedule }: dragTypes) => {
    if (e.target !== e.currentTarget) return;
    setDropState(schedule);
  };

  const onDrop = ({ event, userId, position }: dropTypes) => {
    event.stopPropagation();
    event.preventDefault();

    if (dorpState) {
      if (checkPosition(userId, dorpState.days, position)) return;

      // add schedule
      const userIndex = data.findIndex((user) => user.id === userId);
      data[userIndex].schedule.push(dorpState);

      setData(data);
      setIsDropped(true);
    }
  };

  // get user index and remove moved item
  const onDragEnd = ({ userId }: dragTypes) => {
    if (isDropped && dorpState) {
      const userIndex = data.findIndex((user) => user.id === userId);
      data[userIndex].schedule = data[userIndex].schedule.filter(
        (item) => item.id !== dorpState.id
      );
      setData(data);
      setIsDropped(false);
    }
  };

  return (
    <div className="main">
      <div className="main-list">
        <ul className="haeder list-row">
          <li className="list-row--item">person</li>
          {daysOfWeek?.map((day) => (
            <li key={day} className="list-row--item">
              {day}
            </li>
          ))}
        </ul>
        {data.map((user) => (
          <ul key={user.id} className="list-row">
            <li className="empty">
              <ul className="list-row">
                <li className="list-row--item">{user.name}</li>
                {daysOfWeek?.map((day) => (
                  <li
                    key={day}
                    className="list-row--item cell-empty"
                    onMouseDown={() =>
                      handleMouseEnter(user.id, getDayPosition(day))
                    }
                    onDragOver={(event) =>
                      onDragOver({
                        event,
                        userId: user.id,
                        position: getDayPosition(day),
                      })
                    }
                    onDrop={(event) =>
                      onDrop({
                        event,
                        userId: user.id,
                        position: getDayPosition(day),
                      })
                    }
                  />
                ))}
              </ul>
            </li>
            <li className="drag">
              <ul className="list-row">
                {user.schedule.map((item, index) => (
                  <li key={item.id} className="drag-item">
                    <Slider
                      draggable
                      key={index}
                      title={item.lesson}
                      schedule={user.schedule}
                      start={item.days[0]}
                      end={item.days[item.days.length - 1]}
                      onDragEnd={(event) =>
                        onDragEnd({
                          event,
                          userId: user.id,
                          schedule: item,
                        })
                      }
                      onDragStart={(event) =>
                        onDragStart({
                          event,
                          userId: user.id,
                          schedule: item,
                        })
                      }
                    />
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ))}
      </div>
      <Modal isOpen={isOpenModal} handleOpen={() => setOpenModal(!isOpenModal)}>
        <div className="modal-content">
          <h4>{getDayName(newItem.days)}</h4>
          <span>Choose subject</span>
          <select
            required
            name="select"
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, lesson: e.target.value }))
            }
          >
            <option disabled defaultChecked selected value="">
              Please select a lesson*
            </option>
            {lessons.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="button"
            title="Please select a lesson"
            onClick={() => handleAddItem()}
            disabled={!newItem.lesson}
          >
            add
          </button>
        </div>
      </Modal>
    </div>
  );
};
