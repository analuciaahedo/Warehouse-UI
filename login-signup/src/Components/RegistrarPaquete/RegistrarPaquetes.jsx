import React, { useState } from 'react';
import './RegistrarPaquetes.css';

export default function RegistrarPaquete() {
  const [paquete, setPaquete] = useState({
    id: '',
    sku: '',
    categoria: '',
    estado: '',
    ubicacion: '',
  });

  const [errors, setErrors] = useState({});
  const [paquetesRegistrados, setPaquetesRegistrados] = useState([]);

  const handleChange = (e) => {
    setPaquete({ ...paquete, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!paquete.id.trim()) newErrors.id = 'Campo obligatorio';
    if (!paquete.sku.trim()) newErrors.sku = 'Campo obligatorio';
    if (!paquete.categoria.trim()) newErrors.categoria = 'Selecciona una categoría';
    if (!paquete.estado.trim()) newErrors.estado = 'Selecciona un estado';
    if (!paquete.ubicacion.trim()) newErrors.ubicacion = 'Campo obligatorio';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setPaquetesRegistrados([...paquetesRegistrados, paquete]);
    setPaquete({ id: '', sku: '', categoria: '', estado: '', ubicacion: '' });
    setErrors({});
  };

  const inputClass = (field) =>
    errors[field] ? 'input-error' : '';

  return (
    <div className="registro-main">
      <div className="registro-paquete-container">
        <h2 className="registro-title">Registrar nuevo paquete</h2>
        <form className="registro-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            placeholder="ID del paquete"
            value={paquete.id}
            onChange={handleChange}
            className={inputClass('id')}
          />
          {errors.id && <span className="error-text">{errors.id}</span>}

          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={paquete.sku}
            onChange={handleChange}
            className={inputClass('sku')}
          />
          {errors.sku && <span className="error-text">{errors.sku}</span>}

          <select
            name="categoria"
            value={paquete.categoria}
            onChange={handleChange}
            className={inputClass('categoria')}
          >
            <option value="">Selecciona una categoría</option>
            <option value="Automotriz y motocicletas">Automotriz y motocicletas</option>
            <option value="Bebé">Bebé</option>
            <option value="Belleza">Belleza</option>
            <option value="Deportes y aire libre">Deportes y aire libre</option>
            <option value="Electrónicos">Electrónicos</option>
            <option value="Herramientas y mejoras del hogar">Herramientas y mejoras del hogar</option>
            <option value="Hogar y cocina">Hogar y cocina</option>
            <option value="Industria, empresas y ciencia">Industria, empresas y ciencia</option>
            <option value="Instrumentos musicales">Instrumentos musicales</option>
            <option value="Jardín">Jardín</option>
            <option value="Juguetes y juegos">Juguetes y juegos</option>
            <option value="Libros">Libros</option>
            <option value="Música">Música</option>
            <option value="Oficina y papelería">Oficina y papelería</option>
            <option value="Productos para animales">Productos para animales</option>
            <option value="Ropa, zapatos y accesorios">Ropa, zapatos y accesorios</option>
            <option value="Salud y cuidado personal">Salud y cuidado personal</option>
            <option value="Videojuegos">Videojuegos</option>
          </select>
          {errors.categoria && <span className="error-text">{errors.categoria}</span>}

          <select
            name="estado"
            value={paquete.estado}
            onChange={handleChange}
            className={inputClass('estado')}
          >
            <option value="">Selecciona un estado</option>
            <option value="Llegada">Llegada</option>
            <option value="En movimiento">En movimiento</option>
            <option value="Salida">Salida</option>
            <option value="En banda">En banda</option>
            <option value="Alerta">Alerta</option>
          </select>
          {errors.estado && <span className="error-text">{errors.estado}</span>}

          <input
            type="text"
            name="ubicacion"
            placeholder="Ubicación"
            value={paquete.ubicacion}
            onChange={handleChange}
            className={inputClass('ubicacion')}
          />
          {errors.ubicacion && <span className="error-text">{errors.ubicacion}</span>}

          <button type="submit">Registrar</button>
        </form>
      </div>

      <div className="tabla-paquetes">
        <h2>Paquetes registrados</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>SKU</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {paquetesRegistrados.map((p, i) => (
              <tr key={i}>
                <td>{p.id}</td>
                <td>{p.sku}</td>
                <td>{p.categoria}</td>
                <td>{p.estado}</td>
                <td>{p.ubicacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
