import { Component } from "react";
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

const columns = [
  { id: 'Current City', label: 'Current City', minWidth: 170 },
  { id: 'Destination City', label: 'Destination City', minWidth: 100 },
  { id: 'Distance', label: 'Distance(miles)', minWidth: 100 },
  { id: 'Travel Time', label: 'Travel Time(mins)', minWidth: 100 },
]

function createData(city1, city2, distance, time) {
  return {city1, city2, distance, time}
}

const dummyData = [
  createData('Mobile, AL', 'Montgomery, AL', 600, 2.5)
]

export default class Log extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="log-table-wrapper">
        <Paper className='paper'>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((columns) => (
                    <TableCell>
                      {columns.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>

                <TableRow>
                  <TableCell>

                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    )
  }
}