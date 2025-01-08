import { describe, expect, it } from 'vitest'

import { IntensitySegments } from '~/examples/intensity-segments'

const is = new IntensitySegments()
const is0 = new IntensitySegments()

describe('intensitySegments', () => {
  it('should return []', () => {
    expect(is.toString()).toBe('[]')
  })

  it('should return [[10,1],[30,0]]', () => {
    is.add(10, 30, 1)
    expect(is.toString()).toBe('[[10,1],[30,0]]')
  })

  it('should return [[10,1],[20,2],[30,1],[40,0]]', () => {
    is.add(20, 40, 1)
    expect(is.toString()).toBe('[[10,1],[20,2],[30,1],[40,0]]')
  })

  it('should return [[10,-1],[20,0],[30,-1],[40,0]]', () => {
    is.add(10, 40, -2)
    expect(is.toString()).toBe('[[10,-1],[20,0],[30,-1],[40,0]]')
  })

  it('should return [[10,-1],[20,1],[30,-1],[40,0]]', () => {
    is.set(20, 30, 1)
    expect(is.toString()).toBe('[[10,-1],[20,1],[30,-1],[40,0]]')
  })

  describe('is0', () => {
    it('input 10, 30, 1 should return [[10,1],[30,0]]', () => {
      is0.add(10, 30, 1)
      expect(is0.toString()).toBe('[[10,1],[30,0]]')
    })

    it('input 20, 40, 1 should return [[10,1],[20,2],[30,1],[40,0]]', () => {
      is0.add(20, 40, 1)
      expect(is0.toString()).toBe('[[10,1],[20,2],[30,1],[40,0]]')
    })

    it('input 10, 40, -1 should return [[20,1],[30,0]]', () => {
      is0.add(10, 40, -1)
      expect(is0.toString()).toBe('[[20,1],[30,0]]')
    })

    it('input 10, 40, -1 should return [[10,-1],[20,0],[30,-1],[40,0]]', () => {
      is0.add(10, 40, -1)
      expect(is0.toString()).toBe('[[10,-1],[20,0],[30,-1],[40,0]]')
    })

    it('input 20, 30, 3 should return [[10,-1],[20,3],[30,-1],[40,0]]', () => {
      is0.add(20, 30, 3)
      expect(is0.toString()).toBe('[[10,-1],[20,3],[30,-1],[40,0]]')
    })
  })
})
