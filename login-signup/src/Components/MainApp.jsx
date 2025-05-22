import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Inventario from './LoginSignUp/Inventario';
import Ubicaciones from './LoginSignUp/Ubicaciones';
import GestionOperadores from './LoginSignUp/GestionOperadores';

const MainApp = ({ rol }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [];
  const tabContent = [];

  // Todas las pestañas tienen Inventario
  tabs.push(<Tab key="inventario" label="Inventario" />);
  tabContent.push(<Inventario key="content-inventario" />);

  if (rol === "Operador" || rol === "Administrador") {
    tabs.push(<Tab key="ubicaciones" label="Ubicaciones" />);
    tabContent.push(<Ubicaciones key="content-ubicaciones" />);
  }

  if (rol === "Administrador") {
    tabs.push(<Tab key="usuarios" label="Gestión de Operadores" />);
    tabContent.push(<GestionOperadores key="content-usuarios" />);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="tabs" centered>
        {tabs}
      </Tabs>
      <Box sx={{ padding: 2 }}>
        {tabContent[value]}
      </Box>
    </Box>
  );
};

export default MainApp;
