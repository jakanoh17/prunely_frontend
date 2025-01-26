import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import ControlButtons from "./ControlButtons/ControlButtons";
import LapTimeBtn from "./LapTimeBtn";

function Timer({ setElapsedTimesObjs, elapsedTimesObjs }) {
  const [inputHrs, setInputHrs] = useState("");
  const [inputMins, setInputMins] = useState("");
  const [inputSecs, setInputSecs] = useState("");
  const [initialTimeInSecs, setInitialTimeInSecs] = useState(0);

  const expiryTimestamp = new Date();

  expiryTimestamp.setSeconds(
    expiryTimestamp.getSeconds() + initialTimeInSecs || 0
  );

  const {
    seconds,
    minutes,
    hours,
    totalSeconds,
    isRunning,
    resume,
    pause,
    restart,
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => alert("Time's up!"),
  });

  useEffect(() => {
    setInitialTimeInSecs(+inputHrs * 3600 + +inputMins * 60 + +inputSecs);
  }, [inputHrs, inputMins, inputSecs]);

  const handleSetTime = (e) => {
    e.preventDefault();
    if (!isNaN(initialTimeInSecs) && initialTimeInSecs > 0) {
      restart(expiryTimestamp, true);
      setElapsedTimesObjs([]);
    } else {
      alert("Please enter a valid number.");
    }
  };

  const handleReset = () => {
    restart(expiryTimestamp, false);
    setElapsedTimesObjs([]);
  };

  return (
    <>
      <div className="main__header">
        <h1 className="main__title">COUNTUP TIMER</h1>
      </div>
      <div className="main__time-tracker">
        <div className="timer">
          <form className="timer__form" onSubmit={handleSetTime}>
            <p className="timer__text-label">Enter time:</p>
            <input
              type="number"
              value={inputHrs}
              onChange={(e) => setInputHrs(e.target.value)}
              min="0"
              placeholder="Enter Hours"
              className="timer__input"
            />
            <span className="timer__span"> : </span>
            <input
              type="number"
              value={inputMins}
              onChange={(e) => setInputMins(e.target.value)}
              min="0"
              placeholder="Enter Mins"
              className="timer__input"
            />
            <span className="timer__span"> : </span>
            <input
              type="number"
              value={inputSecs}
              onChange={(e) => setInputSecs(e.target.value)}
              min="0"
              placeholder="Enter Secs"
              className="timer__input"
            />
            <button className="timer__subtmit-btn" type="submit">
              Set Timer
            </button>
          </form>
          <div className="main__time-container">
            {/* <ResizableText className="main__time" text={hours}></ResizableText> */}
            <p className="main__time">
              {hours}
              <span className="main__time-label">Hours</span>
              {/* <ResizableText
          className="main__time"
          text={minutes.toString().padStart(2, "0")}
        ></ResizableText> */}
              {minutes.toString().padStart(2, "0")}
              <span className="main__time-label">Mins</span>
              {/* <ResizableText
          className="main__time"
          text={seconds.toString().padStart(2, "0")}
        ></ResizableText> */}
              {seconds.toString().padStart(2, "0")}
              <span className="main__time-label">Secs</span>
            </p>
          </div>
          <LapTimeBtn
            initialTimeInSecs={initialTimeInSecs}
            totalSecs={totalSeconds}
            elapsedTimesObjs={elapsedTimesObjs}
            setElapsedTimesObjs={setElapsedTimesObjs}
            isRunning={isRunning}
            classNameModifier="timer"
          />
          <ControlButtons
            handleReset={handleReset}
            handlePlayClick={resume}
            handlePauseClick={pause}
            isRunning={isRunning}
            setElapsedTimesObjs={setElapsedTimesObjs}
          />
        </div>
      </div>
    </>
  );
}

export default Timer;
