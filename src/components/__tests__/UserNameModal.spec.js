import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserNameModal from '../UserNameModal.vue'

describe('UserNameModal.vue', () => {
  it('deber emitir el evento "save-name" con el nombre de usuario al enviarlo con un nombre', async () => {
    const wrapper = mount(UserNameModal)
    const input = wrapper.find('input')
    const nombreUsuario = 'nube'

    await input.setValue(nombreUsuario)
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('save-name')
    expect(wrapper.emitted('save-name')[0]).toEqual([nombreUsuario])
  })
})
