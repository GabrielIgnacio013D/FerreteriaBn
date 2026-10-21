import { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import InputTexto from '../components/atoms/InputTexto';
import BotonSubmit from '../components/atoms/BotonSubmit';
import { validarObligatorio, validarEmail } from '../utils/validaciones';
import { useTituloPagina } from '../hooks/useTituloPagina';

const VACIO = { nombre: '', email: '', mensaje: '' };

function Contacto() {
  useTituloPagina('Contacto');

  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value });

  const manejarSubmit = (e) => {
    e.preventDefault();

    const nuevos = {
      nombre: validarObligatorio(datos.nombre, 'El nombre'),
      email: validarEmail(datos.email),
      mensaje: validarObligatorio(datos.mensaje, 'El mensaje'),
    };
    setErrores(nuevos);
    if (!Object.values(nuevos).every((m) => m === '')) {
      setEnviado(false);
      return;
    }

    setEnviado(true);
    setDatos(VACIO);
  };

  return (
    <PlantillaPublica>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-0 p-3">
            <Card.Body>
              <h1 className="h3 text-primary fw-bold mb-4">Contacto</h1>
              {enviado && (
                <div className="alert alert-success">
                  Mensaje enviado. Te responderemos pronto.
                </div>
              )}
              <Form noValidate onSubmit={manejarSubmit}>
                <InputTexto
                  id="contacto-nombre"
                  label="Nombre"
                  value={datos.nombre}
                  onChange={cambiar('nombre')}
                  error={errores.nombre}
                />
                <InputTexto
                  id="contacto-email"
                  label="Correo"
                  type="email"
                  value={datos.email}
                  onChange={cambiar('email')}
                  error={errores.email}
                />
                <InputTexto
                  id="contacto-mensaje"
                  label="Mensaje"
                  value={datos.mensaje}
                  onChange={cambiar('mensaje')}
                  error={errores.mensaje}
                />
                <BotonSubmit texto="Enviar mensaje" variante="primary" />
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </PlantillaPublica>
  );
}

export default Contacto;