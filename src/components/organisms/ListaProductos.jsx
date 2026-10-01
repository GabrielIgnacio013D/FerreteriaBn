import TarjetaProducto from '../molecules/TarjetaProducto';

function ListaProductos({ productos }) {
  if (!productos || productos.length === 0) {
    return (
      <div className="alert alert-info">
        No hay productos disponibles.
      </div>
    );
  }

  return (
    <div className="row g-4">
      {productos.map((producto) => (
        <div
          className="col-12 col-sm-6 col-lg-4 col-xl-3"
          key={producto.id}
        >
          <TarjetaProducto producto={producto} />
        </div>
      ))}
    </div>
  );
}

export default ListaProductos;