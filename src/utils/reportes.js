export const UMBRAL_CRITICO = 5;

export function productosCriticos(productos, umbral = UMBRAL_CRITICO) {
  return productos.filter((p) => p.stock <= umbral);
}

export function ventasTotales(pedidos) {
  return pedidos.reduce((total, p) => total + p.total, 0);
}

export function productosMasVendidos(pedidos) {
  const conteo = {};
  pedidos.forEach((p) =>
    p.items.forEach((i) => {
      conteo[i.nombre] = (conteo[i.nombre] ?? 0) + i.cantidad;
    })
  );
  return Object.entries(conteo)
    .map(([nombre, cantidad]) => ({ nombre, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad);
}

export function resumenPorCategoria(productos) {
  const resumen = {};
  productos.forEach((p) => {
    if (!resumen[p.categoria]) {
      resumen[p.categoria] = { categoria: p.categoria, productos: 0, stock: 0 };
    }
    resumen[p.categoria].productos += 1;
    resumen[p.categoria].stock += p.stock;
  });
  return Object.values(resumen);
}

export function pedidosDeUsuario(pedidos, email) {
  return pedidos.filter(
    (p) => p.cliente?.email && p.cliente.email.toLowerCase() === email.toLowerCase()
  );
}