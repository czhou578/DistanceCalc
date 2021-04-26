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
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'population', label: 'Population', minWidth: 100 }

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