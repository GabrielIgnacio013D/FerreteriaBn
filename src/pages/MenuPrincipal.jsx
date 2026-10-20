import { Container, Navbar, Nav, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MenuPrincipal({ onLogout }) {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    if (onLogout) onLogout();
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <div className="bg-light min-vh-100">
      <header>
        <Navbar bg="primary" variant="dark" expand="lg" className="px-4 shadow-sm" as="nav">
          <Container fluid>
            <Navbar.Brand
              href="#"
              className="fw-bold"
              onClick={(e) => {
                e.preventDefault();
                navigate('/menu');
              }}
            >
              🛠️ Ferretería BN
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="align-items-center">
                <Nav.Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/productos');
                  }}
                >
                  Productos
                </Nav.Link>

                <Nav.Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/categorias');
                  }}
                >
                  Categorías
                </Nav.Link>

                <Nav.Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/admin/productos');
                  }}
                >
                  Administración
                </Nav.Link>

                <span className="text-white mx-3">Bienvenido(a)</span>

                <Button variant="outline-light" size="sm" onClick={cerrarSesion}>
                  Cerrar Sesión
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main>
        <Container className="mt-5 py-3">
          <section aria-labelledby="titulo-panel">
            <h1 id="titulo-panel" className="h2 mb-4 text-center text-primary fw-bold">
              Panel de Control Principal
            </h1>

            <Row className="g-4">
              <Col md={4}>
                <Card as="article" className="h-100 shadow-sm text-center p-3 border-0">
                  <Card.Body>
                    <div aria-hidden="true" style={{ fontSize: '3rem' }}>📦</div>
                    <Card.Title as="h2" className="h4 mt-3">
                      Inventario y Productos
                    </Card.Title>
                    <Card.Text>
                      Consulta el catálogo de herramientas y materiales.
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="w-100 mt-2"
                      onClick={() => navigate('/productos')}
                    >
                      Ver Productos
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card as="article" className="h-100 shadow-sm text-center p-3 border-0">
                  <Card.Body>
                    <div aria-hidden="true" style={{ fontSize: '3rem' }}>🏷️</div>
                    <Card.Title as="h2" className="h4 mt-3">
                      Categorías
                    </Card.Title>
                    <Card.Text>
                      Explora los productos agrupados por categoría.
                    </Card.Text>
                    <Button
                      variant="success"
                      className="w-100 mt-2"
                      onClick={() => navigate('/categorias')}
                    >
                      Ver Categorías
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card as="article" className="h-100 shadow-sm text-center p-3 border-0">
                  <Card.Body>
                    <div aria-hidden="true" style={{ fontSize: '3rem' }}>⚙️</div>
                    <Card.Title as="h2" className="h4 mt-3">
                      Administración
                    </Card.Title>
                    <Card.Text>
                      Crea, edita y elimina productos del catálogo.
                    </Card.Text>
                    <Button
                      variant="outline-primary"
                      className="w-100 mt-2"
                      onClick={() => navigate('/admin/productos')}
                    >
                      Administrar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>
        </Container>
      </main>
    </div>
  );
}

export default MenuPrincipal;