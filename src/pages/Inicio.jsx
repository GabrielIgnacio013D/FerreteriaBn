import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import ListaProductos from '../components/organisms/ListaProductos';
import { useProductos } from '../context/ProductosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { filtrarOfertas } from '../utils/ofertas';

function Inicio() {
  const navigate = useNavigate();
  const { productos } = useProductos();
  useTituloPagina('Inicio');

  const categorias = [...new Set(productos.map((p) => p.categoria))];
  const ofertas = filtrarOfertas(productos).slice(0, 4);

  return (
    <PlantillaPublica>
      <section className="bg-white rounded-3 p-5 mb-4 shadow-sm text-center">
        <h1 className="display-5 fw-bold text-primary">Todo para tu obra y tu hogar</h1>
        <p className="lead text-muted">
          Herramientas y materiales de ferretería, con retiro en tienda o despacho.
        </p>
        <Button size="lg" onClick={() => navigate('/productos')}>
          Ver catálogo
        </Button>
      </section>

      <section className="mb-4">
        <h2 className="h4 mb-3">Categorías</h2>
        <div className="d-flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <Button
              key={cat}
              variant="outline-primary"
              onClick={() => navigate('/productos', { state: { categoria: cat } })}
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Ofertas destacadas</h2>
          <Button variant="link" onClick={() => navigate('/ofertas')}>
            Ver todas
          </Button>
        </div>
        <ListaProductos productos={ofertas} />
      </section>
    </PlantillaPublica>
  );
}

export default Inicio;