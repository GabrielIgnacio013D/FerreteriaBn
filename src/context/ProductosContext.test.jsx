import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ProductosProvider, useProductos } from './ProductosContext'

const wrapper = ({ children }) => <ProductosProvider>{children}</ProductosProvider>

describe('ProductosContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('entrega la lista inicial de productos', () => {
    const { result } = renderHook(() => useProductos(), { wrapper })
    expect(result.current.productos.length).toBeGreaterThan(0)
  })

  it('crear agrega un producto a la lista', () => {
    const { result } = renderHook(() => useProductos(), { wrapper })
    const antes = result.current.productos.length
    act(() => {
      result.current.crear({ nombre: 'Llave', precio: 5000, categoria: 'Herramientas', stock: 4 })
    })
    expect(result.current.productos.length).toBe(antes + 1)
  })

  it('actualizar cambia los datos de un producto', () => {
    const { result } = renderHook(() => useProductos(), { wrapper })
    const id = result.current.productos[0].id
    act(() => {
      result.current.actualizar(id, { stock: 777 })
    })
    expect(result.current.productos.find((p) => p.id === id).stock).toBe(777)
  })

  it('eliminar quita un producto de la lista', () => {
    const { result } = renderHook(() => useProductos(), { wrapper })
    const id = result.current.productos[0].id
    act(() => {
      result.current.eliminar(id)
    })
    expect(result.current.productos.some((p) => p.id === id)).toBe(false)
  })

  it('lanza error si se usa fuera del provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useProductos())).toThrow()
  })
})