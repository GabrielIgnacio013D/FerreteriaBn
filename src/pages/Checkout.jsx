import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import InputTexto from '../components/atoms/InputTexto';
import BotonSubmit from '../components/atoms/BotonSubmit';
import { useCarrito } from '../context/CarritoContext';
import { useProductos } from '../context/ProductosContext';
import { crearPedido } from '../services/pedidoService';
import { validarObligatorio, validarEmail } from '../utils/validaciones';
import { formatearPrecio } from '../utils/formato';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Checkout() {
  const navigate = useNavigate();
  const { items, total, vaciar } = useCarrito();
  const { productos, actualizar } = useProductos();
  useTituloPagina('Confirmar solicitud');

  const [datos, setDatos] = useState({
    nombre: '',
    apellidos: '',
    email: localStorage.getItem('usuario') ?? '',
    direccion: '',
  });
  const [errores, setErrores] = useState({});

  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value });

  if (items.length === 0) {
    return (
      <Container className="py-5">
        <div className="alert alert-info">No hay productos en tu carrito.</div>
        <Button onClick={() => navigate('/productos')}>Ir a productos</Button>
      </Container>
    );
  }

  const manejarSubmit = (e) => {
    e.preventDefault();

    const nuevos = {
      nombre: validarObligatorio(datos.nombre, 'El nombre'),
      apellidos: validarObligatorio(datos.apellidos, 'Los apellidos'),
      email: validarEmail(datos.email),
      direccion: validarObligatorio(datos.direccion, 'La dirección'),
    };
    setErrores(nuevos);
    if (!Object.values(nuevos).every((m) => m === '')) return;

    const hayStock = items.every((item) => {
      const p = productos.find((x) => x.id === item.id);
      return p && p.stock >= item.cantidad;
    });
    if (!hayStock) {
      navigate('/resultado/error');
      return;
    }

    items.forEach((item) => {
      const p = productos.find((x) => x.id === item.id);
      actualizar(item.id, { stock: p.stock - item.cantidad });
    });

    const pedido = crearPedido({ cliente: { ...datos }, items, total });
    vaciar();
    navigate(`/resultado/${pedido.id}`);
  };

  return (
    <main className="bg-light min-vh-100 py-5">
      <Container>
        <h1 className="h2 text-primary fw-bold mb-4">Confirmar solicitud</h1>
        <Row className="g-4">
          <Col lg={7}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h2 className="h5 mb-3">Tus datos</h2>
                <Form noValidate onSubmit={manejarSubmit}>
                  <InputTexto
                    id="checkout-nombre"
                    label="Nombre"
                    value={datos.nombre}
                    onChange={cambiar('nombre')}
                    error={errores.nombre}
                  />
                  <InputTexto
                    id="checkout-apellidos"
                    label="Apellidos"
                    value={datos.apellidos}
                    onChange={cambiar('apellidos')}
                    error={errores.apellidos}
                  />
                  <InputTexto
                    id="checkout-email"
                    label="Correo"
                    type="email"
                    value={datos.email}
                    onChange={cambiar('email')}
                    error={errores.email}
                  />
                  <InputTexto
                    id="checkout-direccion"
                    label="Dirección de entrega o retiro"
                    value={datos.direccion}
                    onChange={cambiar('direccion')}
                    error={errores.direccion}
                  />
                  <BotonSubmit texto="Confirmar solicitud" variante="success" />
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h2 className="h5 mb-3">Resumen</h2>
                {items.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between mb-2">
                    <span>
                      {item.nombre} x {item.cantidad}
                    </span>
                    <span>{formatearPrecio(item.precio * item.cantidad)}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>{formatearPrecio(total)}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Checkout;