import React from "react";
import "../components/GeoInputBox";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    minHeight: 135,
    backgroundColor: "tan",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function LatLongDisplay(props) {
  const classes = useStyles();
  let passedStates = props.citiesInfo;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h6">
          First City Latitude: {passedStates[0]}
        </Typography>
        <br></br>

        <Typography variant="h6">
          First City Longitude: {passedStates[1]}
        </Typography>
        <br></br>

        <Typography variant="h6">
          Second City Latitude: {passedStates[2]}
        </Typography>
        <br></br>

        <Typography variant="h6">
          Second City Longitude: {passedStates[3]}
        </Typography>
        <br></br>
      </CardContent>
    </Card>
  );
}
