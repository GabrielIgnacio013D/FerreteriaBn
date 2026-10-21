import { createContext, useContext, useState } from 'react';
import * as carritoService from '../services/carritoService';

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => carritoService.listarCarrito());

  const agregar = (producto, cantidad = 1) =>
    setItems(carritoService.agregarAlCarrito(producto, cantidad));
  const cambiar = (id, cantidad) => setItems(carritoService.cambiarCantidad(id, cantidad));
  const quitar = (id) => setItems(carritoService.quitarDelCarrito(id));
  const vaciar = () => setItems(carritoService.vaciarCarrito());

  const total = carritoService.calcularTotal(items);
  const cantidadTotal = items.reduce((n, i) => n + i.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{ items, total, cantidadTotal, agregar, cambiar, quitar, vaciar }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
  }
  return contexto;
}