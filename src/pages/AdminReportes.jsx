import { Row, Col, Card, Table } from 'react-bootstrap';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import { useProductos } from '../context/ProductosContext';
import { listarPedidos } from '../services/pedidoService';
import { ventasTotales, productosMasVendidos, resumenPorCategoria } from '../utils/reportes';
import { formatearPrecio } from '../utils/formato';
import { useTituloPagina } from '../hooks/useTituloPagina';

function AdminReportes() {
  const { productos } = useProductos();
  useTituloPagina('Reportes');

  const pedidos = listarPedidos();
  const total = ventasTotales(pedidos);
  const promedio = pedidos.length === 0 ? 0 : Math.round(total / pedidos.length);
  const masVendidos = productosMasVendidos(pedidos);
  const porCategoria = resumenPorCategoria(productos);

  return (
    <PlantillaAdmin titulo="Reportes">
      <Row className="g-4 mb-4">
        {[
          ['Ventas totales', formatearPrecio(total)],
          ['Solicitudes', pedidos.length],
          ['Ticket promedio', formatearPrecio(promedio)],
        ].map(([titulo, valor]) => (
          <Col md={4} key={titulo}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Card.Subtitle className="text-muted mb-2">{titulo}</Card.Subtitle>
                <p className="h3 text-primary mb-0">{valor}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        <Col lg={6}>
          <h2 className="h5">Productos más vendidos</h2>
          {masVendidos.length === 0 ? (
            <div className="alert alert-info">Aún no hay ventas.</div>
          ) : (
            <Table className="bg-white shadow-sm">
              <thead><tr><th>Producto</th><th>Unidades</th></tr></thead>
              <tbody>
                {masVendidos.map((m) => (
                  <tr key={m.nombre}><td>{m.nombre}</td><td>{m.cantidad}</td></tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
        <Col lg={6}>
          <h2 className="h5">Inventario por categoría</h2>
          <Table className="bg-white shadow-sm">
            <thead><tr><th>Categoría</th><th>Productos</th><th>Stock</th></tr></thead>
            <tbody>
              {porCategoria.map((c) => (
                <tr key={c.categoria}><td>{c.categoria}</td><td>{c.productos}</td><td>{c.stock}</td></tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </PlantillaAdmin>
  );
}

export default AdminReportes;