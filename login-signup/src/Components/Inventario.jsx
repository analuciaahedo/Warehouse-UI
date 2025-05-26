import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'sku', label: 'SKU' },
  { id: 'categoria', label: 'Categoría' },
  { id: 'estado', label: 'Estado' },
  { id: 'id', label: 'ID' },
  { id: 'ubicacion', label: 'Ubicación' },
  { id: 'institucion', label: 'Institución' },
];

export default function Inventario() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://192.168.1.20:3000/pkg/get_all')
        .then(res => {
          setRows(res.data);
        })
        .catch(err => {
          console.error('Error al obtener datos:', err);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%', margin: 0, padding: 0 }}>
      <Paper sx={{ width: '100%', overflow: 'auto', boxShadow: 1 }}>
        <TableContainer>
          <Table stickyHeader aria-label="Tabla de inventario" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{ fontWeight: 'bold', textAlign: 'left' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow hover key={idx}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        {row[column.id] ?? '-'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
