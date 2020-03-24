import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import { DialogContext } from "../../contexts/DialogContext";
import { SocketContext } from "../../contexts/SocketContext";

const useStyles = makeStyles(theme => ({
  inputs: {
    width: "100%",
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      flex: 1
    }
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Host() {
  const classes = useStyles();
  const { open, setOpen } = useContext(DialogContext);
  const { setUsernameLive, setRoomNameLive } = useContext(SocketContext);
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleRoomNameChange = event => {
    setRoomName(event.target.value);
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handleMakeRoom = () => {
    setRoomName("");
    setUsername("");
    fetch(`/create/${roomName}`)
      .then(response => {
        if (response.status === 200) {
          setUsernameLive(username);
          setRoomNameLive(roomName);
          // joinChatroom(roomName, username);
          console.log(`Joined room ${roomName} successfully!`);
        }
      })
      .catch(err => console.error(err));
    setOpen(false);
  };

  return (
    <Dialog
      open={open === "host"}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="team-error-dialog"
      aria-describedby="team-error-dialog-description"
    >
      <DialogTitle id="team-error-dialog">{"Start a live session"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="team-error-dialog-description">
          Please input the name of the live session below. You will need to give
          this name to other players who wish to view the live session.
        </DialogContentText>
        <div className={classes.inputs}>
          <TextField
            id="host-room-name"
            label="Room name"
            onChange={handleRoomNameChange}
            value={roomName}
            required
          />
          <TextField
            id="host-username"
            label="Username"
            onChange={handleUsernameChange}
            value={username}
            required
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleMakeRoom} color="primary">
          I got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
