import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TarjetaLogin from '../components/organisms/TarjetaLogin';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(email);
    }
  };

  return (
    <main className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4}>
            <TarjetaLogin
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={manejarSubmit}
            />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Login;