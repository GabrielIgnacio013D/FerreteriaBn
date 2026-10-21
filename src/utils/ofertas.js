export function filtrarOfertas(productos) {
  return productos.filter((p) => p.oferta === true);
}