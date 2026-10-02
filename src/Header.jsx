// src/Header.jsx
import { useState } from 'react';
import './Header.css';
import tablatalles from './assets/tablatalles.webp';
export default function Header() {
  // 1. Estado para controlar si se muestra o no la tabla de talles
  const [mostrarTalles, setMostrarTalles] = useState(false);

  // 2. Función para alternar entre abrir y cerrar
  const toggleTalles = () => setMostrarTalles(!mostrarTalles);

  // Función para desplazarse suavemente a cualquier ID de la página
  const scrollTo = (id) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const numeroWhatsApp = "5491133749123"; 
  const abrirWhatsApp = () => {
    const url = `https://wa.me/${numeroWhatsApp}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Función específica para ir arriba de todo (Inicio)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className='header'>
        <h1 className='header-titulo'>Domino Stampa</h1>
        
        <nav className='header-navbar'>
          <button type="button" onClick={scrollToTop}>
            Inicio
          </button>
          <button type="button" onClick={() => scrollTo('catalogo')}>
            Catálogo
          </button>
          <button type="button" onClick={abrirWhatsApp}>
            Contacto
          </button>
          <button type="button" onClick={toggleTalles}>
            Tabla de Talles
          </button>
        </nav>
      </div>

      {/* Modal / Alerta de la tabla de talles (Ahora está correctamente dentro del return) */}
      {mostrarTalles && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', textAlign: 'right' }}>
            <button type="button" onClick={toggleTalles} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', marginBottom: '10px', fontWeight: 'bold' }}>
              ✕ Cerrar
            </button>
              <img
                   src={tablatalles}
                   alt="Tabla de Talles"
                   style={{
                   maxWidth: '90vw',
                   maxHeight: '75vh',
                   display: 'block',
                   borderRadius: '8px',
                   objectFit: 'contain'
                    }}
                    />
          </div>
        </div>
      )}
    </>
  );
}