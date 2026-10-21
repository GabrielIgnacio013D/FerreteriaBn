import { useState } from 'react';
import { Container, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';
import { useCarrito } from '../context/CarritoContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { formatearPrecio } from '../utils/formato';

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productos } = useProductos();
  const { agregar } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  const producto = productos.find((p) => p.id === Number(id));
  useTituloPagina(producto ? producto.nombre : 'Producto no encontrado');

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

  const agregarAlCarrito = () => {
    agregar(producto);
    setAgregado(true);
  };

  return (
    <Container as="main" className="py-5">
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
        ← Volver
      </Button>
      <Badge bg="secondary" className="mb-2">{producto.categoria}</Badge>
      <h1 className="h2">{producto.nombre}</h1>
      <p className="text-muted">{producto.descripcion}</p>
      <h2 className="h3 text-primary">{formatearPrecio(producto.precio)}</h2>
      <p>Stock disponible: <strong>{producto.stock}</strong></p>

      <Button variant="success" disabled={producto.stock === 0} onClick={agregarAlCarrito}>
        Agregar al carrito
      </Button>

      {agregado && (
        <div className="alert alert-success mt-3">
          Producto agregado al carrito. <Link to="/carrito">Ir al carrito</Link>
        </div>
      )}
    </Container>
  );
}

export default ProductoDetalle;