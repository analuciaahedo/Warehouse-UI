import React from 'react';
import './Styles/PackagesNavBar.css';
import './Styles/Card.css'

const LeftBar = ({ paquetes = [], robots = [], onSelectItem }) => {
  return (
    <div className='container'>
      <aside className="sidebar">
        {/* Sección de Paquetes */}
        <div className='packages-status'>
          <div className="sidebar-title">
            <span className="title-icon">
              <i className='bx bx-package bx-sm'></i>
            </span>
            <h3>Paquetes</h3>
          </div>
          <ul className="package-list">
            {paquetes.map(item => (
              <li key={item.id} className="side-link">
                <button
                  className="side-ref"
                  onClick={() => onSelectItem(item)}
                >
                  <span className="item-icon">
                    <i className='bx bx-box'></i>
                  </span>
                  <span className="package-name">{item.nombre}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Sección de Robots */}
        <div className='robots-status'>
          <div className="sidebar-title">
            <span className="title-icon">
              <i className='bx bx-car bx-sm'></i>
            </span>
            <h3>Robots</h3>
          </div>
          <ul className="package-list">
            {robots.map(item => (
              <li key={item.id} className="side-link">
                <button
                  className="side-ref"
                  onClick={() => onSelectItem(item)}
                >
                  <span className="item-icon">
                    <i className='bx bx-robot'></i>
                  </span>
                  <span className="package-name">{item.nombre}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default LeftBar;
