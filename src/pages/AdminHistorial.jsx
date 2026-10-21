import { Table, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import { obtenerUsuario } from '../services/usuarioService';
import { listarPedidos } from '../services/pedidoService';
import { pedidosDeUsuario } from '../utils/reportes';
import { formatearPrecio } from '../utils/formato';
import { useTituloPagina } from '../hooks/useTituloPagina';

function AdminHistorial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const usuario = obtenerUsuario(Number(id));
  useTituloPagina('Historial de solicitudes');

  if (!usuario) {
    return (
      <PlantillaAdmin titulo="Historial">
        <div className="alert alert-warning">Usuario no encontrado.</div>
        <Button onClick={() => navigate('/admin/usuarios')}>Volver</Button>
      </PlantillaAdmin>
    );
  }

  const pedidos = pedidosDeUsuario(listarPedidos(), usuario.email);

  return (
    <PlantillaAdmin titulo={`Historial de ${usuario.nombre}`}>
      {pedidos.length === 0 ? (
        <div className="alert alert-info">Este usuario aún no tiene solicitudes.</div>
      ) : (
        <Table hover className="align-middle bg-white shadow-sm">
          <thead>
            <tr><th>N°</th><th>Fecha</th><th>Total</th><th>Estado</th><th></th></tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{new Date(p.fecha).toLocaleDateString('es-CL')}</td>
                <td>{formatearPrecio(p.total)}</td>
                <td>{p.estado}</td>
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
      )}
      <Button variant="outline-primary" onClick={() => navigate('/admin/usuarios')}>
        ← Volver a usuarios
      </Button>
    </PlantillaAdmin>
  );
}

export default AdminHistorial;