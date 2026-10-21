import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerPedido } from '../services/pedidoService';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { formatearPrecio } from '../utils/formato';

function Resultado() {
  const { id } = useParams();
  const navigate = useNavigate();
  useTituloPagina('Resultado de la solicitud');

  if (id === 'error') {
    return (
      <Container className="py-5">
        <div className="alert alert-danger">
          <h1 className="h4">No se pudo registrar la solicitud</h1>
          <p className="mb-0">
            Algún producto ya no tiene stock suficiente. Revisa tu carrito e inténtalo de nuevo.
          </p>
        </div>
        <Button onClick={() => navigate('/carrito')}>Volver al carrito</Button>
      </Container>
    );
  }

  const pedido = obtenerPedido(Number(id));

  if (!pedido) {
    return (
      <Container className="py-5">
        <div className="alert alert-warning">Solicitud no encontrada.</div>
        <Button onClick={() => navigate('/productos')}>Ir a productos</Button>
      </Container>
    );
  }

  return (
    <main className="bg-light min-vh-100 py-5">
      <Container>
        <div className="alert alert-success">
          <h1 className="h4 mb-1">Solicitud N° {pedido.id} registrada</h1>
          <p className="mb-0">
            Gracias, {pedido.cliente.nombre}. Estado: <strong>{pedido.estado}</strong>
          </p>
        </div>

        <Table className="bg-white shadow-sm">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
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

        <h2 className="h4 text-end mb-4">Total: {formatearPrecio(pedido.total)}</h2>
        <Button onClick={() => navigate('/productos')}>Seguir comprando</Button>
      </Container>
    </main>
  );
}

export default Resultado;