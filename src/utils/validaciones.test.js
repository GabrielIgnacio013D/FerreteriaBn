import { describe, it, expect } from 'vitest'
import { validarEmail, validarClave } from './validaciones'

describe('validaciones', () => {
  it('rechaza un correo vacío', () => {
    expect(validarEmail('   ')).toBe('El correo es obligatorio')
  })

  it('rechaza un correo sin arroba', () => {
    expect(validarEmail('correo.cl')).toBe('Ingresa un correo válido')
  })

  it('acepta un correo válido', () => {
    expect(validarEmail('gabo@correo.cl')).toBe('')
  })

  it('rechaza una clave vacía', () => {
    expect(validarClave('')).toBe('La contraseña es obligatoria')
  })

  it('rechaza una clave de menos de 6 caracteres', () => {
    expect(validarClave('12345')).toBe('La contraseña debe tener al menos 6 caracteres')
  })

  it('acepta una clave de 6 o más caracteres', () => {
    expect(validarClave('123456')).toBe('')
  })
})