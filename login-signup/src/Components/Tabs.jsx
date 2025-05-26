import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LoginSignUp from './LoginSignUp/LoginSignup';
import Inventario from './Inventario';
import Ubicaciones from './Ubicaciones';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ isLoggedIn }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    // Si está logueado y el tab "Ingresar" desapareció, evitar selección inválida
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
      }}
    >
      <Box sx={{ width: '90%', maxWidth: 800, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          {!isLoggedIn && (
            <Tab
              label="Ingresar"
              {...a11yProps(0)}
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
              }}
            />
          )}
          <Tab
            label="Inventario"
            {...a11yProps(isLoggedIn ? 0 : 1)}
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'none',
            }}
          />
          <Tab
            label="Ubicaciones"
            {...a11yProps(isLoggedIn ? 1 : 2)}
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'none',
            }}
          />
        </Tabs>
      </Box>

      <Box sx={{ width: '90%', maxWidth: 800 }}>
        {!isLoggedIn && (
          <CustomTabPanel value={value} index={0}>
            <LoginSignUp onLoginSuccess={() => {}} />
          </CustomTabPanel>
        )}
        <CustomTabPanel value={value} index={isLoggedIn ? 0 : 1}>
          <Inventario />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={isLoggedIn ? 1 : 2}>
          <Ubicaciones />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
