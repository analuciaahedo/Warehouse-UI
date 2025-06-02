import * as React from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../Components/Context/UserContext.jsx';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LoginSignUp from './LoginSignUp/LoginSignup';
import Inventario from './Inventario';
import MapaRobot from '../pages/MapaRobot'; 
import RegistrarOperadores from './RegistrarOperadores/RegistrarOperadores.jsx';

function CustomTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs() {
  const { user } = useUser();
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => setValue(newValue);

  // Construimos las pestañas según el rol EXACTO que viene del backend:
  const tabs = [];

  if (!user) {
    // Si no hay usuario logueado, solo mostramos la pestaña de login
    tabs.push({ label: 'Ingresar', component: <LoginSignUp /> });
  } else {
    // Si el usuario es Administrador, agregamos la pestaña "Registrar Operadores"
    if (user.rol === 'Administrador') {
      tabs.push({
        label: 'Registrar Operadores',
        component: <RegistrarOperadores />,
      });
    }
    // Tanto Administrador como Operador verán estas dos pestañas:
    tabs.push({ label: 'Inventario', component: <Inventario /> });
    tabs.push({ label: 'Mapa Robot', component: <MapaRobot /> });
  }

  return (
    <Box
      sx={{
        width: '100%',
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '90%', maxWidth: 1000, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          {tabs.map((tab, idx) => (
            <Tab
              key={idx}
              label={tab.label}
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
              }}
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ width: '100%' }}>
        {tabs.map((tab, idx) => (
          <CustomTabPanel key={idx} value={value} index={idx}>
            {tab.component}
          </CustomTabPanel>
        ))}
      </Box>
    </Box>
  );
}