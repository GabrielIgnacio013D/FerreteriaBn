import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const ENLACES = [
  { ruta: '/admin', texto: 'Dashboard' },
  { ruta: '/admin/productos', texto: 'Productos' },
  { ruta: '/admin/categorias', texto: 'Categorías' },
  { ruta: '/admin/criticos', texto: 'Ítems críticos' },
  { ruta: '/admin/solicitudes', texto: 'Solicitudes' },
  { ruta: '/admin/usuarios', texto: 'Usuarios' },
  { ruta: '/admin/reportes', texto: 'Reportes' },
  { ruta: '/admin/perfil', texto: 'Perfil' },
];

function PlantillaAdmin({ titulo, children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="bg-light min-vh-100">
      <nav className="bg-dark text-white px-4 py-2 d-flex justify-content-between align-items-center">
        <strong>⚙️ Administración · Ferretería BN</strong>
        <Button variant="outline-light" size="sm" onClick={() => navigate('/')}>
          Ver tienda
        </Button>
      </nav>
      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="bg-white border-end py-3">
            <Nav variant="pills" className="flex-column">
              {ENLACES.map((enlace) => (
                <Nav.Link
                  key={enlace.ruta}
                  href={enlace.ruta}
                  active={pathname === enlace.ruta}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(enlace.ruta);
                  }}
                >
                  {enlace.texto}
                </Nav.Link>
              ))}
            </Nav>
          </Col>
          <Col md={9} lg={10} className="py-4 px-4">
            <h1 className="h3 text-primary fw-bold mb-4">{titulo}</h1>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PlantillaAdmin;