"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ArrowOutward, ContactPage } from '@mui/icons-material';
import Link from 'next/link';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  title: string,
  votes: number,
  status: string,
) {
  return { title, votes, status };
}

const rows = [
  createData('Frozen yoghurt', 159, "Ongoing",),
  createData('Ice cream sandwich', 237, "Ongoing"),
  createData('Eclair', 262, "Completed"),
  createData('Cupcake', 305, "Completed"),
  createData('Gingerbread', 356, "Completed"),
];

export default function HistoryTable({data}: {data: any}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Votes</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>{""}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <StyledTableRow key={row.title}>
              <StyledTableCell component="th" scope="row">
                {row?.title}
              </StyledTableCell>
              <StyledTableCell>{row?.votes}</StyledTableCell>
              <StyledTableCell>{row?.status}</StyledTableCell>
              <StyledTableCell>
                <Link href={`/poll?id=${row?.token}`}>
                    <ArrowOutward />
                </Link>  
               </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
