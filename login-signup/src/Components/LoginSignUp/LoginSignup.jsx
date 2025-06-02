import React, { useState } from 'react';
import { useUser } from '../Context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import logo_icon from '../Assets/logo1.png';
import './LoginSignup.css';

export default function LoginSignUp() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async () => {
    // 1) Intentamos llamar al servidor normalmente
    try {
      const res = await fetch('http://192.168.1.20:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, password_hash: password }),
      });
      const data = await res.json();
      console.log('📦 Respuesta del backend:', data);

      if (data.result === 'True') {
        const userData = {
          rol: data.rol.rol,              // extraemos data.rol.rol
          nombre_completo: data.nombre_completo || '',
          correo: data.correo || email,
        };
        login(userData);
        console.log('ROL del usuario:', userData.rol);

        setMensaje('✅ Bienvenido');
        if (userData.rol === 'Administrador') {
          navigate('/registrar-operadores');
        } else {
          navigate('/inventario');
        }
        return;
      } else {
        setMensaje(`❌ ${data.msg}`);
      }
    } catch (err) {
      console.warn('⚠️ No se pudo conectar al servidor, se usará login simulado.');
    }

    // 2) Login simulado: si el servidor falla, damos acceso directo
    //    Puedes cambiar aquí el rol por "Administrador" o "Operador"
    const simulatedRole = 'Administrador'; // o 'Operador'
    const userData = {
      rol: simulatedRole,
      nombre_completo: 'Usuario de prueba',
      correo: email || 'test@local',
    };
    login(userData);
    setMensaje('🔹 Login simulado: entrando como ' + simulatedRole);
    // Redirigimos según el rol simulado:
    if (simulatedRole === 'Administrador') {
      navigate('/registrar-operadores');
    } else {
      navigate('/inventario');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <img src={logo_icon} alt="Logo" />
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="Email" />
          <input
            type="email"
            placeholder="Correo de colaborador o empresa"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="Password" />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {mensaje && (
        <p className="error" style={{ textAlign: 'center', marginTop: 10 }}>
          {mensaje}
        </p>
      )}

      <div className="submit-container">
        <button className="submit" onClick={handleLogin}>
          Ingresar
        </button>
      </div>
    </div>
  );
}
