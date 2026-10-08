import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BotonSubmit from './BotonSubmit'

describe('BotonSubmit', () => {
  it('muestra el texto recibido por props', () => {
    render(<BotonSubmit texto="Iniciar Sesión" />)
    expect(screen.getByRole('button', { name: 'Iniciar Sesión' })).toBeInTheDocument()
  })

  it('es de tipo submit', () => {
    render(<BotonSubmit texto="Enviar" />)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })
})