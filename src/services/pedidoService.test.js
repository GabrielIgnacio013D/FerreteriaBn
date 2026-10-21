import { describe, it, expect, beforeEach } from 'vitest'
import { crearPedido, obtenerPedido, listarPedidos } from './pedidoService'

const datos = {
  cliente: { nombre: 'Gabo', apellidos: 'Fuentes', email: 'gabo@correo.cl', direccion: 'Calle 1' },
  items: [{ id: 1, nombre: 'Martillo', precio: 1000, cantidad: 2 }],
  total: 2000,
}

describe('pedidoService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('crea un pedido con id 1 y estado inicial', () => {
    const pedido = crearPedido(datos)
    expect(pedido.id).toBe(1)
    expect(pedido.estado).toBe('En preparación')
  })

  it('asigna ids consecutivos', () => {
    crearPedido(datos)
    const segundo = crearPedido(datos)
    expect(segundo.id).toBe(2)
    expect(listarPedidos().length).toBe(2)
  })

  it('obtiene un pedido por su id', () => {
    const pedido = crearPedido(datos)
    expect(obtenerPedido(pedido.id).total).toBe(2000)
  })

  it('devuelve null si el pedido no existe', () => {
    expect(obtenerPedido(99)).toBeNull()
  })
})