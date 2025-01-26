import SettingsIcon from "@mui/icons-material/Settings";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ClearIcon from "@mui/icons-material/Clear";
import HoverLabel from "../../HoverLabel";
import DropdownMenu from "./DropdownMenu";

function ControlButtons({
  handleReset,
  handlePlayClick,
  handlePauseClick,
  isRunning,
  setElapsedTimesObjs,
}) {
  function handlePlayPauseClick() {
    if (isRunning) {
      handlePauseClick();
    } else {
      handlePlayClick();
    }
  }

  return (
    <div className="control-panel">
      <button
        className="control-panel__btn"
        type="button"
        onClick={() => {
          setElapsedTimesObjs([]);
        }}
      >
        <HoverLabel label="CLEAR LAPS W/O RESTARTING TIME">
          <ClearIcon />
        </HoverLabel>
      </button>
      <button
        className="control-panel__btn"
        type="button"
        onClick={handleReset}
      >
        <HoverLabel label="RESTART">
          <RestartAltIcon />
        </HoverLabel>
      </button>
      <button
        className="control-panel__btn"
        type="button"
        onClick={handlePlayPauseClick}
      >
        {isRunning && (
          <HoverLabel label="PAUSE">
            <PauseIcon />
          </HoverLabel>
        )}
        {!isRunning && (
          <HoverLabel label="PLAY">
            <PlayArrowIcon />
          </HoverLabel>
        )}
      </button>
      <div className="control-panel__btn">
        <HoverLabel label="SETTINGS">
          <DropdownMenu
            menuOrigin={<SettingsIcon />}
            setElapsedTimesObjs={setElapsedTimesObjs}
          />
        </HoverLabel>
      </div>
    </div>
  );
}

export default ControlButtons;
