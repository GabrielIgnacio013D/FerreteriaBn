import { describe, it, expect, beforeEach } from 'vitest'
import { crearUsuario, buscarUsuarioPorEmail, listarUsuarios } from './usuarioService'

const datos = { nombre: 'Gabo', email: 'gabo@correo.cl', clave: '123456' }

describe('usuarioService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('crea un usuario con id 1 y rol cliente', () => {
    const usuario = crearUsuario(datos)
    expect(usuario.id).toBe(1)
    expect(usuario.rol).toBe('cliente')
  })

  it('asigna ids consecutivos', () => {
    crearUsuario(datos)
    const segundo = crearUsuario({ ...datos, email: 'otro@correo.cl' })
    expect(segundo.id).toBe(2)
    expect(listarUsuarios().length).toBe(2)
  })

  it('busca un usuario por correo sin distinguir mayúsculas', () => {
    crearUsuario(datos)
    expect(buscarUsuarioPorEmail('GABO@correo.cl').nombre).toBe('Gabo')
  })

  it('devuelve null si el correo no está registrado', () => {
    expect(buscarUsuarioPorEmail('nadie@correo.cl')).toBeNull()
  })
})