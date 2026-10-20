import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import TablaProductos from '../components/organisms/TablaProductos';
import FormularioProducto from '../components/organisms/FormularioProducto';

function AdminProductos() {
  const { productos, crear, actualizar, eliminar } = useProductos();
  const navigate = useNavigate();
  useTituloPagina('Administrar productos');

  // null = formulario cerrado, 'nuevo' = creando, objeto producto = editando
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const guardar = (datos) => {
    if (editando === 'nuevo') {
      crear(datos);
      setMensaje('Producto creado correctamente.');
    } else {
      actualizar(editando.id, datos);
      setMensaje('Producto actualizado correctamente.');
    }
    setEditando(null);
  };

  const borrar = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
      eliminar(id);
      setMensaje('Producto eliminado correctamente.');
    }
  };

  return (
    <main className="bg-light min-vh-100 py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 text-primary fw-bold mb-0">Administrar productos</h1>
          <div>
            <Button variant="outline-primary" className="me-2" onClick={() => navigate('/menu')}>
              ← Menú
            </Button>
            <Button variant="success" onClick={() => { setMensaje(''); setEditando('nuevo'); }}>
              + Nuevo producto
            </Button>
          </div>
        </div>

        {mensaje && <div className="alert alert-success">{mensaje}</div>}

        <Row className="g-4">
          <Col lg={editando ? 8 : 12}>
            <TablaProductos
              productos={productos}
              onEditar={(p) => { setMensaje(''); setEditando(p); }}
              onEliminar={borrar}
            />
          </Col>

          {editando && (
            <Col lg={4}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h2 className="h5 mb-3">
                    {editando === 'nuevo' ? 'Nuevo producto' : 'Editar producto'}
                  </h2>
                  <FormularioProducto
                    key={editando === 'nuevo' ? 'nuevo' : editando.id}
                    producto={editando === 'nuevo' ? null : editando}
                    onGuardar={guardar}
                    onCancelar={() => setEditando(null)}
                  />
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </main>
  );
}

export default AdminProductos;