import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { entradas } from '../data/blog';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Blog() {
  const navigate = useNavigate();
  useTituloPagina('Blog');

  return (
    <PlantillaPublica>
      <h1 className="h2 text-primary fw-bold mb-4">Blog</h1>
      <Row className="g-4">
        {entradas.map((entrada) => (
          <Col md={6} key={entrada.id}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="d-flex flex-column">
                <small className="text-muted">{entrada.fecha}</small>
                <Card.Title className="mt-1">{entrada.titulo}</Card.Title>
                <Card.Text>{entrada.resumen}</Card.Text>
                <Button className="mt-auto" onClick={() => navigate(`/blog/${entrada.id}`)}>
                  Leer más
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </PlantillaPublica>
  );
}

export default Blog;