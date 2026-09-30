import { Container, Navbar, Nav, Card, Row, Col, Button } from 'react-bootstrap';

function MenuPrincipal({ onLogout }) {
  return (
    <div className="bg-light min-vh-100">
      {/* Contenido semántico: Encabezado principal y navegación */}
      <header>
        <Navbar bg="primary" variant="dark" expand="lg" className="px-4 shadow-sm" as="nav">
          <Container fluid>
            <Navbar.Brand href="#home" className="fw-bold">
              🛠️ Ferretería BN
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="align-items-center">
                <span className="text-white me-3">Bienvenido(a)</span>
                <Button variant="outline-light" size="sm" onClick={onLogout}>
                  Cerrar Sesión
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Contenido principal de la página */}
      <main>
        <Container className="mt-5 py-3">
          <section aria-labelledby="titulo-panel">
            <h1 id="titulo-panel" className="h2 mb-4 text-center text-primary fw-bold">
              Panel de Control Principal
            </h1>
            
            <Row className="g-4">
              {/* Tarjeta 1: Inventario */}
              <Col md={4}>
                <Card as="article" className="h-100 shadow-sm text-center p-3 border-0">
                  <Card.Body>
                    <div aria-hidden="true" style={{ fontSize: '3rem' }}>📦</div>
                    <Card.Title as="h2" className="h4 mt-3">Inventario y Productos</Card.Title>
                    <Card.Text>
                      Consulta el catálogo de herramientas y materiales, ajusta stock y precios.
                    </Card.Text>
                    <Button variant="primary" className="w-100 mt-2">
                      Ver Productos
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              {/* Tarjeta 2: Ventas */}
              <Col md={4}>
                <Card as="article" className="h-100 shadow-sm text-center p-3 border-0">
                  <Card.Body>
                    <div aria-hidden="true" style={{ fontSize: '3rem' }}>🛒</div>
                    <Card.Title as="h2" className="h4 mt-3">Punto de Venta</Card.Title>
                    <Card.Text>
                      Registra compras rápidas, emite comprobantes y gestiona el carrito.
                    </Card.Text>
                    <Button variant="success" className="w-100 mt-2">
                      Nueva Venta
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              {/* Tarjeta 3: Clientes */}
              <Col md={4}>
                <Card as="article" className="h-100 shadow-sm text-center p-3 border-0">
                  <Card.Body>
                    <div aria-hidden="true" style={{ fontSize: '3rem' }}>👥</div>
                    <Card.Title as="h2" className="h4 mt-3">Clientes y Proveedores</Card.Title>
                    <Card.Text>
                      Administra la lista de clientes registrados y datos de proveedores.
                    </Card.Text>
                    <Button variant="outline-primary" className="w-100 mt-2">
                      Gestionar
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