import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, AppBar, Toolbar} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import BusinessIcon from '@mui/icons-material/Business';
import InputAdornment from '@mui/material/InputAdornment';


const columns = [
  { id: 'sku', label: 'SKU', width: 80 },
  { id: 'producto', label: 'Producto', width: 120 },
  { id: 'institucion', label: 'Institución', width: 120 },
  { id: 'descripcion', label: 'Descripción', width: 200 },
  { id: 'stock_inicial', label: 'Stock inicial', width: 100 },
  { id: 'entrada', label: 'Entrada', width: 80 },
  { id: 'salida', label: 'Salida', width: 80 },
  { id: 'stock_total', label: 'Stock total', width: 100 },
];

export default function Inventario() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [skuFilter, setSkuFilter] = useState('');
  const [institucionFilter, setInstitucionFilter] = useState('');

  useEffect(() => {
    const mockData = [
      { sku: 'A001', producto: 'Sensor', institucion: 'TecNM', descripcion: 'Sensor digital', stock_inicial: 100, entrada: 20, salida: 5, stock_total: 5 },
      { sku: 'A002', producto: 'Motor DC', institucion: 'UNAM', descripcion: 'Motor 12V', stock_inicial: 50, entrada: 10, salida: 8, stock_total: 52 },
      { sku: 'A003', producto: 'ESP32', institucion: 'TecNM', descripcion: 'WiFi+BT', stock_inicial: 80, entrada: 25, salida: 15, stock_total: 90 },
      { sku: 'A004', producto: 'RFID', institucion: 'IPN', descripcion: 'Lector RC522', stock_inicial: 30, entrada: 15, salida: 3, stock_total: 42 },
      { sku: 'A005', producto: 'Raspberry', institucion: 'UNAM', descripcion: 'Pi 4', stock_inicial: 40, entrada: 10, salida: 7, stock_total: 43 },
      { sku: 'A006', producto: 'Batería', institucion: 'IPN', descripcion: 'LiPo 3.7V', stock_inicial: 60, entrada: 30, salida: 20, stock_total: 70 },
      { sku: 'A007', producto: 'Arduino', institucion: 'TecNM', descripcion: 'UNO R3', stock_inicial: 90, entrada: 10, salida: 15, stock_total: 85 },
      { sku: 'A008', producto: 'Cámara', institucion: 'UNAM', descripcion: 'para Pi', stock_inicial: 20, entrada: 5, salida: 2, stock_total: 19 },
      { sku: 'A009', producto: 'Bluetooth', institucion: 'IPN', descripcion: 'HC-05', stock_inicial: 70, entrada: 20, salida: 10, stock_total: 80 },
      { sku: 'A010', producto: 'Ultrasónico', institucion: 'TecNM', descripcion: 'HC-SR04', stock_inicial: 100, entrada: 50, salida: 90, stock_total: 60 },
    ];
    setRows(mockData);
    setFilteredRows(mockData);
  }, []);

  useEffect(() => {
    const filtered = rows.filter(row => {
      const skuMatch = row.sku.toLowerCase().includes(skuFilter.toLowerCase());
      const institucionMatch = row.institucion.toLowerCase().includes(institucionFilter.toLowerCase());
      return skuMatch && institucionMatch;
    });
    setFilteredRows(filtered);
    setPage(0);
  }, [skuFilter, institucionFilter, rows]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%', mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2, width: 'fit-content' }}>
        <Toolbar sx={{ gap: 2, justifyContent: 'center' }}>
          <TextField
            label="Filtrar por SKU"
            variant="outlined"
            size="small"
            value={skuFilter}
            onChange={(e) => setSkuFilter(e.target.value)}
            InputProps={{
              startAdornment: (
              <InputAdornment position="start">
                <CodeIcon />
                </InputAdornment>
                ),
              }}
          />
          <TextField
            label="Filtrar por Institución"
            variant="outlined"
            size="small"
            value={institucionFilter}
            onChange={(e) => setInstitucionFilter(e.target.value)}
            InputProps={{
              startAdornment: (
              <InputAdornment position="start">
                <BusinessIcon />
                </InputAdornment>
                ),
              }}
          />
        </Toolbar>
      </AppBar>

      <Paper sx={{ width: '95%', overflowX: 'auto', boxShadow: 2 }}>
        <TableContainer>
          <Table stickyHeader sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} sx={{ fontWeight: 'bold' }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow hover key={idx}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        sx={
                          column.id === 'stock_total' && row.stock_total <= 20
                            ? { backgroundColor: '#ffe5e5', color: 'red', fontWeight: 'bold' }
                            : {}
                        }
                      >
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
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}