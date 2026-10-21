import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CarritoProvider } from '../context/CarritoContext'
import Carrito from './Carrito'

function montar() {
  render(
    <MemoryRouter>
      <CarritoProvider>
        <Carrito />
      </CarritoProvider>
    </MemoryRouter>
  )
}

describe('Carrito (página)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('avisa cuando el carrito está vacío', () => {
    montar()
    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument()
  })

  it('muestra los productos guardados y permite aumentar la cantidad', async () => {
    localStorage.setItem(
      'carrito',
      JSON.stringify([{ id: 1, nombre: 'Martillo', precio: 1000, cantidad: 2 }])
    )
    montar()
    expect(screen.getByText('Martillo')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Aumentar Martillo' }))
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('quita un producto del carrito', async () => {
    localStorage.setItem(
      'carrito',
      JSON.stringify([{ id: 1, nombre: 'Martillo', precio: 1000, cantidad: 1 }])
    )
    montar()
    await userEvent.click(screen.getByRole('button', { name: 'Quitar Martillo' }))
    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument()
  })

  it('vacía todo el carrito', async () => {
    localStorage.setItem(
      'carrito',
      JSON.stringify([{ id: 1, nombre: 'Martillo', precio: 1000, cantidad: 1 }])
    )
    montar()
    await userEvent.click(screen.getByRole('button', { name: 'Vaciar carrito' }))
    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument()
  })
})