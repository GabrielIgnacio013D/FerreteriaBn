import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BarraNavegacion from '../organisms/BarraNavegacion';
import { useCarrito } from '../../context/CarritoContext';

function PlantillaPublica({ children }) {
  const navigate = useNavigate();
  const { cantidadTotal } = useCarrito();

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <BarraNavegacion cantidadCarrito={cantidadTotal} onNavegar={navigate} />
      <main className="flex-grow-1 py-4">
        <Container>{children}</Container>
      </main>
      <footer className="bg-dark text-white-50 text-center py-3 small">
        © 2026 Ferretería BN · Desarrollo Fullstack II
      </footer>
    </div>
  );
}

export default PlantillaPublica;