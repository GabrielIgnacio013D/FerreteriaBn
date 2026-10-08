import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TarjetaLogin from './TarjetaLogin'

const props = {
  email: '',
  setEmail: vi.fn(),
  password: '',
  setPassword: vi.fn(),
  onSubmit: vi.fn(),
}

describe('TarjetaLogin', () => {
  it('muestra el título Iniciar Sesión', () => {
    render(<TarjetaLogin {...props} />)
    expect(screen.getByRole('heading', { name: 'Iniciar Sesión' })).toBeInTheDocument()
  })

  it('incluye el formulario con su botón', () => {
    render(<TarjetaLogin {...props} />)
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Iniciar Sesión' })).toBeInTheDocument()
  })
})