import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LoginSignUp from './LoginSignup';
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
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
      {/* Tabs */}
      <Box sx={{ width: '90%', maxWidth: 800, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
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
          <Tab
            label="Inventario"
            {...a11yProps(1)}
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'none',
            }}
          />
          <Tab
            label="Ubicaciones"
            {...a11yProps(2)}
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'none',
            }}
          />
        </Tabs>
      </Box>

      {/* Paneles */}
      <Box sx={{ width: '90%', maxWidth: 800 }}>
        <CustomTabPanel value={value} index={0}>
          <LoginSignUp />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Inventario />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Ubicaciones />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
