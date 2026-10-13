import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TarjetaLogin from './TarjetaLogin'

describe('TarjetaLogin', () => {
  it('muestra el título Iniciar Sesión', () => {
    render(<TarjetaLogin onEnviar={vi.fn()} />)
    expect(screen.getByRole('heading', { name: 'Iniciar Sesión' })).toBeInTheDocument()
  })

  it('incluye el formulario con su botón', () => {
    render(<TarjetaLogin onEnviar={vi.fn()} />)
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Iniciar Sesión' })).toBeInTheDocument()
  })
})