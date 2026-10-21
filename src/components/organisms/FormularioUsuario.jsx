import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import InputTexto from '../atoms/InputTexto';
import BotonSubmit from '../atoms/BotonSubmit';
import { validarObligatorio, validarEmail, validarClave } from '../../utils/validaciones';

function FormularioUsuario({ usuario, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(
    usuario
      ? { nombre: usuario.nombre, email: usuario.email, clave: '', rol: usuario.rol }
      : { nombre: '', email: '', clave: '', rol: 'cliente' }
  );
  const [errores, setErrores] = useState({});

  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value });

  const manejarSubmit = (e) => {
    e.preventDefault();

    const nuevos = {
      nombre: validarObligatorio(datos.nombre, 'El nombre'),
      email: validarEmail(datos.email),
      // al editar, dejar la clave vacía significa "no cambiarla"
      clave: usuario && datos.clave === '' ? '' : validarClave(datos.clave),
    };
    setErrores(nuevos);

    if (Object.values(nuevos).every((m) => m === '')) {
      onGuardar({
        nombre: datos.nombre.trim(),
        email: datos.email.trim(),
        clave: datos.clave,
        rol: datos.rol,
      });
    }
  };

  return (
    <Form noValidate onSubmit={manejarSubmit}>
      <InputTexto
        id="usuario-nombre"
        label="Nombre"
        value={datos.nombre}
        onChange={cambiar('nombre')}
        error={errores.nombre}
      />
      <InputTexto
        id="usuario-email"
        label="Correo"
        type="email"
        value={datos.email}
        onChange={cambiar('email')}
        error={errores.email}
      />
      <InputTexto
        id="usuario-clave"
        label={usuario ? 'Nueva contraseña (opcional)' : 'Contraseña'}
        type="password"
        value={datos.clave}
        onChange={cambiar('clave')}
        error={errores.clave}
      />
      <Form.Group controlId="usuario-rol" className="mb-3">
        <Form.Label>Rol</Form.Label>
        <Form.Select value={datos.rol} onChange={cambiar('rol')}>
          <option value="cliente">Cliente</option>
          <option value="admin">Administrador</option>
        </Form.Select>
      </Form.Group>

      <BotonSubmit texto="Guardar" variante="success" />
      <Button variant="outline-secondary" className="w-100 mt-2" onClick={onCancelar}>
        Cancelar
      </Button>
    </Form>
  );
}

export default FormularioUsuario;