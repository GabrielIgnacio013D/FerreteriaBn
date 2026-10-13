import { Card } from 'react-bootstrap';
import FormularioLogin from '../molecules/FormularioLogin';

function TarjetaLogin({ onEnviar }) {
  return (
    <Card as="article" className="shadow-sm p-4 border-0">
      <Card.Body>
        <header className="text-center mb-4">
          <h1 className="h3 text-primary fw-bold">Iniciar Sesión</h1>
        </header>
        <FormularioLogin onEnviar={onEnviar} />
      </Card.Body>
    </Card>
  );
}

export default TarjetaLogin;