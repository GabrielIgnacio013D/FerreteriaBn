import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import { useProductos } from '../context/ProductosContext';
import { listarPedidos } from '../services/pedidoService';
import { listarUsuarios } from '../services/usuarioService';
import { productosCriticos, ventasTotales } from '../utils/reportes';
import { formatearPrecio } from '../utils/formato';
import { useTituloPagina } from '../hooks/useTituloPagina';

function AdminDashboard() {
  const navigate = useNavigate();
  const { productos } = useProductos();
  useTituloPagina('Dashboard');

  const pedidos = listarPedidos();
  const usuarios = listarUsuarios();

  const tarjetas = [
    { titulo: 'Productos', valor: productos.length, ruta: '/admin/productos' },
    { titulo: 'Solicitudes', valor: pedidos.length, ruta: '/admin/solicitudes' },
    { titulo: 'Usuarios', valor: usuarios.length, ruta: '/admin/usuarios' },
    { titulo: 'Ítems críticos', valor: productosCriticos(productos).length, ruta: '/admin/criticos' },
    { titulo: 'Ventas totales', valor: formatearPrecio(ventasTotales(pedidos)), ruta: '/admin/reportes' },
  ];

  return (
    <PlantillaAdmin titulo="Dashboard">
      <Row className="g-4">
        {tarjetas.map((t) => (
          <Col md={6} xl={4} key={t.titulo}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Subtitle className="text-muted mb-2">{t.titulo}</Card.Subtitle>
                <p className="display-6 fw-bold text-primary">{t.valor}</p>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="mt-auto align-self-start"
                  onClick={() => navigate(t.ruta)}
                >
                  Ver detalle
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </PlantillaAdmin>
  );
}

export default AdminDashboard;