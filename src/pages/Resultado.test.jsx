import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { crearPedido } from '../services/pedidoService'
import Resultado from './Resultado'

function montar(ruta) {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/resultado/:id" element={<Resultado />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Resultado (página)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('muestra el número y el total de una solicitud exitosa', () => {
    const pedido = crearPedido({
      cliente: { nombre: 'Gabo' },
      items: [{ id: 1, nombre: 'Martillo', precio: 1000, cantidad: 2 }],
      total: 2000,
    })
    montar(`/resultado/${pedido.id}`)
    expect(screen.getByRole('heading', { name: /Solicitud N° 1 registrada/ })).toBeInTheDocument()
    expect(screen.getByText('Martillo')).toBeInTheDocument()
  })

  it('muestra un aviso de error en /resultado/error', () => {
    montar('/resultado/error')
    expect(screen.getByRole('heading', { name: 'No se pudo registrar la solicitud' })).toBeInTheDocument()
  })

  it('avisa si la solicitud no existe', () => {
    montar('/resultado/99')
    expect(screen.getByText('Solicitud no encontrada.')).toBeInTheDocument()
  })
})