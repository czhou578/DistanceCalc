import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import "./InitialCityBox";
import "./Log.css";

const columns = [
  { id: "currentCity", label: "Current City", minWidth: 150 },
  { id: "destinationCity", label: "Destination City", minWidth: 140 },
  {
    id: "distance",
    label: "Distance(mi)",
    minWidth: 140,
    align: "right",
  },
  {
    id: "travelTime",
    label: "Travel Time(min)",
    minWidth: 140,
    align: "right",
  },
];

function createData(currentCity, destinationCity, distance, travelTime) {
  return { currentCity, destinationCity, distance, travelTime };
}

const rows = [];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    minHeight: 340,
  },

  cell: {
    fontSize: "10px",
    padding: "12px",
    textAlign: "center",
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  let startCityString = "";
  let endCityString = "";
  let startCity = props.logInfo[0];
  let startCityAbrev = props.logInfo[1];
  let endCity = props.logInfo[2];
  let endCityAbrev = props.logInfo[3];
  let finalDistance = props.logInfo[4];
  let travelTime = props.logInfo[5]();
  let didDataDelete = props.logInfo[6]; //if did delete is true, don't render, but if its false, render

  startCityString += startCity + "," + " ";
  startCityString += startCityAbrev;
  startCityString =
    startCityString.charAt(0).toUpperCase() + startCityString.slice(1);

  endCityString += endCity + "," + " ";
  endCityString += endCityAbrev;
  endCityString =
    endCityString.charAt(0).toUpperCase() + endCityString.slice(1);

  if (
    finalDistance === undefined ||
    travelTime === undefined ||
    didDataDelete
  ) {
  } else if (!didDataDelete && finalDistance != null && travelTime != null) {
    // console.log('true')
    rows.push(
      createData(startCityString, endCityString, finalDistance, travelTime)
    );
    console.log("rows: " + JSON.stringify(rows));
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={classes.cell}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={classes.cell}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
