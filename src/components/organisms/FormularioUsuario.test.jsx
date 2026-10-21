import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioUsuario from './FormularioUsuario'

describe('FormularioUsuario', () => {
  it('muestra errores y no guarda si los campos están vacíos', async () => {
    const onGuardar = vi.fn()
    render(<FormularioUsuario onGuardar={onGuardar} onCancelar={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
    expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument()
    expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument()
    expect(onGuardar).not.toHaveBeenCalled()
  })

  it('guarda los datos cuando todo es válido', async () => {
    const onGuardar = vi.fn()
    render(<FormularioUsuario onGuardar={onGuardar} onCancelar={vi.fn()} />)
    await userEvent.type(screen.getByLabelText('Nombre'), 'Gabo')
    await userEvent.type(screen.getByLabelText('Correo'), 'gabo@correo.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), '123456')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(onGuardar).toHaveBeenCalledWith({
      nombre: 'Gabo',
      email: 'gabo@correo.cl',
      clave: '123456',
      rol: 'cliente',
    })
  })

  it('al editar carga los datos y no exige la contraseña', async () => {
    const onGuardar = vi.fn()
    const usuario = { id: 1, nombre: 'Ana', email: 'ana@correo.cl', rol: 'admin' }
    render(<FormularioUsuario usuario={usuario} onGuardar={onGuardar} onCancelar={vi.fn()} />)
    expect(screen.getByLabelText('Nombre')).toHaveValue('Ana')

    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(onGuardar).toHaveBeenCalledWith(
      expect.objectContaining({ nombre: 'Ana', clave: '', rol: 'admin' })
    )
  })
})