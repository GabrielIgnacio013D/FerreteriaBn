const CLAVE = 'usuarios';

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  return guardado === null ? [] : JSON.parse(guardado);
}

export function listarUsuarios() {
  return leer();
}

export function buscarUsuarioPorEmail(email) {
  return leer().find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function crearUsuario({ nombre, email, clave }) {
  const lista = leer();
  const id = Math.max(0, ...lista.map((u) => u.id)) + 1;
  const usuario = { id, nombre, email, clave, rol: 'cliente' };
  localStorage.setItem(CLAVE, JSON.stringify([...lista, usuario]));
  return usuario;
}