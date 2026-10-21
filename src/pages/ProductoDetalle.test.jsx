import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ProductosProvider } from '../context/ProductosContext'
import { CarritoProvider } from '../context/CarritoContext'
import { listarProductos } from '../services/productoService'
import ProductoDetalle from './ProductoDetalle'

function montar(ruta) {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <ProductosProvider>
        <CarritoProvider>
          <Routes>
            <Route path="/productos/:id" element={<ProductoDetalle />} />
          </Routes>
        </CarritoProvider>
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

  it('agrega el producto al carrito y lo guarda', async () => {
    const primero = listarProductos()[0]
    montar(`/productos/${primero.id}`)
    await userEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }))

    expect(screen.getByText(/Producto agregado al carrito/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('carrito'))[0].id).toBe(primero.id)
  })
})