import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioLogin from './FormularioLogin'

function montar(props = {}) {
  const base = {
    email: '',
    setEmail: vi.fn(),
    password: '',
    setPassword: vi.fn(),
    onSubmit: vi.fn((e) => e.preventDefault()),
  }
  const final = { ...base, ...props }
  render(<FormularioLogin {...final} />)
  return final
}

describe('FormularioLogin', () => {
  it('muestra los campos de correo y contraseña', () => {
    montar()
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
  })

  it('llama a setEmail al escribir el correo', async () => {
    const props = montar()
    await userEvent.type(screen.getByLabelText('Correo Electrónico'), 'a')
    expect(props.setEmail).toHaveBeenCalled()
  })

  it('llama a onSubmit al presionar el botón con datos válidos', async () => {
    const props = montar({ email: 'gabo@correo.cl', password: '1234' })
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))
    expect(props.onSubmit).toHaveBeenCalled()
  })
})