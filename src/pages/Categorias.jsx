import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';

function Categorias() {
  const { productos } = useProductos();
  const navigate = useNavigate();

  const categorias = [...new Set(productos.map((p) => p.categoria))];

  return (
    <Container as="main" className="py-5">
      <h1 className="h2 mb-4">Categorías</h1>
      <Row className="g-4">
        {categorias.map((cat) => {
          const cantidad = productos.filter((p) => p.categoria === cat).length;
          return (
            <Col xs={12} sm={6} lg={4} key={cat}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{cat}</Card.Title>
                  <Card.Text className="text-muted">{cantidad} producto(s)</Card.Text>
                  <Button
                    className="mt-auto"
                    onClick={() => navigate('/productos', { state: { categoria: cat } })}
                  >
                    Ver productos
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Categorias;