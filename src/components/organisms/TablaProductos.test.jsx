import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TablaProductos from './TablaProductos'

const productos = [
  { id: 1, nombre: 'Martillo', categoria: 'Herramientas', precio: 15990, stock: 12 },
  { id: 2, nombre: 'Taladro', categoria: 'Herramientas', precio: 50000, stock: 3 },
]

describe('TablaProductos', () => {
  it('muestra una fila por cada producto', () => {
    render(<TablaProductos productos={productos} onEditar={vi.fn()} onEliminar={vi.fn()} />)
    expect(screen.getByText('Martillo')).toBeInTheDocument()
    expect(screen.getByText('Taladro')).toBeInTheDocument()
  })

  it('muestra un aviso si no hay productos', () => {
    render(<TablaProductos productos={[]} onEditar={vi.fn()} onEliminar={vi.fn()} />)
    expect(screen.getByText('No hay productos registrados.')).toBeInTheDocument()
  })

  it('llama a onEditar con el producto al presionar Editar', async () => {
    const onEditar = vi.fn()
    render(<TablaProductos productos={productos} onEditar={onEditar} onEliminar={vi.fn()} />)
    await userEvent.click(screen.getAllByRole('button', { name: 'Editar' })[0])
    expect(onEditar).toHaveBeenCalledWith(productos[0])
  })

  it('llama a onEliminar con el id al presionar Eliminar', async () => {
    const onEliminar = vi.fn()
    render(<TablaProductos productos={productos} onEditar={vi.fn()} onEliminar={onEliminar} />)
    await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[1])
    expect(onEliminar).toHaveBeenCalledWith(2)
  })
})