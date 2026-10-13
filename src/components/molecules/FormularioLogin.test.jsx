import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioLogin from './FormularioLogin'

describe('FormularioLogin', () => {
  it('muestra los campos de correo y contraseña', () => {
    render(<FormularioLogin onEnviar={vi.fn()} />)
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
  })

  it('muestra errores y no envía si los campos están vacíos', async () => {
    const onEnviar = vi.fn()
    render(<FormularioLogin onEnviar={onEnviar} />)
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))
    expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument()
    expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument()
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('muestra error si el correo no es válido', async () => {
    const onEnviar = vi.fn()
    render(<FormularioLogin onEnviar={onEnviar} />)
    await userEvent.type(screen.getByLabelText('Correo Electrónico'), 'correo-malo')
    await userEvent.type(screen.getByLabelText('Contraseña'), '123456')
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))
    expect(screen.getByText('Ingresa un correo válido')).toBeInTheDocument()
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('muestra error si la contraseña es muy corta', async () => {
    render(<FormularioLogin onEnviar={vi.fn()} />)
    await userEvent.type(screen.getByLabelText('Correo Electrónico'), 'gabo@correo.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), '123')
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))
    expect(screen.getByText('La contraseña debe tener al menos 6 caracteres')).toBeInTheDocument()
  })

  it('llama a onEnviar con el correo cuando todo es válido', async () => {
    const onEnviar = vi.fn()
    render(<FormularioLogin onEnviar={onEnviar} />)
    await userEvent.type(screen.getByLabelText('Correo Electrónico'), 'gabo@correo.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), '123456')
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))
    expect(onEnviar).toHaveBeenCalledWith({ email: 'gabo@correo.cl' })
  })
})