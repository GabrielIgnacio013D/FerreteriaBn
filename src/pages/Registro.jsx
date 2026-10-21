import { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import InputTexto from '../components/atoms/InputTexto';
import BotonSubmit from '../components/atoms/BotonSubmit';
import { buscarUsuarioPorEmail, crearUsuario } from '../services/usuarioService';
import {
  validarObligatorio,
  validarEmail,
  validarClave,
  validarConfirmacion,
} from '../utils/validaciones';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Registro() {
  const navigate = useNavigate();
  useTituloPagina('Crear cuenta');

  const [datos, setDatos] = useState({ nombre: '', email: '', clave: '', confirmar: '' });
  const [errores, setErrores] = useState({});

  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value });

  const manejarSubmit = (e) => {
    e.preventDefault();

    const nuevos = {
      nombre: validarObligatorio(datos.nombre, 'El nombre'),
      email: validarEmail(datos.email),
      clave: validarClave(datos.clave),
      confirmar: validarConfirmacion(datos.clave, datos.confirmar),
    };
    if (nuevos.email === '' && buscarUsuarioPorEmail(datos.email)) {
      nuevos.email = 'Ese correo ya está registrado';
    }
    setErrores(nuevos);
    if (!Object.values(nuevos).every((m) => m === '')) return;

    crearUsuario({ nombre: datos.nombre.trim(), email: datos.email.trim(), clave: datos.clave });
    localStorage.setItem('usuario', datos.email.trim());
    navigate('/menu');
  };

  return (
    <PlantillaPublica>
      <Row className="justify-content-center">
        <Col md={8} lg={5}>
          <Card className="shadow-sm border-0 p-3">
            <Card.Body>
              <h1 className="h3 text-primary fw-bold mb-4 text-center">Crear cuenta</h1>
              <Form noValidate onSubmit={manejarSubmit}>
                <InputTexto
                  id="registro-nombre"
                  label="Nombre"
                  value={datos.nombre}
                  onChange={cambiar('nombre')}
                  error={errores.nombre}
                />
                <InputTexto
                  id="registro-email"
                  label="Correo"
                  type="email"
                  value={datos.email}
                  onChange={cambiar('email')}
                  error={errores.email}
                />
                <InputTexto
                  id="registro-clave"
                  label="Contraseña"
                  type="password"
                  value={datos.clave}
                  onChange={cambiar('clave')}
                  error={errores.clave}
                />
                <InputTexto
                  id="registro-confirmar"
                  label="Confirmar contraseña"
                  type="password"
                  value={datos.confirmar}
                  onChange={cambiar('confirmar')}
                  error={errores.confirmar}
                />
                <BotonSubmit texto="Crear cuenta" variante="success" />
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </PlantillaPublica>
  );
}

export default Registro;