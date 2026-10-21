import { describe, it, expect } from 'vitest'
import { filtrarOfertas } from './ofertas'

describe('filtrarOfertas', () => {
  it('deja solo los productos marcados como oferta', () => {
    const productos = [
      { id: 1, nombre: 'Martillo', oferta: true },
      { id: 2, nombre: 'Taladro', oferta: false },
      { id: 3, nombre: 'Sierra' },
    ]
    expect(filtrarOfertas(productos).map((p) => p.id)).toEqual([1])
  })

  it('devuelve una lista vacía si no hay ofertas', () => {
    expect(filtrarOfertas([{ id: 1, oferta: false }])).toEqual([])
  })
})