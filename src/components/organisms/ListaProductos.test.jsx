import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ListaProductos from './ListaProductos'

const productos = [
  { id: 1, nombre: 'Martillo', descripcion: 'a', categoria: 'Herramientas', precio: 1000, stock: 1 },
  { id: 2, nombre: 'Taladro', descripcion: 'b', categoria: 'Herramientas', precio: 2000, stock: 2 },
]

describe('ListaProductos', () => {
  it('muestra una tarjeta por cada producto', () => {
    render(<MemoryRouter><ListaProductos productos={productos} /></MemoryRouter>)
    expect(screen.getByText('Martillo')).toBeInTheDocument()
    expect(screen.getByText('Taladro')).toBeInTheDocument()
  })

  it('muestra un aviso si no hay productos', () => {
    render(<MemoryRouter><ListaProductos productos={[]} /></MemoryRouter>)
    expect(screen.getByText('No hay productos disponibles.')).toBeInTheDocument()
  })
})