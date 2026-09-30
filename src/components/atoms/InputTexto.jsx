import { Form } from 'react-bootstrap';

function InputTexto({ id, label, type = "text", placeholder, value, onChange }) {
  return (
    <Form.Group controlId={id} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </Form.Group>
  );
}

export default InputTexto;