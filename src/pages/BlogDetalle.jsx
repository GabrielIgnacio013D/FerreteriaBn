import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { entradas } from '../data/blog';
import { useTituloPagina } from '../hooks/useTituloPagina';

function BlogDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const entrada = entradas.find((e) => e.id === Number(id));
  useTituloPagina(entrada ? entrada.titulo : 'Entrada no encontrada');

  return (
    <PlantillaPublica>
      {entrada ? (
        <article>
          <small className="text-muted">{entrada.fecha}</small>
          <h1 className="h2 text-primary fw-bold">{entrada.titulo}</h1>
          <p className="mt-3">{entrada.contenido}</p>
        </article>
      ) : (
        <div className="alert alert-warning">Entrada no encontrada.</div>
      )}
      <Button variant="outline-primary" onClick={() => navigate('/blog')}>
        ← Volver al blog
      </Button>
    </PlantillaPublica>
  );
}

export default BlogDetalle;