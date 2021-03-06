import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";

import { setTeams, setTeamOrder } from "../../actions/eventActions";

export default function AddNewTeam() {
  const dispatch = useDispatch();
  const {
    team: { teams, teamOrder },
    phase
  } = useSelector(state => state.event);

  const handleAddNewTeam = () => {
    const newTeams = { ...teams };
    const newTeamOrder = [...teamOrder];
    const newTeamId = Object.keys(teams).length + 1;
    newTeams[`team-${newTeamId}`] = {
      id: `team-${newTeamId}`,
      teamName: `Team ${newTeamId}`,
      members: [],
      games: [],
      totalMMR: 0,
      score: {
        wins: 0,
        losses: 0,
        differential: 0
      }
    };
    newTeamOrder.push(`team-${newTeamId}`);
    dispatch(setTeams(newTeams));
    dispatch(setTeamOrder(newTeamOrder));
  };
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={handleAddNewTeam}
      disabled={phase !== "forming"}
    >
      Add Team
    </Button>
  );
}
