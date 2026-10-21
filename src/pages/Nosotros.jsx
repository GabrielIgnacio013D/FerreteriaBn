import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Nosotros() {
  useTituloPagina('Nosotros');

  return (
    <PlantillaPublica>
      <h1 className="h2 text-primary fw-bold mb-4">Nosotros</h1>
      <p className="lead">
        Ferretería BN es un negocio dedicado a entregar herramientas y materiales de construcción
        con buen precio y atención cercana.
      </p>
      <h2 className="h4 mt-4">Nuestra misión</h2>
      <p>
        Que cada persona encuentre lo que necesita para su obra o su hogar, con stock real y
        despacho o retiro en tienda.
      </p>
      <h2 className="h4 mt-4">Qué ofrecemos</h2>
      <ul>
        <li>Herramientas manuales y eléctricas.</li>
        <li>Materiales de construcción y ferretería general.</li>
        <li>Asesoría para elegir el producto correcto.</li>
      </ul>
    </PlantillaPublica>
  );
}

export default Nosotros;