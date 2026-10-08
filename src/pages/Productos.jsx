import { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

import { useProductos } from '../context/ProductosContext';
import ListaProductos from '../components/organisms/ListaProductos';

function Productos() {
  const { productos } = useProductos();
  const navigate = useNavigate();
  const location = useLocation();

  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState(location.state?.categoria ?? 'Todas');

  // categorías únicas de los productos
  const categorias = [
    'Todas',
    ...new Set(productos.map((producto) => producto.categoria)),
  ];

  // productos por nombre y categoría
  const productosFiltrados = productos.filter((producto) => {
    const textoBusqueda = busqueda.toLowerCase().trim();

    const coincideBusqueda = producto.nombre.toLowerCase().includes(textoBusqueda);

    const coincideCategoria =
      categoria === 'Todas' || producto.categoria === categoria;

    return coincideBusqueda && coincideCategoria;
  });

  return (
    <main className="bg-light min-vh-100 py-5">
      <Container>
        {/* encabezado */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-primary">
            🛠️ Catálogo Ferretería BN
          </h1>

          <p className="lead text-muted">
            Encuentra las herramientas y materiales que necesitas.
          </p>

          <Button variant="outline-primary" onClick={() => navigate('/menu')}>
            ← Volver al menú
          </Button>
        </div>

        {/* buscador y filtro */}
        <Row className="mb-4 g-3">
          <Col md={8}>
            <Form.Group>
              <Form.Label className="fw-bold">🔎 Buscar producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe el nombre del producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-bold">🏷️ Categoría</Form.Label>
              <Form.Select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* resultados */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 mb-0">Productos disponibles</h2>

          <span className="badge text-bg-primary fs-6">
            {productosFiltrados.length}{' '}
            {productosFiltrados.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>

        {/* lista */}
        <ListaProductos productos={productosFiltrados} />
      </Container>
    </main>
  );
}

export default Productos;