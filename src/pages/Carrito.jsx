import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { formatearPrecio } from '../utils/formato';

function Carrito() {
  const navigate = useNavigate();
  const { items, total, cambiar, quitar, vaciar } = useCarrito();
  useTituloPagina('Carrito');

  return (
    <main className="bg-light min-vh-100 py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 text-primary fw-bold mb-0">Tu solicitud en curso</h1>
          <Button variant="outline-primary" onClick={() => navigate('/productos')}>
            ← Seguir comprando
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="alert alert-info">Tu carrito está vacío.</div>
        ) : (
          <>
            <div className="table-responsive">
              <Table hover className="align-middle bg-white shadow-sm">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nombre}</td>
                      <td>{formatearPrecio(item.precio)}</td>
                      <td>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          aria-label={`Disminuir ${item.nombre}`}
                          onClick={() => cambiar(item.id, item.cantidad - 1)}
                        >
                          -
                        </Button>
                        <span className="mx-3">{item.cantidad}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          aria-label={`Aumentar ${item.nombre}`}
                          onClick={() => cambiar(item.id, item.cantidad + 1)}
                        >
                          +
                        </Button>
                      </td>
                      <td>{formatearPrecio(item.precio * item.cantidad)}</td>
                      <td className="text-end">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          aria-label={`Quitar ${item.nombre}`}
                          onClick={() => quitar(item.id)}
                        >
                          Quitar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <Button variant="outline-danger" onClick={vaciar}>
                Vaciar carrito
              </Button>
              <div className="text-end">
                <h2 className="h4 mb-3">Total: {formatearPrecio(total)}</h2>
                <Button variant="success" onClick={() => navigate('/checkout')}>
                  Confirmar solicitud
                </Button>
              </div>
            </div>
          </>
        )}
      </Container>
    </main>
  );
}

export default Carrito;