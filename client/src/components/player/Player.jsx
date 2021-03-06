import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Box,
  Grid,
  Typography,
  TextField
} from "@material-ui/core";
import SecurityIcon from "@material-ui/icons/Security";

import { useToggle } from "../../hooks";
import { ThemeContext, DialogContext } from "../../contexts";
import {
  setPlayerOrder,
  setPlayers,
  setTeams
} from "../../actions/eventActions";

const useStyles = makeStyles({
  root: {
    flexShrink: 0,
    width: 225,
    maxHeight: 312,
    marginBottom: "15px"
  },
  playerTag: {
    height: 32,
    cursor: "pointer",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  rankTable: {
    paddingTop: 6
  },
  rank: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  textFieldTag: {
    // width: "133px",
    paddingBottom: "9px"
  }
});

export default function Player(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { player, id, index } = props;

  const { players, playerOrder } = useSelector(state => state.event.player);
  const gameMode = useSelector(state => state.event.meta.gameMode);
  const teams = useSelector(state => state.event.team.teams);
  const { isAdmin, phase } = useSelector(state => state.event);
  const { viewMode } = useContext(ThemeContext);
  const { setOpenPlayerContextMenu, setCurrentPlayerInfo } = useContext(
    DialogContext
  );
  const [isEditing, toggleIsEditing] = useToggle(false);
  const [playerTag, setPlayerTag] = useState(player.tag || player.id);

  // STEAM LINK BUTTON
  const handleOpenSteam = () => {
    if (player.steamProfile) {
      window.open(player.steamProfile);
    }
  };

  // TRACKER LINK BUTTON
  const handleOpenTracker = () => {
    if (player.trackerProfile) {
      window.open(player.trackerProfile);
    }
  };

  // DELETE PLAYER
  const handleDelete = () => {
    const newPlayers = { ...players };
    let newPlayerOrder = [...playerOrder];
    const newTeams = { ...teams };

    delete newPlayers[id];

    // check if player was part of a team, if so, remove from team
    for (let i = 1; i < Object.keys(newTeams).length + 1; i++) {
      if (newTeams[`team-${i}`].members.includes(id)) {
        newTeams[`team-${i}`].members = newTeams[`team-${i}`].members.filter(
          member => member !== id
        );
      }
    }

    // if player was not on a team, remove from player list
    if (newPlayerOrder.includes(id)) {
      newPlayerOrder = newPlayerOrder.filter(player => player !== id);
    }
    dispatch(setPlayers(newPlayers));
    dispatch(setPlayerOrder(newPlayerOrder));
    dispatch(setTeams(newTeams));
  };

  const handleSavePlayerTag = () => {
    handleToggleEdit();
    const newPlayers = { ...players };
    newPlayers[id].tag = playerTag;
    dispatch(setPlayers(newPlayers));
  };

  const handleToggleEdit = () => {
    if (isAdmin) {
      toggleIsEditing();
    }
  };

  const handleEditPlayerTag = event => {
    setPlayerTag(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.charCode === 13) {
      handleSavePlayerTag();
    }
  };

  const handleMouseUp = event => {
    if (event.button === 2) {
      setCurrentPlayerInfo(player);
      setOpenPlayerContextMenu({
        mouseX: event.clientX - 2,
        mouseY: event.clientY - 4
      });
    }
  };

  const renderPlayerName = () => {
    if (isEditing) {
      return (
        <TextField
          id="standard-basic"
          defaultValue={player.tag}
          onChange={handleEditPlayerTag}
          onBlur={handleSavePlayerTag}
          className={classes.textFieldTag}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      );
    }
    return (
      <Typography
        gutterBottom={viewMode !== "name"}
        variant="h5"
        className={classes.playerTag}
        onClick={handleToggleEdit}
      >
        {props.isCaptain ? <SecurityIcon fontSize="inherit" /> : ""}
        {player.tag}
      </Typography>
    );
  };

  const renderPlayer = () => {
    if (viewMode === "card") {
      return (
        <>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={player.icon}
            title="Contemplative Reptile"
          />
          <CardContent>
            {renderPlayerName()}
            <div className={classes.rankTable}>
              <Grid container justify="space-evenly" spacing={0}>
                <Grid item xs={4}>
                  <Typography component="div" variant="body1">
                    <Box textAlign="center" fontWeight="fontWeightBold">
                      Ones
                    </Box>
                    <Box textAlign="center">
                      {player.ranks.currentSeason.ones}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography component="div" variant="body1">
                    <Box textAlign="center" fontWeight="fontWeightBold">
                      Twos
                    </Box>
                    <Box textAlign="center">
                      {player.ranks.currentSeason.twos}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography component="div" variant="body1">
                    <Box textAlign="center" fontWeight="fontWeightBold">
                      Threes
                    </Box>
                    <Box textAlign="center">
                      {player.ranks.currentSeason.threes}
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={handleOpenSteam}>
              Steam
            </Button>
            <Button size="small" color="primary" onClick={handleOpenTracker}>
              Ranks
            </Button>
            {isAdmin && (
              <Button size="small" color="secondary" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </CardActions>
        </>
      );
    } else if (viewMode === "condensed") {
      return (
        <>
          <CardContent style={{ paddingBottom: 15 }}>
            {renderPlayerName()}
            <Typography variant="body2">
              RANK: {player.ranks.currentSeason[gameMode]}
            </Typography>
          </CardContent>
        </>
      );
    } else if (viewMode === "name") {
      return (
        <CardContent style={{ paddingBottom: 15 }}>
          {renderPlayerName()}
        </CardContent>
      );
    }
  };

  return (
    <Draggable
      draggableId={id}
      index={index}
      isDragDisabled={!isAdmin || phase !== "forming"}
    >
      {provided => (
        <Card
          className={classes.root}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          variant="outlined"
        >
          {renderPlayer()}
        </Card>
      )}
    </Draggable>
  );
}
