import React from "react";
import {
  makeStyles,
  Paper,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from "@material-ui/core";
import DefaultContainer from "../DefaultContainer";
import { useSelector } from "react-redux";
import Score from "../Score";
import Notes from "../Notes";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    width: "100%"
  },
  table: {
    minWidth: 500
  },
  headerRow: {
    backgroundColor: theme.palette.primary[600]
  },
  headerText: {
    color: "white"
  }
}));

export default function RoundRobin() {
  const classes = useStyles();
  const {
    games,
    bracket: { roundRobin },
    isAdmin,
    team: { teams }
  } = useSelector(state => state.event);

  return (
    <DefaultContainer header="Round Robin Bracket">
      <Grid container spacing={4}>
        {roundRobin.map((round, roundIndex) => (
          <Grid item xs={12} lg={6} key={roundIndex}>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                {/* Table Header */}
                <TableHead>
                  <TableRow className={classes.headerRow}>
                    <TableCell align="center" colSpan={7}>
                      <Typography className={classes.headerText}>
                        Round {roundIndex + 1}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Blue</TableCell>
                    <TableCell align="center" padding="none" />
                    <TableCell align="center">Orange</TableCell>
                    <TableCell>Notes</TableCell>
                    <TableCell colSpan={3} align="center">
                      Score
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* Table Contents */}
                <TableBody>
                  {round.map((gameId, gameIndex) => (
                    <TableRow key={"game" + gameIndex}>
                      <TableCell align="center">
                        {teams[games[gameId].blue.id].teamName}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        -
                      </TableCell>
                      <TableCell align="center">
                        {teams[games[gameId].orange.id].teamName}
                      </TableCell>
                      <Notes
                        gameId={gameId}
                        notes={games[gameId].notes}
                        disabled={
                          !isAdmin ||
                          games[gameId].blue.id === "bye" ||
                          games[gameId].orange.id === "bye"
                        }
                      />
                      <Score
                        gameId={gameId}
                        score={games[gameId].score.overall.blue}
                        side="blue"
                        disabled={
                          !isAdmin ||
                          games[gameId].blue.id === "bye" ||
                          games[gameId].orange.id === "bye"
                        }
                      />
                      <TableCell align="center" padding="none">
                        :
                      </TableCell>
                      <Score
                        gameId={gameId}
                        score={games[gameId].score.overall.orange}
                        side="orange"
                        disabled={
                          !isAdmin ||
                          games[gameId].blue.id === "bye" ||
                          games[gameId].orange.id === "bye"
                        }
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ))}
      </Grid>
    </DefaultContainer>
  );
}
