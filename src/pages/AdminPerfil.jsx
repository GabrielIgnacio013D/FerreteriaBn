import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import { buscarUsuarioPorEmail } from '../services/usuarioService';
import { useTituloPagina } from '../hooks/useTituloPagina';

function AdminPerfil() {
  const navigate = useNavigate();
  useTituloPagina('Perfil');

  const email = localStorage.getItem('usuario');
  const usuario = email ? buscarUsuarioPorEmail(email) : null;

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <PlantillaAdmin titulo="Perfil">
      <Card className="shadow-sm border-0" style={{ maxWidth: 480 }}>
        <Card.Body>
          <p className="mb-1"><strong>Correo:</strong> {email ?? 'Sin sesión iniciada'}</p>
          <p className="mb-1"><strong>Nombre:</strong> {usuario?.nombre ?? 'No registrado'}</p>
          <p className="mb-3"><strong>Rol:</strong> {usuario?.rol ?? 'Sin rol'}</p>
          <Button variant="outline-danger" onClick={cerrarSesion}>
            Cerrar sesión
          </Button>
        </Card.Body>
      </Card>
    </PlantillaAdmin>
  );
}

export default AdminPerfil;