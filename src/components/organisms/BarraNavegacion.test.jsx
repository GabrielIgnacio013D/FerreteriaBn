import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BarraNavegacion from './BarraNavegacion'

describe('BarraNavegacion', () => {
  it('muestra los enlaces principales', () => {
    render(<BarraNavegacion cantidadCarrito={0} onNavegar={vi.fn()} />)
    expect(screen.getByRole('link', { name: 'Productos' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ofertas' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contacto' })).toBeInTheDocument()
  })

  it('avisa a qué ruta navegar al hacer clic en un enlace', async () => {
    const onNavegar = vi.fn()
    render(<BarraNavegacion cantidadCarrito={0} onNavegar={onNavegar} />)
    await userEvent.click(screen.getByRole('link', { name: 'Ofertas' }))
    expect(onNavegar).toHaveBeenCalledWith('/ofertas')
  })

  it('muestra la cantidad de productos del carrito', () => {
    render(<BarraNavegacion cantidadCarrito={3} onNavegar={vi.fn()} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})