import { useState } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import FormularioUsuario from '../components/organisms/FormularioUsuario';
import {
  listarUsuarios,
  buscarUsuarioPorEmail,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from '../services/usuarioService';
import { useTituloPagina } from '../hooks/useTituloPagina';

function AdminUsuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState(() => listarUsuarios());
  const [editando, setEditando] = useState(null); // null, 'nuevo' o un usuario
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  useTituloPagina('Usuarios');

  const refrescar = () => setUsuarios(listarUsuarios());

  const guardar = (datos) => {
    setError('');
    if (editando === 'nuevo') {
      if (buscarUsuarioPorEmail(datos.email)) {
        setError('Ese correo ya está registrado.');
        return;
      }
      crearUsuario(datos);
      setMensaje('Usuario creado correctamente.');
    } else {
      const { clave, ...resto } = datos;
      actualizarUsuario(editando.id, clave ? { ...resto, clave } : resto);
      setMensaje('Usuario actualizado correctamente.');
    }
    refrescar();
    setEditando(null);
  };

  const borrar = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este usuario?')) {
      eliminarUsuario(id);
      refrescar();
      setMensaje('Usuario eliminado correctamente.');
    }
  };

  return (
    <PlantillaAdmin titulo="Usuarios">
      <div className="mb-3">
        <Button variant="success" onClick={() => { setMensaje(''); setError(''); setEditando('nuevo'); }}>
          + Nuevo usuario
        </Button>
      </div>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <Row className="g-4">
        <Col lg={editando ? 8 : 12}>
          {usuarios.length === 0 ? (
            <div className="alert alert-info">No hay usuarios registrados.</div>
          ) : (
            <div className="table-responsive">
              <Table hover className="align-middle bg-white shadow-sm">
                <thead>
                  <tr><th>Nombre</th><th>Correo</th><th>Rol</th><th></th></tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.id}>
                      <td>{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>{u.rol}</td>
                      <td className="text-end text-nowrap">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-1"
                          onClick={() => navigate(`/admin/usuarios/${u.id}/historial`)}
                        >
                          Historial
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-1"
                          onClick={() => { setMensaje(''); setError(''); setEditando(u); }}
                        >
                          Editar
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => borrar(u.id)}>
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Col>

        {editando && (
          <Col lg={4}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h2 className="h5 mb-3">{editando === 'nuevo' ? 'Nuevo usuario' : 'Editar usuario'}</h2>
                <FormularioUsuario
                  key={editando === 'nuevo' ? 'nuevo' : editando.id}
                  usuario={editando === 'nuevo' ? null : editando}
                  onGuardar={guardar}
                  onCancelar={() => setEditando(null)}
                />
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </PlantillaAdmin>
  );
}

export default AdminUsuarios;