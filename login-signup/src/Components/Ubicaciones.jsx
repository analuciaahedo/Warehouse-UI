import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function createData(id_robot, status, action, location) {
  return { id_robot, status, action, location };
}

const rows = [
  createData(1, 'Active', 'Moving', 'Zone A'),
  createData(2, 'Idle', 'Stopped', 'Zone B'),
  createData(3, 'Charging', 'Docked', 'Zone C'),
  createData(4, 'Active', 'Scanning', 'Zone D'),
  createData(5, 'Idle', 'Waiting', 'Zone E'),
];

export default function RobotsTable() {
  return (
    <Box sx={{ pl: 40 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="robots status table">
          <caption>Real-time robot tracking</caption>
          <TableHead>
            <TableRow>
              <TableCell>ID Robot</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id_robot}>
                <TableCell component="th" scope="row">
                  {row.id_robot}
                </TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.action}</TableCell>
                <TableCell>{row.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
