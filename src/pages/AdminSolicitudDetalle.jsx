import { Table, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import { obtenerPedido } from '../services/pedidoService';
import { formatearPrecio } from '../utils/formato';
import { useTituloPagina } from '../hooks/useTituloPagina';

function AdminSolicitudDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pedido = obtenerPedido(Number(id));
  useTituloPagina(pedido ? `Comprobante N° ${pedido.id}` : 'Solicitud no encontrada');

  if (!pedido) {
    return (
      <PlantillaAdmin titulo="Comprobante">
        <div className="alert alert-warning">Solicitud no encontrada.</div>
        <Button onClick={() => navigate('/admin/solicitudes')}>Volver</Button>
      </PlantillaAdmin>
    );
  }

  return (
    <PlantillaAdmin titulo={`Comprobante N° ${pedido.id}`}>
      <div className="bg-white shadow-sm rounded p-4">
        <p className="mb-1"><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString('es-CL')}</p>
        <p className="mb-1"><strong>Cliente:</strong> {pedido.cliente.nombre} {pedido.cliente.apellidos}</p>
        <p className="mb-1"><strong>Correo:</strong> {pedido.cliente.email}</p>
        <p className="mb-3"><strong>Entrega o retiro:</strong> {pedido.cliente.direccion}</p>

        <Table>
          <thead>
            <tr><th>Producto</th><th>Cantidad</th><th>Subtotal</th></tr>
          </thead>
          <tbody>
            {pedido.items.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>{formatearPrecio(item.precio * item.cantidad)}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h2 className="h5 text-end">Total: {formatearPrecio(pedido.total)}</h2>
        <p className="text-end">Estado: <strong>{pedido.estado}</strong></p>
      </div>
      <div className="mt-3">
        <Button variant="outline-primary" className="me-2" onClick={() => navigate('/admin/solicitudes')}>
          ← Volver
        </Button>
        <Button variant="secondary" onClick={() => window.print()}>
          Imprimir
        </Button>
      </div>
    </PlantillaAdmin>
  );
}

export default AdminSolicitudDetalle;