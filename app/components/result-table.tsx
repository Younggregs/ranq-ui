import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '../lib/mui';
import bgColor from '../lib/random-color';

function createData(
  contestants: string,
  position: number,
  points: number,
) {
  return { contestants, position, points, };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
];

export default function ResultTable({data}: {data: any}) {
    console.log('data 3', data)
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Contestant</b></TableCell>
            <TableCell><b>Points</b></TableCell>
            <TableCell><b>Position</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <TableRow
              key={row.contestants}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Grid
                container
                direction="row"
                alignItems="center"
              >
                <Grid 
                  style={{ 
                        marginRight: '5px',
                        height: '10px', 
                        width: '10px',
                        borderRadius: '50%',
                        backgroundColor: bgColor(),
                      }} 
                />{row.name.toUpperCase()}
              </Grid>
              </TableCell>
              <TableCell>
                {row.vote_count}
              </TableCell>
              <TableCell>{row.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}