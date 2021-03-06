import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, MenuItem } from "@material-ui/core";

import { DialogContext } from "../../contexts";
import {
  setPlayers,
  setPlayerOrder,
  setTeams
} from "../../actions/eventActions";

const initialState = {
  mouseX: null,
  mouseY: null
};

export default function PlayerContextMenu() {
  const dispatch = useDispatch();
  const { players, playerOrder } = useSelector(state => state.event.player);
  const teams = useSelector(state => state.event.team.teams);
  const { isAdmin } = useSelector(state => state.event);
  const {
    setOpen,
    openPlayerContextMenu,
    setOpenPlayerContextMenu,
    currentPlayerInfo
  } = useContext(DialogContext);

  const handleClose = () => {
    setOpenPlayerContextMenu(initialState);
  };

  const handleOpenPlayerInfo = () => {
    handleClose();
    setOpen("player-info");
  };

  const handleDelete = () => {
    const id = currentPlayerInfo.id;
    const newPlayers = { ...players };
    let newPlayerOrder = [...playerOrder];
    const newTeams = { ...teams };

    delete newPlayers[id];
    for (let i = 1; i < Object.keys(newTeams).length + 1; i++) {
      if (newTeams[`team-${i}`].members.includes(id)) {
        newTeams[`team-${i}`].members = newTeams[`team-${i}`].members.filter(
          member => member !== id
        );
      }
    }
    if (newPlayerOrder.includes(id)) {
      newPlayerOrder = newPlayerOrder.filter(player => player !== id);
    }
    dispatch(setPlayers(newPlayers));
    dispatch(setPlayerOrder(newPlayerOrder));
    dispatch(setTeams(newTeams));
    handleClose();
  };

  return (
    <div>
      <Menu
        keepMounted
        id="player-context-menu"
        open={openPlayerContextMenu.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          openPlayerContextMenu.mouseY !== null &&
          openPlayerContextMenu.mouseX !== null
            ? {
                top: openPlayerContextMenu.mouseY,
                left: openPlayerContextMenu.mouseX
              }
            : undefined
        }
      >
        <MenuItem onClick={handleOpenPlayerInfo}>Info</MenuItem>
        {isAdmin && (
          <MenuItem color="secondary" onClick={handleDelete}>
            Delete
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
