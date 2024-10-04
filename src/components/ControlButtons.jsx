import SettingsIcon from "@mui/icons-material/Settings";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function ControlButtons({ mode }) {
  return (
    <div className="control-panel">
      <button className="control-panel__btn" type="button">
        <EditIcon />
      </button>
      <button className="control-panel__btn" type="button">
        <RestartAltIcon />
      </button>
      <button className="control-panel__btn" type="button">
        {/* {mode.includes("active") && <PauseIcon />}
        {mode.includes("paused") && <PlayArrowIcon />} */}
      </button>
      <button className="control-panel__btn" type="button">
        <SettingsIcon />
      </button>
    </div>
  );
}

export default ControlButtons;
