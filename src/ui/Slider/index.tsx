import React from "react";
import { SliderProps } from "./types";
import "./styles.scss";

const weekDays = 7;
const disabledDays = 2;
const cellWidth = 145;
const maxWidth = (weekDays - disabledDays) * cellWidth;

export const Slider = ({
  start = 1,
  end = 5,
  title,
  schedule,
  ...rest
}: SliderProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [styles, setStyles] = React.useState<React.CSSProperties>();

  const [isResizing, setIsResizing] = React.useState(false);
  const [isResizingLeft, setIsResizingLeft] = React.useState(false);
  const [isResizingRight, setIsResizingRight] = React.useState(false);

  const handleMouseDownLeft = () => {
    setIsResizing(true);
    setIsResizingLeft(true);
  };

  const handleMouseDownRight = () => {
    setIsResizing(true);
    setIsResizingRight(true);
  };

  const scheduleList = React.useMemo(() => {
    let list: Array<number> = [];
    for (const iterator of schedule) {
      iterator.days.map((i) => list.push(i));
    }
    return list;
  }, [schedule]);

  React.useEffect(() => {
    const left = (start - 1) * cellWidth;
    const right = (end - disabledDays) * cellWidth;
    const curRight = right - maxWidth < 0 ? Math.abs(right - maxWidth) : right;
    setStyles({ left, right: curRight });
  }, [start, end]);

  React.useEffect(() => {
    const element = ref.current;
    const stylesCopy = { ...styles };
    const initLeft = element?.getBoundingClientRect().left || 0;
    const initRight = element?.getBoundingClientRect().right || 0;

    const handleMouseUp = () => {
      if (isResizingLeft) {
        const step = Math.floor(Number(styles?.left) / cellWidth) * cellWidth;
        setStyles({ ...styles, left: step });
      } else {
        const step = Math.floor(Number(styles?.right) / cellWidth) * cellWidth;
        setStyles({ ...styles, right: step });
      }

      setIsResizing(false);
      setIsResizingLeft(false);
      setIsResizingRight(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      if (isResizingLeft) {
        const isLast = initRight - e.clientX < 100;
        const curSize = e.clientX - initLeft + Number(stylesCopy.left);

        if (isLast) {
          return (stylesCopy.left = initLeft);
        } else if (curSize < 0) {
          return (stylesCopy.left = Number(stylesCopy.left));
        } else {
          stylesCopy.left = curSize;
        }
      }

      if (isResizingRight) {
        const max = disabledDays * cellWidth;
        const isLast = e.clientX - initLeft < 100;
        const curSize = initRight - e.clientX + Number(stylesCopy.right);

        if (isLast) {
          return (stylesCopy.right = initRight);
        } else if (curSize < 0 || curSize < max) {
          return (stylesCopy.right = Number(stylesCopy.right));
        } else {
          stylesCopy.right = curSize;
        }
      }
      setStyles({ ...stylesCopy });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [end, isResizing, isResizingLeft, isResizingRight, start, styles]);

  return (
    <div ref={ref} className="tool" style={styles}>
      <button className="tool-button" onMouseDown={handleMouseDownLeft}>
        ⟷
      </button>
      <div className="tool-content" {...rest}>
        {title}
      </div>
      <button className="tool-button" onMouseDown={handleMouseDownRight}>
        ⟷
      </button>
    </div>
  );
};
