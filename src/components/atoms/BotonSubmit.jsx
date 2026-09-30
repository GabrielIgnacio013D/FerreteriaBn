import { Button } from 'react-bootstrap';

function BotonSubmit({ texto, variante = "primary" }) {
  return (
    <Button variant={variante} type="submit" className="w-100 mt-2">
      {texto}
    </Button>
  );
}

export default BotonSubmit;