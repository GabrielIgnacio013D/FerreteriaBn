import { describe, it, expect, beforeEach } from 'vitest'
import {
  crearUsuario,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
  listarUsuarios,
} from './usuarioService'
import { crearPedido, actualizarEstadoPedido, obtenerPedido } from './pedidoService'

const usuario = { nombre: 'Gabo', email: 'gabo@correo.cl', clave: '123456' }
const pedido = {
  cliente: { nombre: 'Gabo', email: 'gabo@correo.cl' },
  items: [{ id: 1, nombre: 'Martillo', precio: 1000, cantidad: 1 }],
  total: 1000,
}

describe('servicios de administración', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('crea un usuario con rol admin', () => {
    expect(crearUsuario({ ...usuario, rol: 'admin' }).rol).toBe('admin')
  })

  it('obtiene un usuario por su id', () => {
    const creado = crearUsuario(usuario)
    expect(obtenerUsuario(creado.id).email).toBe('gabo@correo.cl')
  })

  it('actualiza solo los campos indicados de un usuario', () => {
    const creado = crearUsuario(usuario)
    const actualizado = actualizarUsuario(creado.id, { rol: 'admin' })
    expect(actualizado.rol).toBe('admin')
    expect(actualizado.nombre).toBe('Gabo')
  })

  it('elimina un usuario', () => {
    const creado = crearUsuario(usuario)
    eliminarUsuario(creado.id)
    expect(listarUsuarios()).toEqual([])
  })

  it('cambia el estado de un pedido', () => {
    const creado = crearPedido(pedido)
    actualizarEstadoPedido(creado.id, 'Entregado')
    expect(obtenerPedido(creado.id).estado).toBe('Entregado')
  })

  it('devuelve null al cambiar el estado de un pedido que no existe', () => {
    expect(actualizarEstadoPedido(99, 'Entregado')).toBeNull()
  })
})