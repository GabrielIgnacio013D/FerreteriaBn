const CLAVE = 'carrito';

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  return guardado === null ? [] : JSON.parse(guardado);
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function listarCarrito() {
  return leer();
}

export function agregarAlCarrito(producto, cantidad = 1) {
  const lista = leer();
  const existe = lista.find((i) => i.id === producto.id);
  const nueva = existe
    ? lista.map((i) =>
        i.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i
      )
    : [
        ...lista,
        { id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad },
      ];
  guardar(nueva);
  return nueva;
}

export function cambiarCantidad(id, cantidad) {
  const nueva =
    cantidad <= 0
      ? leer().filter((i) => i.id !== id)
      : leer().map((i) => (i.id === id ? { ...i, cantidad } : i));
  guardar(nueva);
  return nueva;
}

export function quitarDelCarrito(id) {
  const nueva = leer().filter((i) => i.id !== id);
  guardar(nueva);
  return nueva;
}

export function vaciarCarrito() {
  guardar([]);
  return [];
}

export function calcularTotal(items) {
  return items.reduce((total, i) => total + i.precio * i.cantidad, 0);
}