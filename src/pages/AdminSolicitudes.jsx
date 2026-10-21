import { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import { listarPedidos, actualizarEstadoPedido, ESTADOS } from '../services/pedidoService';
import { formatearPrecio } from '../utils/formato';
import { useTituloPagina } from '../hooks/useTituloPagina';

function AdminSolicitudes() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState(() => listarPedidos());
  useTituloPagina('Solicitudes');

  const cambiarEstado = (id, estado) => {
    actualizarEstadoPedido(id, estado);
    setPedidos(listarPedidos());
  };

  return (
    <PlantillaAdmin titulo="Solicitudes">
      {pedidos.length === 0 ? (
        <div className="alert alert-info">Aún no hay solicitudes.</div>
      ) : (
        <div className="table-responsive">
          <Table hover className="align-middle bg-white shadow-sm">
            <thead>
              <tr>
                <th>N°</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{new Date(p.fecha).toLocaleDateString('es-CL')}</td>
                  <td>{p.cliente.nombre} {p.cliente.apellidos}</td>
                  <td>{formatearPrecio(p.total)}</td>
                  <td>
                    <Form.Select
                      size="sm"
                      aria-label={`Estado de la solicitud ${p.id}`}
                      value={p.estado}
                      onChange={(e) => cambiarEstado(p.id, e.target.value)}
                    >
                      {ESTADOS.map((estado) => (
                        <option key={estado} value={estado}>{estado}</option>
                      ))}
                    </Form.Select>
                  </td>
                  <td className="text-end">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/admin/solicitudes/${p.id}`)}
                    >
                      Comprobante
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

export default AdminSolicitudes;