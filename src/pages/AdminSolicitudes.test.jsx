import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { crearPedido, obtenerPedido } from '../services/pedidoService'
import AdminSolicitudes from './AdminSolicitudes'

function montar() {
  render(
    <MemoryRouter>
      <AdminSolicitudes />
    </MemoryRouter>
  )
}

describe('AdminSolicitudes (página)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('avisa cuando no hay solicitudes', () => {
    montar()
    expect(screen.getByText('Aún no hay solicitudes.')).toBeInTheDocument()
  })

  it('muestra el cliente de cada solicitud', () => {
    crearPedido({
      cliente: { nombre: 'Gabo', apellidos: 'Fuentes', email: 'g@correo.cl' },
      items: [{ id: 1, nombre: 'Martillo', precio: 1000, cantidad: 2 }],
      total: 2000,
    })
    montar()
    expect(screen.getByText('Gabo Fuentes')).toBeInTheDocument()
  })

  it('cambia el estado de una solicitud', async () => {
    const pedido = crearPedido({
      cliente: { nombre: 'Gabo', apellidos: 'Fuentes', email: 'g@correo.cl' },
      items: [{ id: 1, nombre: 'Martillo', precio: 1000, cantidad: 2 }],
      total: 2000,
    })
    montar()
    await userEvent.selectOptions(screen.getByRole('combobox'), 'Entregado')
    expect(obtenerPedido(pedido.id).estado).toBe('Entregado')
  })
})