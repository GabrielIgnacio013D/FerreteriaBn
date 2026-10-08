import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TarjetaProducto from './TarjetaProducto'

const producto = {
  id: 1,
  nombre: 'Martillo',
  descripcion: 'Martillo de acero',
  categoria: 'Herramientas',
  precio: 15990,
  stock: 12,
}

describe('TarjetaProducto', () => {
  it('muestra nombre, categoría y stock', () => {
    render(<MemoryRouter><TarjetaProducto producto={producto} /></MemoryRouter>)
    expect(screen.getByText('Martillo')).toBeInTheDocument()
    expect(screen.getByText('Herramientas')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('muestra el precio con formato chileno', () => {
    render(<MemoryRouter><TarjetaProducto producto={producto} /></MemoryRouter>)
    expect(screen.getByText(/15\.990/)).toBeInTheDocument()
  })
})