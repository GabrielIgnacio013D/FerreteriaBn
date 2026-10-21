import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ProductosProvider } from '../context/ProductosContext'
import { listarProductos } from '../services/productoService'
import ProductoDetalle from './ProductoDetalle'

function montar(ruta) {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <ProductosProvider>
        <Routes>
          <Route path="/productos/:id" element={<ProductoDetalle />} />
        </Routes>
      </ProductosProvider>
    </MemoryRouter>
  )
}

describe('ProductoDetalle (página)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('muestra el nombre del producto de la ruta', () => {
    const primero = listarProductos()[0]
    montar(`/productos/${primero.id}`)
    expect(screen.getByRole('heading', { name: primero.nombre })).toBeInTheDocument()
  })

  it('cambia el título de la pestaña con el hook useTituloPagina', () => {
    const primero = listarProductos()[0]
    montar(`/productos/${primero.id}`)
    expect(document.title).toBe(`${primero.nombre} | Ferretería BN`)
  })

  it('avisa cuando el producto no existe', () => {
    montar('/productos/99999')
    expect(screen.getByText('Producto no encontrado.')).toBeInTheDocument()
  })
})