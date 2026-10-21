import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ProductosProvider } from '../context/ProductosContext'
import { crearProducto } from '../services/productoService'
import AdminCriticos from './AdminCriticos'

function montar() {
  render(
    <MemoryRouter>
      <ProductosProvider>
        <AdminCriticos />
      </ProductosProvider>
    </MemoryRouter>
  )
}

describe('AdminCriticos (página)', () => {
  beforeEach(() => {
    localStorage.clear()
    crearProducto({
      nombre: 'Producto crítico XYZ',
      descripcion: '',
      categoria: 'Pruebas',
      precio: 1000,
      stock: 0,
    })
  })

  it('lista los productos con poco stock', () => {
    montar()
    expect(screen.getByText('Producto crítico XYZ')).toBeInTheDocument()
  })

  it('al reponer, el producto sale de la lista de críticos', async () => {
    montar()
    await userEvent.click(screen.getByRole('button', { name: 'Reponer Producto crítico XYZ' }))
    expect(screen.queryByText('Producto crítico XYZ')).not.toBeInTheDocument()
  })
})