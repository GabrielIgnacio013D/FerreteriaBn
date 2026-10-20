import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioProducto from './FormularioProducto'

describe('FormularioProducto', () => {
  it('muestra errores y no guarda si los campos están vacíos', async () => {
    const onGuardar = vi.fn()
    render(<FormularioProducto onGuardar={onGuardar} onCancelar={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
    expect(screen.getByText('El precio es obligatorio')).toBeInTheDocument()
    expect(onGuardar).not.toHaveBeenCalled()
  })

  it('guarda los datos convertidos cuando todo es válido', async () => {
    const onGuardar = vi.fn()
    render(<FormularioProducto onGuardar={onGuardar} onCancelar={vi.fn()} />)
    await userEvent.type(screen.getByLabelText('Nombre'), 'Martillo')
    await userEvent.type(screen.getByLabelText('Categoría'), 'Herramientas')
    await userEvent.type(screen.getByLabelText('Precio'), '15990')
    await userEvent.type(screen.getByLabelText('Stock'), '5')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(onGuardar).toHaveBeenCalledWith({
      nombre: 'Martillo',
      descripcion: '',
      categoria: 'Herramientas',
      precio: 15990,
      stock: 5,
    })
  })

  it('carga los datos del producto al editar', () => {
    const producto = { id: 1, nombre: 'Martillo', descripcion: 'De acero', categoria: 'Herramientas', precio: 15990, stock: 12 }
    render(<FormularioProducto producto={producto} onGuardar={vi.fn()} onCancelar={vi.fn()} />)
    expect(screen.getByLabelText('Nombre')).toHaveValue('Martillo')
    expect(screen.getByLabelText('Stock')).toHaveValue(12)
  })

  it('llama a onCancelar al presionar Cancelar', async () => {
    const onCancelar = vi.fn()
    render(<FormularioProducto onGuardar={vi.fn()} onCancelar={onCancelar} />)
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onCancelar).toHaveBeenCalled()
  })
})