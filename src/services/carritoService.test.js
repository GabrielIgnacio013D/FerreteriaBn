import { describe, it, expect, beforeEach } from 'vitest'
import {
  listarCarrito,
  agregarAlCarrito,
  cambiarCantidad,
  quitarDelCarrito,
  vaciarCarrito,
  calcularTotal,
} from './carritoService'

const martillo = { id: 1, nombre: 'Martillo', precio: 1000, stock: 10 }
const taladro = { id: 2, nombre: 'Taladro', precio: 5000, stock: 5 }

describe('carritoService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('parte vacío', () => {
    expect(listarCarrito()).toEqual([])
  })

  it('agrega un producto nuevo con cantidad 1', () => {
    agregarAlCarrito(martillo)
    expect(listarCarrito()).toEqual([{ id: 1, nombre: 'Martillo', precio: 1000, cantidad: 1 }])
  })

  it('suma la cantidad si el producto ya estaba', () => {
    agregarAlCarrito(martillo)
    agregarAlCarrito(martillo)
    expect(listarCarrito().length).toBe(1)
    expect(listarCarrito()[0].cantidad).toBe(2)
  })

  it('cambia la cantidad de un producto', () => {
    agregarAlCarrito(martillo)
    cambiarCantidad(1, 5)
    expect(listarCarrito()[0].cantidad).toBe(5)
  })

  it('quita el producto si la cantidad llega a 0', () => {
    agregarAlCarrito(martillo)
    cambiarCantidad(1, 0)
    expect(listarCarrito()).toEqual([])
  })

  it('quita un producto sin tocar los demás', () => {
    agregarAlCarrito(martillo)
    agregarAlCarrito(taladro)
    quitarDelCarrito(1)
    expect(listarCarrito().map((i) => i.id)).toEqual([2])
  })

  it('vacía el carrito', () => {
    agregarAlCarrito(martillo)
    vaciarCarrito()
    expect(listarCarrito()).toEqual([])
  })

  it('calcula el total sumando precio por cantidad', () => {
    const items = [
      { precio: 1000, cantidad: 2 },
      { precio: 5000, cantidad: 1 },
    ]
    expect(calcularTotal(items)).toBe(7000)
  })

  it('guarda los cambios en localStorage', () => {
    agregarAlCarrito(martillo)
    expect(JSON.parse(localStorage.getItem('carrito'))[0].nombre).toBe('Martillo')
  })
})