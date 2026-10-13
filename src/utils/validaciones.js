export function validarEmail(email) {
  if (email.trim() === '') return 'El correo es obligatorio';
  const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formato.test(email)) return 'Ingresa un correo válido';
  return '';
}

export function validarClave(clave) {
  if (clave.trim() === '') return 'La contraseña es obligatoria';
  if (clave.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
  return '';
}