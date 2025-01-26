import { useState, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import ControlButtons from "./ControlButtons/ControlButtons";
import LapTimeBtn from "./LapTimeBtn";

function Stopwatch({ setElapsedTimesObjs, elapsedTimesObjs }) {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  const handleReset = () => {
    reset();
    setElapsedTimesObjs([]);
  };

  return (
    <>
      <div className="main__header">
        <h1 className="main__title">COUNTUP STOPWATCH</h1>
      </div>
      <div className="main__time-tracker">
        <div className="stopwatch">
          <div className="main__time-container">
            <p className="main__time">
              {hours}
              <span className="main__time-label">Hours</span>
              {minutes.toString().padStart(2, "0")}
              <span className="main__time-label">Mins</span>
              {seconds.toString().padStart(2, "0")}
              <span className="main__time-label">Secs</span>
            </p>
          </div>
          <LapTimeBtn
            totalSecs={totalSeconds}
            elapsedTimesObjs={elapsedTimesObjs}
            setElapsedTimesObjs={setElapsedTimesObjs}
            isRunning={isRunning}
            classNameModifier="stopwatch"
          />
          <ControlButtons
            handleReset={handleReset}
            handlePlayClick={start}
            handlePauseClick={pause}
            isRunning={isRunning}
            setElapsedTimesObjs={setElapsedTimesObjs}
          />
        </div>
      </div>
    </>
  );
}

export default Stopwatch;
