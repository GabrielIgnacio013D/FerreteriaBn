import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TarjetaLogin from '../components/organisms/TarjetaLogin';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Login() {
  const navigate = useNavigate();
  useTituloPagina('Iniciar sesión');

  const manejarEnviar = ({ email }) => {
    localStorage.setItem('usuario', email);
    navigate('/menu');
  };

  return (
    <main className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4}>
            <TarjetaLogin onEnviar={manejarEnviar} />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Login;