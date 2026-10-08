import { Container, Button, Badge } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productos } = useProductos();

  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <Container className="py-5">
        <div className="alert alert-warning">Producto no encontrado.</div>
        <Button variant="secondary" onClick={() => navigate('/productos')}>
          Volver a productos
        </Button>
      </Container>
    );
  }

  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(producto.precio);

  return (
    <Container as="main" className="py-5">
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
        ← Volver
      </Button>
      <Badge bg="secondary" className="mb-2">{producto.categoria}</Badge>
      <h1 className="h2">{producto.nombre}</h1>
      <p className="text-muted">{producto.descripcion}</p>
      <h2 className="h3 text-primary">{precioFormateado}</h2>
      <p>Stock disponible: <strong>{producto.stock}</strong></p>
    </Container>
  );
}

export default ProductoDetalle;