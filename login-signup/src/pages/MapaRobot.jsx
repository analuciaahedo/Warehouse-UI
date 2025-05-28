// src/Components/MapaRobot.jsx
import React, { useState } from 'react';
import MapCard from '../Components/MapCard.jsx';
import PackagesNavBar from '../Components/PackagesNavBar.jsx';
import DetailsPanel from '../Components/DetailsPanel.jsx';
import '../Components/Styles/MapaRobot.css';
import { useEmployeeSocket } from '../hooks/positionSocket.jsx';
import '../Components/Styles/Card.css'
import '../Components/Styles/DetailsPanel.css'
import '../Components/Styles/MapCard.css'
import '../Components/Styles/PackagesNavBar.css'

const MapaRobot = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const position = useEmployeeSocket();

  // Datos ficticios por ahora
  const paquetes = [
    { id: 1, type: 'package', nombre: 'Paquete A', status: 'activo', ubicacion: 'Rack 1' },
    { id: 2, type: 'package', nombre: 'Paquete B', status: 'desactivado', ubicacion: 'Rack 2' },
    { id: 3, type: 'package', nombre: 'Paquete C', status: 'activo', ubicacion: 'Rack 3' },
    { id: 4, type: 'package', nombre: 'Paquete D', status: 'activo', ubicacion: 'Rack 3' },
  ];

  const robots = [
    { id: 1, type: 'robot', nombre: 'Robot 1', status: 'activo', ubicacion: 'Primer piso' },
  ];

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleClosePanel = () => {
    setSelectedItem(null);
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <PackagesNavBar paquetes={paquetes} robots={robots} onSelectItem={handleSelectItem} />
      
      <div style={{ flex: 1, padding: '20px' }}>
        <MapCard position={position} />
      </div>
      
      <DetailsPanel item={selectedItem} onClose={handleClosePanel} />
    </div>
  );
};

export default MapaRobot;
