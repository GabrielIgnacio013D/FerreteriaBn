import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ProductosProvider } from '../context/ProductosContext'
import Categorias from './Categorias'

const navegar = vi.hoisted(() => vi.fn())

vi.mock('react-router-dom', async (importOriginal) => {
  const real = await importOriginal()
  return { ...real, useNavigate: () => navegar }
})

function montar() {
  render(
    <MemoryRouter>
      <ProductosProvider>
        <Categorias />
      </ProductosProvider>
    </MemoryRouter>
  )
}

describe('Categorias (página)', () => {
  beforeEach(() => {
    localStorage.clear()
    navegar.mockClear()
  })

  it('muestra el título y al menos una categoría', () => {
    montar()
    expect(screen.getByRole('heading', { name: 'Categorías' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Ver productos' }).length).toBeGreaterThan(0)
  })

  it('navega a /productos enviando la categoría elegida', async () => {
    montar()
    await userEvent.click(screen.getAllByRole('button', { name: 'Ver productos' })[0])

    expect(navegar).toHaveBeenCalledWith(
      '/productos',
      expect.objectContaining({ state: expect.objectContaining({ categoria: expect.any(String) }) })
    )
  })
})