import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login'

const navegar = vi.hoisted(() => vi.fn())

vi.mock('react-router-dom', async (importOriginal) => {
  const real = await importOriginal()
  return { ...real, useNavigate: () => navegar }
})

describe('Login (página)', () => {
  beforeEach(() => {
    localStorage.clear()
    navegar.mockClear()
  })

  it('guarda la sesión y navega a /menu con datos válidos', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    await userEvent.type(screen.getByLabelText('Correo Electrónico'), 'gabo@correo.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), '123456')
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))

    expect(localStorage.getItem('usuario')).toBe('gabo@correo.cl')
    expect(navegar).toHaveBeenCalledWith('/menu')
  })

  it('no navega si el formulario tiene errores', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))

    expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument()
    expect(navegar).not.toHaveBeenCalled()
  })
})