import { Table, Button } from 'react-bootstrap';

function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(precio);
}

function TablaProductos({ productos, onEditar, onEliminar }) {
  if (!productos || productos.length === 0) {
    return <div className="alert alert-info">No hay productos registrados.</div>;
  }

  return (
    <div className="table-responsive">
      <Table striped hover className="align-middle bg-white shadow-sm">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>{formatearPrecio(p.precio)}</td>
              <td>{p.stock}</td>
              <td className="text-end">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => onEditar(p)}
                >
                  Editar
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => onEliminar(p.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TablaProductos;