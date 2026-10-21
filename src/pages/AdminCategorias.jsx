import { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import InputTexto from '../components/atoms/InputTexto';
import BotonSubmit from '../components/atoms/BotonSubmit';
import { useProductos } from '../context/ProductosContext';
import { resumenPorCategoria } from '../utils/reportes';
import { validarObligatorio } from '../utils/validaciones';
import { useTituloPagina } from '../hooks/useTituloPagina';

function AdminCategorias() {
  const { productos, actualizar } = useProductos();
  useTituloPagina('Categorías (admin)');

  const [editando, setEditando] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const resumen = resumenPorCategoria(productos);

  const empezar = (categoria) => {
    setEditando(categoria);
    setNuevoNombre(categoria);
    setError('');
    setMensaje('');
  };

  const guardar = (e) => {
    e.preventDefault();
    const mensajeError = validarObligatorio(nuevoNombre, 'El nombre');
    setError(mensajeError);
    if (mensajeError) return;

    productos
      .filter((p) => p.categoria === editando)
      .forEach((p) => actualizar(p.id, { categoria: nuevoNombre.trim() }));
    setMensaje(`Categoría renombrada a "${nuevoNombre.trim()}".`);
    setEditando(null);
  };

  return (
    <PlantillaAdmin titulo="Categorías">
      <p className="text-muted">
        Para crear una categoría nueva, crea un producto con ese nombre de categoría.
      </p>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      <div className="table-responsive">
        <Table hover className="align-middle bg-white shadow-sm">
          <thead>
            <tr><th>Categoría</th><th>Productos</th><th>Stock total</th><th></th></tr>
          </thead>
          <tbody>
            {resumen.map((r) => (
              <tr key={r.categoria}>
                <td>{r.categoria}</td>
                <td>{r.productos}</td>
                <td>{r.stock}</td>
                <td className="text-end">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    aria-label={`Renombrar ${r.categoria}`}
                    onClick={() => empezar(r.categoria)}
                  >
                    Renombrar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {editando && (
        <div className="bg-white shadow-sm rounded p-4 mt-3" style={{ maxWidth: 420 }}>
          <h2 className="h5 mb-3">Renombrar "{editando}"</h2>
          <Form noValidate onSubmit={guardar}>
            <InputTexto
              id="categoria-nombre"
              label="Nuevo nombre"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              error={error}
            />
            <BotonSubmit texto="Guardar" variante="success" />
            <Button variant="outline-secondary" className="w-100 mt-2" onClick={() => setEditando(null)}>
              Cancelar
            </Button>
          </Form>
        </div>
      )}
    </PlantillaAdmin>
  );
}

export default AdminCategorias;