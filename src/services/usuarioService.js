const CLAVE = 'usuarios';

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  return guardado === null ? [] : JSON.parse(guardado);
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function listarUsuarios() {
  return leer();
}

export function obtenerUsuario(id) {
  return leer().find((u) => u.id === id) ?? null;
}

export function buscarUsuarioPorEmail(email) {
  return leer().find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function crearUsuario({ nombre, email, clave, rol = 'cliente' }) {
  const lista = leer();
  const id = Math.max(0, ...lista.map((u) => u.id)) + 1;
  const usuario = { id, nombre, email, clave, rol };
  guardar([...lista, usuario]);
  return usuario;
}

export function actualizarUsuario(id, cambios) {
  const lista = leer().map((u) => (u.id === id ? { ...u, ...cambios } : u));
  guardar(lista);
  return lista.find((u) => u.id === id) ?? null;
}

export function eliminarUsuario(id) {
  guardar(leer().filter((u) => u.id !== id));
}