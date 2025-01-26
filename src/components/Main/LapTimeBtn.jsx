import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function LapTimeBtn({
  initialTimeInSecs,
  totalSecs,
  elapsedTimesObjs,
  setElapsedTimesObjs,
  isRunning,
  classNameModifier,
}) {
  const location = useLocation();
  let idCounter = 0;

  const returnElapsedTime = useCallback(() => {
    const newElapsedTime =
      location.pathname === "/" ? initialTimeInSecs - totalSecs : totalSecs;
    if (elapsedTimesObjs.length > 0) {
      setElapsedTimesObjs([
        {
          id: Date.now() - idCounter++,
          labels: [],
          elapsedTime: newElapsedTime,
        },
        ...elapsedTimesObjs,
      ]);
    } else
      setElapsedTimesObjs([
        {
          id: Date.now() - idCounter++,
          labels: [],
          elapsedTime: newElapsedTime,
        },
      ]);
  }, [elapsedTimesObjs, setElapsedTimesObjs, initialTimeInSecs, totalSecs]);

  function returnElapsedTimeOnSpacebar(e) {
    if (e.key === "l" && isRunning) {
      returnElapsedTime();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", returnElapsedTimeOnSpacebar);

    return () => {
      document.removeEventListener("keydown", returnElapsedTimeOnSpacebar);
    };
  }, []);

  return (
    <button
      className={`lap-btn${
        isRunning ? " lap-btn_active" : ""
      } lap-btn_type_${classNameModifier}`}
      type="button"
      onClick={returnElapsedTime}
      disabled={!isRunning}
    >
      Track Interval
    </button>
  );
}
