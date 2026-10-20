import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import InputTexto from '../atoms/InputTexto';
import BotonSubmit from '../atoms/BotonSubmit';
import { validarObligatorio, validarNumero } from '../../utils/validaciones';

const VACIO = { nombre: '', descripcion: '', categoria: '', precio: '', stock: '' };

function FormularioProducto({ producto, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(
    producto
      ? {
          nombre: producto.nombre,
          descripcion: producto.descripcion ?? '',
          categoria: producto.categoria,
          precio: String(producto.precio),
          stock: String(producto.stock),
        }
      : VACIO
  );
  const [errores, setErrores] = useState({});

  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value });

  const manejarSubmit = (e) => {
    e.preventDefault();

    const nuevos = {
      nombre: validarObligatorio(datos.nombre, 'El nombre'),
      categoria: validarObligatorio(datos.categoria, 'La categoría'),
      precio: validarNumero(datos.precio, 1, 'El precio'),
      stock: validarNumero(datos.stock, 0, 'El stock'),
    };
    setErrores(nuevos);

    if (Object.values(nuevos).every((mensaje) => mensaje === '')) {
      onGuardar({
        nombre: datos.nombre.trim(),
        descripcion: datos.descripcion.trim(),
        categoria: datos.categoria.trim(),
        precio: Number(datos.precio),
        stock: Number(datos.stock),
      });
    }
  };

  return (
    <Form noValidate onSubmit={manejarSubmit}>
      <InputTexto
        id="producto-nombre"
        label="Nombre"
        value={datos.nombre}
        onChange={cambiar('nombre')}
        error={errores.nombre}
      />
      <InputTexto
        id="producto-descripcion"
        label="Descripción"
        value={datos.descripcion}
        onChange={cambiar('descripcion')}
      />
      <InputTexto
        id="producto-categoria"
        label="Categoría"
        value={datos.categoria}
        onChange={cambiar('categoria')}
        error={errores.categoria}
      />
      <Row>
        <Col md={6}>
          <InputTexto
            id="producto-precio"
            label="Precio"
            type="number"
            value={datos.precio}
            onChange={cambiar('precio')}
            error={errores.precio}
          />
        </Col>
        <Col md={6}>
          <InputTexto
            id="producto-stock"
            label="Stock"
            type="number"
            value={datos.stock}
            onChange={cambiar('stock')}
            error={errores.stock}
          />
        </Col>
      </Row>

      <BotonSubmit texto="Guardar" variante="success" />
      <Button variant="outline-secondary" className="w-100 mt-2" onClick={onCancelar}>
        Cancelar
      </Button>
    </Form>
  );
}

export default FormularioProducto;