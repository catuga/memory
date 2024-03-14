import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import GameBoard from '../GameBoard.vue'

beforeEach(() => {
  vi.useFakeTimers()
})

describe('GameBoard.vue', () => {
  it('inicializa el contador correctamente', () => {
    const wrapper = mount(GameBoard)
    expect(wrapper.vm.countdown).toBe(5)
  })

  it('emite el evento "game-won" cuando todas las cartas han sido emparejadas', async () => {
    const wrapper = mount(GameBoard)
    wrapper.vm.cards.forEach((card) => {
      card.matched = true
    })

    wrapper.vm.checkForWin()

    vi.runAllTimers()

    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()).toHaveProperty('game-won')
  })
})
