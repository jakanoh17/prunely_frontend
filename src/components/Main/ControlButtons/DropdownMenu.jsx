import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import StopwatchTwoToneIcon from "@mui/icons-material/TimerTwoTone";
import TimerTwoToneIcon from "@mui/icons-material/AccessAlarmTwoTone";

import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, Fragment } from "react";

import { ModeContext } from "../../../utils/contexts/ModeContext";

export default function Dropdown({ menuOrigin, setElapsedTimesObjs }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { mode, setMode } = useContext(ModeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function toggleMode() {
    if (mode === "timer") {
      setMode("stopwatch");
      navigate("/stopwatch");
    } else if (mode === "stopwatch") {
      setMode("timer");
      navigate("/");
    }
    setElapsedTimesObjs([]);
    handleClose();
  }

  return (
    <Fragment>
      <Tooltip>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "settings-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {menuOrigin}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="settings-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                bottom: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        {location.pathname === "/" && (
          <MenuItem onClick={toggleMode}>
            <ListItemIcon>
              <StopwatchTwoToneIcon />
            </ListItemIcon>
            Switch to stopwatch
          </MenuItem>
        )}
        {location.pathname === "/stopwatch" && (
          <MenuItem onClick={toggleMode}>
            <ListItemIcon>
              <TimerTwoToneIcon />
            </ListItemIcon>
            Switch to timer
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  );
}
