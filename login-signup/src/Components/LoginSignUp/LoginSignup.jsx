import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../Context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import logo_icon from '../Assets/logo1.png';
import './LoginSignup.css';

export default function LoginSignUp() {
  const { login } = useUser();        // <- useUser() ya no será undefined
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://192.168.1.20:3000/user/login', {
        correo: email,
        password_hash: password,
      });
      console.log('📦 Respuesta del backend:', res.data); // 👈 Aquí ves toda la respuesta


      if (res.data.result === 'True') {
        const userData = {
          rol: res.data.rol.rol,
          nombre_completo: res.data.nombre_completo || '',
          correo: res.data.correo || email,
        };
        login(userData); // <-- Guarda en contexto
        console.log('ROL del usuario:', res.data.rol.rol);


        setMensaje('✅ Bienvenido');
        // Redirige según rol
        if (userData.rol === 'admin') {
          navigate('/registrar-operadores');
        } else {
          navigate('/inventario');
        }
      } else {
        setMensaje(`❌ ${res.data.msg}`);
      }
    } catch (err) {
      console.error('🚨 Error de login:', err);
      setMensaje('❌ Error al conectar con el servidor');
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