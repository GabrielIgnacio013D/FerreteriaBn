import { describe, it, expect, beforeEach } from 'vitest'
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from './productoService'

describe('productoService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('lista los productos de partida', () => {
    const lista = listarProductos()
    expect(Array.isArray(lista)).toBe(true)
    expect(lista.length).toBeGreaterThan(0)
  })

  it('crea un producto nuevo con id', () => {
    const antes = listarProductos().length
    const nuevo = crearProducto({ nombre: 'Taladro', precio: 50000, categoria: 'Herramientas', stock: 3 })
    expect(nuevo.id).toBeDefined()
    expect(listarProductos().length).toBe(antes + 1)
  })

  it('actualiza solo los campos indicados', () => {
    const primero = listarProductos()[0]
    const actualizado = actualizarProducto(primero.id, { stock: 999 })
    expect(actualizado.stock).toBe(999)
    expect(actualizado.nombre).toBe(primero.nombre)
  })

  it('elimina un producto', () => {
    const primero = listarProductos()[0]
    eliminarProducto(primero.id)
    const ids = listarProductos().map((p) => p.id)
    expect(ids).not.toContain(primero.id)
  })

    it('guarda los cambios en localStorage', () => {
    crearProducto({ nombre: 'Sierra', precio: 20000, categoria: 'Herramientas', stock: 1 })
    const todo = Object.keys(localStorage)
      .map((clave) => localStorage.getItem(clave))
      .join('')
    expect(todo).toContain('Sierra')
  
  })
})