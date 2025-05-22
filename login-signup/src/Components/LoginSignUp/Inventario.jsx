import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'sku', label: 'SKU', minWidth: 100 },
  { id: 'categoria', label: 'Categoría', minWidth: 120 },
  { id: 'estado', label: 'Estado', minWidth: 100 },
  { id: 'id', label: 'ID', minWidth: 80 },
  { id: 'ubicacion', label: 'Ubicación', minWidth: 120 },
  { id: 'institucion', label: 'Institución', minWidth: 150 },
];

export default function Inventario() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Llamada a la API
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

  fetchData(); // llamada inicial
  const interval = setInterval(fetchData, 5000); // actualiza cada 5 segundos

  return () => clearInterval(interval); // limpia intervalo si se desmonta el componente
}, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="Tabla de inventario">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
              <TableRow hover tabIndex={-1} key={idx}>
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
  );
}
