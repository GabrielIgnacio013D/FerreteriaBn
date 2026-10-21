import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CarritoProvider } from '../context/CarritoContext'
import { crearUsuario } from '../services/usuarioService'
import Registro from './Registro'

const navegar = vi.hoisted(() => vi.fn())

vi.mock('react-router-dom', async (importOriginal) => {
  const real = await importOriginal()
  return { ...real, useNavigate: () => navegar }
})

function montar() {
  render(
    <MemoryRouter>
      <CarritoProvider>
        <Registro />
      </CarritoProvider>
    </MemoryRouter>
  )
}

async function llenar(email = 'gabo@correo.cl', clave = '123456', confirmar = '123456') {
  await userEvent.type(screen.getByLabelText('Nombre'), 'Gabo')
  await userEvent.type(screen.getByLabelText('Correo'), email)
  await userEvent.type(screen.getByLabelText('Contraseña'), clave)
  await userEvent.type(screen.getByLabelText('Confirmar contraseña'), confirmar)
  await userEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }))
}

describe('Registro (página)', () => {
  beforeEach(() => {
    localStorage.clear()
    navegar.mockClear()
  })

  it('muestra errores si los campos están vacíos', async () => {
    montar()
    await userEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }))
    expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
    expect(navegar).not.toHaveBeenCalled()
  })

  it('avisa si las contraseñas no coinciden', async () => {
    montar()
    await llenar('gabo@correo.cl', '123456', '654321')
    expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument()
    expect(navegar).not.toHaveBeenCalled()
  })

  it('avisa si el correo ya está registrado', async () => {
    crearUsuario({ nombre: 'Otro', email: 'gabo@correo.cl', clave: '123456' })
    montar()
    await llenar()
    expect(screen.getByText('Ese correo ya está registrado')).toBeInTheDocument()
  })

  it('crea el usuario y navega al menú con datos válidos', async () => {
    montar()
    await llenar()
    expect(JSON.parse(localStorage.getItem('usuarios'))[0].email).toBe('gabo@correo.cl')
    expect(navegar).toHaveBeenCalledWith('/menu')
  })
})