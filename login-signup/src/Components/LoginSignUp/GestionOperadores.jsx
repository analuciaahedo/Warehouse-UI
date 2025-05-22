// src/Components/GestionOperadores.jsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';

const GestionOperadores = () => {
  const [operadores, setOperadores] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.1.20:3000/user/login')
      .then(res => setOperadores(res.data))
      .catch(err => console.error(err));
  }, []);

  const darDeAlta = (id) => {
    axios.post(`http://192.168.1.20:3000/user/register${id}`)
      .then(() => setOperadores(prev => prev.map(op => op.id === id ? { ...op, activo: true } : op)));
  };

  return (
    <Grid container spacing={2} padding={3}>
      {operadores.map(op => (
        <Grid item xs={12} sm={6} md={4} key={op.id}>
          <Card sx={{ border: '2px solid black' }}>
            <CardContent>
              <Typography><b>Nombre completo:</b> {op.nombre}</Typography>
              <Typography><b>Correo:</b> {op.correo}</Typography>
              <Typography><b>Teléfono:</b> {op.telefono}</Typography>
              <Typography><b>Rol:</b> {op.rol}</Typography>
              <Typography><b>Puesto:</b> {op.puesto}</Typography>
              <Typography><b>Institución:</b> {op.institucion}</Typography>
              <Typography><b>Fecha de alta:</b> {op.fecha_alta}</Typography>
              <Typography><b>Nómina:</b> {op.nomina}</Typography>
              {!op.activo && (
                <Button onClick={() => darDeAlta(op.id)} variant="outlined" fullWidth sx={{ mt: 2 }}>
                  Dar de alta operador
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GestionOperadores;
