import React from 'react';
import MapCard from '../Components/MapCard.jsx';
import { useEmployeeSocket } from '../hooks/positionSocket.jsx';

const Dashboard = () => {
  const position = useEmployeeSocket();

  return (
    <div>
      <MapCard position={position} />
    </div>
  );
};

export default Dashboard;