import React, { Component } from 'react';
import '../components/GeoInputBox'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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
  let passedStates = props.citiesInfo
  console.log(passedStates)

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        First City Longitude:
        First City Latitude:
        Second City Longitude:
        Second City Latitude:

      </CardContent>
  </Card>
  )

}