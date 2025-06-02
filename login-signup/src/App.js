import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUser, UserProvider } from './Components/Context/UserContext.jsx';
import LoginSignUp from './Components/LoginSignUp/LoginSignup'
import BasicTabs from './Components/Tabs'

function ProtectedRoute({ children, roles }) {
  const { user } = useUser();
  if (!user) return <Navigate to="/" />;
  // Ajustamos la comparación a los valores exactos que regresa tu backend:
  if (roles && !roles.includes(user.rol)) {
    return <Navigate to="/inventario" />;
  }
  return children;
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Ruta pública: Login */}
          <Route path="/" element={<LoginSignUp />} />

          {/* Inventario: cualquier usuario logueado */}
          <Route
            path="/inventario"
            element={
              <ProtectedRoute>
                <BasicTabs />
              </ProtectedRoute>
            }
          />

          {/* Registrar Operadores: solo 'Administrador' */}
          <Route
            path="/registrar-operadores"
            element={
              <ProtectedRoute roles={['Administrador']}>
                <BasicTabs />
              </ProtectedRoute>
            }
          />

          {/* Mapa Robot: solo 'Administrador' */}
          <Route
            path="/maparobot"
            element={
              <ProtectedRoute roles={['Administrador']}>
                <BasicTabs />
              </ProtectedRoute>
            }
          />

          {/* Cualquier otra ruta redirige a Login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
