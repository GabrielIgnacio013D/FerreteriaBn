import PlantillaPublica from '../components/templates/PlantillaPublica';
import ListaProductos from '../components/organisms/ListaProductos';
import { useProductos } from '../context/ProductosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { filtrarOfertas } from '../utils/ofertas';

function Ofertas() {
  const { productos } = useProductos();
  useTituloPagina('Ofertas');

  return (
    <PlantillaPublica>
      <h1 className="h2 text-primary fw-bold mb-4">Ofertas</h1>
      <ListaProductos productos={filtrarOfertas(productos)} />
    </PlantillaPublica>
  );
}

export default Ofertas;