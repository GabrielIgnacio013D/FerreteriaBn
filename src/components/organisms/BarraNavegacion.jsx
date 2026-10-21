import { Navbar, Nav, Container, Badge } from 'react-bootstrap';

const ENLACES = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/productos', texto: 'Productos' },
  { ruta: '/categorias', texto: 'Categorías' },
  { ruta: '/ofertas', texto: 'Ofertas' },
  { ruta: '/blog', texto: 'Blog' },
  { ruta: '/nosotros', texto: 'Nosotros' },
  { ruta: '/contacto', texto: 'Contacto' },
];

function BarraNavegacion({ cantidadCarrito = 0, onNavegar }) {
  const ir = (e, ruta) => {
    e.preventDefault();
    onNavegar(ruta);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="px-4 shadow-sm" as="nav">
      <Container fluid>
        <Navbar.Brand href="/" className="fw-bold" onClick={(e) => ir(e, '/')}>
          🛠️ Ferretería BN
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="barra-publica" />
        <Navbar.Collapse id="barra-publica">
          <Nav className="me-auto">
            {ENLACES.map((enlace) => (
              <Nav.Link key={enlace.ruta} href={enlace.ruta} onClick={(e) => ir(e, enlace.ruta)}>
                {enlace.texto}
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="align-items-lg-center">
            <Nav.Link href="/carrito" onClick={(e) => ir(e, '/carrito')}>
              Carrito <Badge bg="light" text="dark">{cantidadCarrito}</Badge>
            </Nav.Link>
            <Nav.Link href="/login" onClick={(e) => ir(e, '/login')}>
              Ingresar
            </Nav.Link>
            <Nav.Link href="/registro" onClick={(e) => ir(e, '/registro')}>
              Registrarse
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraNavegacion;