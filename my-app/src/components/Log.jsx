import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import './Log.css'
import './InitialCityBox'

const columns = [
  { id: 'currentCity', label: 'Current City', minWidth: 150 },
  { id: 'destinationCity', label: 'Destination City', minWidth: 140 },
  {
    id: 'distance',
    label: 'Distance(mi)',
    minWidth: 140,
    align: 'right',
  },
  {
    id: 'travelTime',
    label: 'Travel Time(min)',
    minWidth: 140,
    align: 'right',
  }
];

function createData(currentCity, destinationCity, distance, travelTime) {
  return { currentCity, destinationCity, distance, travelTime };
}

const rows = [
  createData('India', 'Indianapolis', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  // createData('Italy', 'IT', 60483973, 301340),
  // createData('United States', 'US', 327167434, 9833520),
  // createData('Canada', 'CA', 37602103, 9984670),
  // createData('Australia', 'AU', 25475400, 7692024),
  // createData('Germany', 'DE', 83019200, 357578),
  // createData('Ireland', 'IE', 4857000, 70273),
  // createData('Mexico', 'MX', 126577691, 1972550),
  // createData('Japan', 'JP', 126317000, 377973),
  // createData('France', 'FR', 67022000, 640679),
  // createData('United Kingdom', 'GB', 67545757, 242495),
  // createData('Russia', 'RU', 146793744, 17098246),
  // createData('Nigeria', 'NG', 200962417, 923768),
  // createData('Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 340,
  },

  cell: {
    fontSize: '10px',
    padding: '12px',
    textAlign: 'center'
  }
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  let startCityString = ''
  let endCityString = ''
  let startCity = props.logInfo[0]
  let startCityAbrev = props.logInfo[1]
  let endCity = props.logInfo[2]
  let endCityAbrev = props.logInfo[3]
  let finalDistance = props.logInfo[4]
  // console.log(finalDistance)
  let travelTime = props.logInfo[5]()
  let didDataDelete = props.logInfo[6] //if diddelete is true, don't render, but if its false, render
  // console.log(travelTime)

  startCityString += startCity + ',' + ' '
  startCityString += startCityAbrev
  startCityString = startCityString.charAt(0).toUpperCase() + startCityString.slice(1)

  endCityString += endCity + ',' + ' '
  endCityString += endCityAbrev
  endCityString = endCityString.charAt(0).toUpperCase() + endCityString.slice(1)

  if (finalDistance === undefined || travelTime === undefined || didDataDelete) {
    console.log('true')
    
  } else if (!didDataDelete) {
    rows.push(createData(startCityString, endCityString, finalDistance, travelTime))
    // console.log('accurate')
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} className={classes.cell}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
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

