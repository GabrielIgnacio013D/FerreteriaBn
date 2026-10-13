import { useState } from 'react';
import { Form } from 'react-bootstrap';
import InputTexto from '../atoms/InputTexto';
import BotonSubmit from '../atoms/BotonSubmit';
import { validarEmail, validarClave } from '../../utils/validaciones';

function FormularioLogin({ onEnviar }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState({ email: '', password: '' });

  const manejarSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {
      email: validarEmail(email),
      password: validarClave(password),
    };
    setErrores(nuevosErrores);

    if (nuevosErrores.email === '' && nuevosErrores.password === '') {
      onEnviar({ email });
    }
  };

  return (
    <Form noValidate onSubmit={manejarSubmit}>
      <InputTexto
        id="correo-login"
        label="Correo Electrónico"
        type="email"
        placeholder="ejemplo@correo.cl"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errores.email}
      />

      <InputTexto
        id="password-login"
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errores.password}
      />

      <BotonSubmit texto="Iniciar Sesión" variante="primary" />
    </Form>
  );
}

export default FormularioLogin;