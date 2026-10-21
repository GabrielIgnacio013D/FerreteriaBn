import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ProductosProvider } from '../context/ProductosContext'
import Productos from './Productos'

function montar() {
  render(
    <MemoryRouter>
      <ProductosProvider>
        <Productos />
      </ProductosProvider>
    </MemoryRouter>
  )
}

describe('Productos (página)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('muestra el catálogo con el buscador y el filtro', () => {
    montar()
    expect(screen.getByPlaceholderText('Escribe el nombre del producto...')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('muestra un aviso si la búsqueda no encuentra nada', async () => {
    montar()
    await userEvent.type(
      screen.getByPlaceholderText('Escribe el nombre del producto...'),
      'zzzzzzzz'
    )
    expect(screen.getByText('No hay productos disponibles.')).toBeInTheDocument()
    expect(screen.getByText('0 productos')).toBeInTheDocument()
  })
})