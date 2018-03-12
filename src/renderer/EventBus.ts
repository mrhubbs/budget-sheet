import Vue from 'vue'

const eventBus = new Vue()

export default eventBus

export const showError = (error) => {
  eventBus.$emit('error', { error })
}

export const showSuccess = (msg) => {
  eventBus.$emit('success', { msg })
}
