// src/Components/TarjetaOperador.jsx
import React from "react";
import "./RegistrarOperadores.css";

export default function TarjetaOperador({
  operador,
  isExpanded,
  onToggle,
  onActivate,
}) {
  const {
    id,
    nombre_completo,
    nomina,
    correo,
    telefono,
    rol,
    puesto,
    institucion,
    fecha_alta,
    activo,
  } = operador;

  return (
    <div className={`card ${isExpanded ? "expanded" : ""}`}>
      {/* Solo el encabezado reacciona al clic */}
      <div className="card-header" onClick={onToggle}>
        <h2 className="card-title">{nombre_completo}</h2>
        <p className="card-subtitle">
          <strong>Nómina:</strong> {nomina}
        </p>
      </div>

      {isExpanded && (
        <div className="card-body">
          <p>
            <strong>Correo:</strong> {correo}
          </p>
          <p>
            <strong>Teléfono:</strong> {telefono}
          </p>
          <p>
            <strong>Rol:</strong> {rol}
          </p>
          <p>
            <strong>Puesto:</strong> {puesto}
          </p>
          <p>
            <strong>Institución:</strong> {institucion}
          </p>
          <p>
            <strong>Fecha de alta:</strong>{" "}
            {new Date(fecha_alta).toLocaleDateString()}
          </p>
          <div>
            {!activo ? (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Evita colapsar la tarjeta
                  onActivate(id);
                }}
                className="card-button"
              >
                Dar de alta operador
              </button>
            ) : (
              <span className="card-active">Operador activo</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
