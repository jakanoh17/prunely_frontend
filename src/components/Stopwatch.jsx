import { useState, useEffect } from "react";

function Stopwatch() {
  // const { time, setTime } = useState(0);
  const { isActive, setIsActive } = useState(true);
  const { intervalId, setIntervalId } = useState({});
  const { displayTime, setDisplayTime } = useState({
    hours: "00",
    mins: "00",
    secs: 0,
  });

  function startStopwatch() {
    const stopwatchInterval = setInterval(() => {
      setDisplayTime(({ secs }) => (secs = secs + 1));
      console.log(displayTime.secs);
    }, 1000);
    setIntervalId(stopwatchInterval);
  }

  useEffect(() => {
    if (isActive) {
      console.log("start");
      startStopwatch();
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);
  // check to see if you need a time dependency

  // useEffect(() => {
  //   // if(time%360000)
  // }, [isActive, time]);

  return (
    <div className="stopwatch">
      <p className="stopwatch__time">HOUR MIN SEC</p>
    </div>
  );
}

export default Stopwatch;
