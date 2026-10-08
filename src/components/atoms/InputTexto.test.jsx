import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InputTexto from './InputTexto'

describe('InputTexto', () => {
  it('muestra la etiqueta y el placeholder', () => {
    render(<InputTexto id="correo" label="Correo" placeholder="ejemplo@correo.cl" value="" onChange={() => {}} />)
    expect(screen.getByLabelText('Correo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('ejemplo@correo.cl')).toBeInTheDocument()
  })

  it('llama a onChange cuando el usuario escribe', async () => {
    const onChange = vi.fn()
    render(<InputTexto id="correo" label="Correo" value="" onChange={onChange} />)
    await userEvent.type(screen.getByLabelText('Correo'), 'a')
    expect(onChange).toHaveBeenCalled()
  })
})