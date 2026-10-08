import { Link } from 'react-router-dom';

function TarjetaProducto({ producto }) {
  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(producto.precio);

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <span className="badge text-bg-secondary align-self-start mb-2">
          {producto.categoria}
        </span>

        <h5 className="card-title">{producto.nombre}</h5>

        <p className="card-text text-muted">{producto.descripcion}</p>

        <div className="mt-auto">
          <h4 className="text-primary">{precioFormateado}</h4>

          <p className="mb-3">
            Stock disponible: <strong>{producto.stock}</strong>
          </p>

          <Link to={`/productos/${producto.id}`} className="btn btn-primary w-100">
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TarjetaProducto;