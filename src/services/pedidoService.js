const CLAVE = 'pedidos';

export const ESTADOS = ['En preparación', 'Despachado', 'Entregado'];

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  return guardado === null ? [] : JSON.parse(guardado);
}

export function listarPedidos() {
  return leer();
}

export function obtenerPedido(id) {
  return leer().find((p) => p.id === id) ?? null;
}

export function crearPedido({ cliente, items, total }) {
  const lista = leer();
  const id = Math.max(0, ...lista.map((p) => p.id)) + 1;
  const pedido = {
    id,
    cliente,
    items,
    total,
    estado: ESTADOS[0],
    fecha: new Date().toISOString(),
  };
  localStorage.setItem(CLAVE, JSON.stringify([...lista, pedido]));
  return pedido;
}

export function actualizarEstadoPedido(id, estado) {
  const lista = leer().map((p) => (p.id === id ? { ...p, estado } : p));
  localStorage.setItem(CLAVE, JSON.stringify(lista));
  return lista.find((p) => p.id === id) ?? null;
}