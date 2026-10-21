import { Table, Button, Badge } from 'react-bootstrap';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import { useProductos } from '../context/ProductosContext';
import { productosCriticos, UMBRAL_CRITICO } from '../utils/reportes';
import { useTituloPagina } from '../hooks/useTituloPagina';

function AdminCriticos() {
  const { productos, actualizar } = useProductos();
  useTituloPagina('Ítems críticos');

  const criticos = productosCriticos(productos);

  return (
    <PlantillaAdmin titulo="Ítems críticos">
      <p className="text-muted">Productos con {UMBRAL_CRITICO} unidades o menos.</p>
      {criticos.length === 0 ? (
        <div className="alert alert-success">No hay productos con poco stock.</div>
      ) : (
        <div className="table-responsive">
          <Table hover className="align-middle bg-white shadow-sm">
            <thead>
              <tr><th>Producto</th><th>Categoría</th><th>Stock</th><th></th></tr>
            </thead>
            <tbody>
              {criticos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>
                    <Badge bg={p.stock === 0 ? 'danger' : 'warning'} text={p.stock === 0 ? undefined : 'dark'}>
                      {p.stock}
                    </Badge>
                  </td>
                  <td className="text-end">
                    <Button
                      variant="outline-success"
                      size="sm"
                      aria-label={`Reponer ${p.nombre}`}
                      onClick={() => actualizar(p.id, { stock: p.stock + 10 })}
                    >
                      Reponer +10
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </PlantillaAdmin>
  );
}

export default AdminCriticos;