import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskForm from '~/components/TaskForm.vue'

const FUTURE = '2999-12-31'
// Today satisfies the input's `min` attribute (so the value binds in the test
// environment) but is not *strictly* in the future, exercising that validation branch.
const TODAY = new Date().toISOString().slice(0, 10)

function mountForm() {
  return mount(TaskForm)
}

describe('TaskForm validation', () => {
  it('blocks submit and shows an error when the title is empty', async () => {
    const wrapper = mountForm()
    await wrapper.find('#dueDate').setValue(FUTURE)

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('submit')).toBeUndefined()
    expect(wrapper.text()).toContain('Title is required.')
  })

  it('blocks submit when the due date is not in the future', async () => {
    const wrapper = mountForm()
    await wrapper.find('#title').setValue('Valid title')
    await wrapper.find('#dueDate').setValue(TODAY)

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('submit')).toBeUndefined()
    expect(wrapper.text()).toContain('Due date must be in the future.')
  })

  it('emits submit with trimmed values when the input is valid', async () => {
    const wrapper = mountForm()
    await wrapper.find('#title').setValue('  Buy milk  ')
    await wrapper.find('#dueDate').setValue(FUTURE)

    await wrapper.find('form').trigger('submit.prevent')

    const submitted = wrapper.emitted('submit')
    expect(submitted).toHaveLength(1)
    expect(submitted![0][0]).toMatchObject({
      title: 'Buy milk',
      dueDate: FUTURE,
      status: 'Pending'
    })
  })
})
