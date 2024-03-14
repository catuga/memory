import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WinModal from '../WinModal.vue'

describe('WinModal.vue', () => {
  it('debe emitir el evento "play-again" cuando se haga click en el botón "Jugar otra vez"', async () => {
    const wrapper = mount(WinModal)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('play-again')
  })
})
