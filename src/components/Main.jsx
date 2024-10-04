import { useState } from "react";
import Stopwatch from "./Stopwatch";
import ControlButtons from "./ControlButtons";

function Main() {
  const { mode, setMode } = useState("pausedStopwatch");

  return (
    <main className="main">
      <div className="main__header">
        <h1 className="main__title">COUNTDOWN TIMER</h1>
        <button className="main__close-btn" type="button"></button>
      </div>
      <div className="main__time-tracker">
        <Stopwatch />
      </div>
      <div className="main__control-btns">
        <ControlButtons mode={mode} />
      </div>
    </main>
  );
}

export default Main;
