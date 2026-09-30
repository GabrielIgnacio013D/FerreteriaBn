import { Form } from 'react-bootstrap';
import InputTexto from '../atoms/InputTexto';
import BotonSubmit from '../atoms/BotonSubmit';

function FormularioLogin({ email, setEmail, password, setPassword, onSubmit }) {
  return (
    <Form onSubmit={onSubmit}>
      <InputTexto
        id="correo-login"
        label="Correo Electrónico"
        type="email"
        placeholder="ejemplo@correo.cl"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputTexto
        id="password-login"
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <BotonSubmit texto="Iniciar Sesión" variante="primary" />
    </Form>
  );
}

export default FormularioLogin;