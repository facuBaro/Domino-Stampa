// src/Catalog.jsx
import { useState } from 'react';
import './Catalog.css';

// Vite escanea la carpeta y obtiene las URLs de producción automáticamente
const modulosImagenes = import.meta.glob('./assets/catalogoImg/*.webp', {
  eager: true,
  query: '?url',
  import: 'default'
});

// Transformamos el objeto en un array ordenado numéricamente
const productos = Object.entries(modulosImagenes)
  .map(([path, url]) => {
    // Extrae solo el número del nombre del archivo (ej: "15" de "./assets/catalogimg/15.webp")
    const nombreArchivo = path.split('/').pop();
    const numeroStr = nombreArchivo.replace('.webp', '');
    const id = parseInt(numeroStr, 10);

    return {
      id,
      numero: `#${id}`,
      descripcion: `Estampado N° ${id}`,
      imagenUrl: url
    };
  })
  .filter((prod) => !isNaN(prod.id)) // Descarta archivos que no sean numéricos
  .sort((a, b) => a.id - b.id); // Ordena del 1 en adelante

export default function Catalog() {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const agrandarImagen = (url) => {
    setImagenSeleccionada(url);
  };

  const cerrarImagen = () => {
    setImagenSeleccionada(null);
    setIsHovered(false);
  };

  return (
    <section className="catalogo-seccion" id="catalogo">
      <h2 className="catalogo-titulo">Nuestros Diseños</h2>

      <div className="catalogo-grid">
        {productos.map((prod) => (
          <article 
            key={prod.id} 
            className="tarjeta-producto"
            onClick={() => agrandarImagen(prod.imagenUrl)}
            style={{ cursor: 'pointer' }}
          >
            <span className="producto-numero">{prod.numero}</span>
            <div className="producto-imagen-contenedor">
              <img
                src={prod.imagenUrl}
                alt={prod.descripcion}
                className="producto-imagen"
                loading="lazy"
              />
            </div>
            <p className="producto-descripcion">{prod.descripcion}</p>
          </article>
        ))}
      </div>

      {/* Ventana flotante / Alerta de imagen grande */}
      {imagenSeleccionada && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div 
            style={{
              position: 'relative',
              backgroundColor: '#1e293b',
              padding: '16px',
              borderRadius: '12px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
            }}
          >
            <button 
              type="button" 
              onClick={cerrarImagen}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                backgroundColor: isHovered ? '#1d4ed8' : '#2563eb',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 14px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '12px',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              ✕ Cerrar
            </button>
            <img 
              src={imagenSeleccionada} 
              alt="Estampado grande" 
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '8px'
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}