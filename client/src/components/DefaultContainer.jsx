import React from "react";
import { Container, makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    height: "calc(100vh - 48px)"
  },
  paper: {
    margin: theme.spacing(3, 0),
    padding: theme.spacing(3)

  },
  paperFullWidth: {
    // margin: theme.spacing(0, 0, 3, 0),
    padding: theme.spacing(3)
  },
  contentHeader: {
    marginBottom: theme.spacing(3)
  }
}));

export default function DefaultContainer({
  fullWidth,
  width,
  header,
  children
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {fullWidth ? (
        <Paper elevation={0} className={classes.paperFullWidth}>
          <Container maxWidth={width === "small" ? "sm" : "lg"}>
            {header && (
              <Typography variant="h4" className={classes.contentHeader}>
                {header}
              </Typography>
            )}
            {children}
          </Container>
        </Paper>
      ) : (
        <Container maxWidth={width === "small" ? "sm" : "lg"}>
          <Paper elevation={0} className={classes.paper}>
            {header && (
              <Typography variant="h4" className={classes.contentHeader}>
                {header}
              </Typography>
            )}
            {children}
          </Paper>
        </Container>
      )}
    </div>
  );
}
