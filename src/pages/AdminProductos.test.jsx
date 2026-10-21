import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ProductosProvider } from '../context/ProductosContext'
import AdminProductos from './AdminProductos'

function montar() {
  render(
    <MemoryRouter>
      <ProductosProvider>
        <AdminProductos />
      </ProductosProvider>
    </MemoryRouter>
  )
}

describe('AdminProductos (página)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('muestra la tabla con botones Editar y Eliminar', () => {
    montar()
    expect(screen.getByRole('heading', { name: 'Administrar productos' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Editar' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'Eliminar' }).length).toBeGreaterThan(0)
  })

  it('crea un producto nuevo y lo muestra en la tabla', async () => {
    montar()
    await userEvent.click(screen.getByRole('button', { name: '+ Nuevo producto' }))
    await userEvent.type(screen.getByLabelText('Nombre'), 'Producto de prueba XYZ')
    await userEvent.type(screen.getByLabelText('Categoría'), 'Pruebas')
    await userEvent.type(screen.getByLabelText('Precio'), '1000')
    await userEvent.type(screen.getByLabelText('Stock'), '5')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(screen.getByText('Producto creado correctamente.')).toBeInTheDocument()
    expect(screen.getByText('Producto de prueba XYZ')).toBeInTheDocument()
  })

  it('abre el formulario de edición y lo cierra con Cancelar', async () => {
    montar()
    await userEvent.click(screen.getAllByRole('button', { name: 'Editar' })[0])
    expect(screen.getByRole('heading', { name: 'Editar producto' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(screen.queryByRole('heading', { name: 'Editar producto' })).not.toBeInTheDocument()
  })

  it('elimina un producto cuando se confirma', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    montar()
    const antes = screen.getAllByRole('button', { name: 'Eliminar' }).length

    await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])

    expect(screen.getByText('Producto eliminado correctamente.')).toBeInTheDocument()
    expect(screen.queryAllByRole('button', { name: 'Eliminar' }).length).toBe(antes - 1)
  })

  it('no elimina nada si se cancela la confirmación', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    montar()
    const antes = screen.getAllByRole('button', { name: 'Eliminar' }).length

    await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])

    expect(screen.getAllByRole('button', { name: 'Eliminar' }).length).toBe(antes)
  })
})