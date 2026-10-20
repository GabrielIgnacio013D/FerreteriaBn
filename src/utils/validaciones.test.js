import { describe, it, expect } from 'vitest'
import { validarEmail, validarClave, validarObligatorio, validarNumero } from './validaciones'

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

  it('validarObligatorio rechaza texto vacío o con solo espacios', () => {
    expect(validarObligatorio('  ', 'El nombre')).toBe('El nombre es obligatorio')
  })

  it('validarObligatorio acepta texto con contenido', () => {
    expect(validarObligatorio('Martillo', 'El nombre')).toBe('')
  })

  it('validarNumero rechaza valores que no son número', () => {
    expect(validarNumero('abc', 1, 'El precio')).toBe('El precio debe ser un número')
  })

  it('validarNumero rechaza números menores al mínimo', () => {
    expect(validarNumero('0', 1, 'El precio')).toBe('El precio debe ser al menos 1')
  })

  it('validarNumero acepta un número válido', () => {
    expect(validarNumero('15990', 1, 'El precio')).toBe('')
  })
})