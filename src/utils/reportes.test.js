import { describe, it, expect } from 'vitest'
import {
  productosCriticos,
  ventasTotales,
  productosMasVendidos,
  resumenPorCategoria,
  pedidosDeUsuario,
} from './reportes'

const pedidos = [
  {
    id: 1,
    total: 3000,
    cliente: { email: 'a@correo.cl' },
    items: [
      { nombre: 'Martillo', cantidad: 2 },
      { nombre: 'Taladro', cantidad: 1 },
    ],
  },
  {
    id: 2,
    total: 1000,
    cliente: { email: 'B@correo.cl' },
    items: [{ nombre: 'Martillo', cantidad: 1 }],
  },
]

describe('reportes', () => {
  it('detecta productos críticos (stock menor o igual a 5)', () => {
    const productos = [
      { id: 1, stock: 2 },
      { id: 2, stock: 5 },
      { id: 3, stock: 6 },
    ]
    expect(productosCriticos(productos).map((p) => p.id)).toEqual([1, 2])
  })

  it('suma las ventas totales', () => {
    expect(ventasTotales(pedidos)).toBe(4000)
  })

  it('devuelve 0 de ventas si no hay pedidos', () => {
    expect(ventasTotales([])).toBe(0)
  })

  it('ordena los productos más vendidos', () => {
    const lista = productosMasVendidos(pedidos)
    expect(lista[0]).toEqual({ nombre: 'Martillo', cantidad: 3 })
    expect(lista[1]).toEqual({ nombre: 'Taladro', cantidad: 1 })
  })

  it('resume productos y stock por categoría', () => {
    const productos = [
      { categoria: 'A', stock: 2 },
      { categoria: 'A', stock: 3 },
      { categoria: 'B', stock: 1 },
    ]
    const resumen = resumenPorCategoria(productos)
    expect(resumen.find((r) => r.categoria === 'A')).toEqual({ categoria: 'A', productos: 2, stock: 5 })
  })

  it('filtra los pedidos de un usuario sin distinguir mayúsculas', () => {
    const lista = pedidosDeUsuario(pedidos, 'b@correo.cl')
    expect(lista.length).toBe(1)
    expect(lista[0].id).toBe(2)
  })
})