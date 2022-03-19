import { mount } from '@vue/test-utils'
import RouletteBetViewer from '@/components/RouletteBetViewer.vue'

describe('RouletteBetViewer', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(RouletteBetViewer)
    expect(wrapper.vm).toBeTruthy()
  })
})
