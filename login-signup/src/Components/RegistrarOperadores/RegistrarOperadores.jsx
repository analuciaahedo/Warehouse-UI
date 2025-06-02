// src/Components/RegistrarOperadores.jsx
import React, { useEffect, useState } from "react";
import TarjetaOperador from "./TarjetaOperador.jsx";
import "./RegistrarOperadores.css";

export default function RegistrarOperadores() {
  const [operadores, setOperadores] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    // Datos de ejemplo (mock)
    const datosFicticios = [
      {
        id: 1,
        nombre_completo: "Ana Pérez",
        correo: "ana.perez@ejemplo.com",
        telefono: "555-1234",
        rol: "Operador",
        puesto: "Bodega",
        institucion: "Empresa ABC",
        fecha_alta: "2023-01-15T00:00:00.000Z",
        nomina: "12345",
        activo: false,
      },
      {
        id: 2,
        nombre_completo: "Luis Gómez",
        correo: "luis.gomez@ejemplo.com",
        telefono: "555-5678",
        rol: "Operador",
        puesto: "Almacén",
        institucion: "Empresa XYZ",
        fecha_alta: "2022-11-20T00:00:00.000Z",
        nomina: "67890",
        activo: true,
      },
      {
        id: 3,
        nombre_completo: "María López",
        correo: "maria.lopez@ejemplo.com",
        telefono: "555-9012",
        rol: "Administrador",
        puesto: "Supervisor",
        institucion: "Empresa LMN",
        fecha_alta: "2021-08-10T00:00:00.000Z",
        nomina: "54321",
        activo: true,
      },
    ];

    setTimeout(() => {
      setOperadores(datosFicticios);
    }, 100);
  }, []);

  // Togglear qué tarjeta está abierta: si haces clic en la misma que ya estaba abierta, la cierras (expandedId = null); si haces clic en otra, abres esa.
  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Marca un operador como activo
  const activarOperador = (id) => {
    setOperadores((prev) =>
      prev.map((op) => (op.id === id ? { ...op, activo: true } : op))
    );
  };

  return (
    <div className="registrar-ops-container">
      {operadores.length === 0 ? (
        <p className="no-operators">No hay operadores para mostrar.</p>
      ) : (
        <div className="cards-wrapper">
          {operadores.map((op) => (
            <TarjetaOperador
              key={op.id}
              operador={op}
              isExpanded={expandedId === op.id}
              onToggle={() => toggleExpand(op.id)}
              onActivate={activarOperador}
            />
          ))}
        </div>
      )}
    </div>
  );
}
