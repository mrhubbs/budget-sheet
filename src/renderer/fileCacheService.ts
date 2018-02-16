// Cache user settings to disk and load from disk.

const Package = require('../../package.json')
import store from './store'

import storage from 'electron-json-storage-sync'

const settingsSection = `${Package.name}.settings`

// top-level sections from the store that need persisted
const sections = [
  'fileDialogs',
  'app',
  'truck',
  'dataPkg'
]

export const cacheConfig = () => {
  // build and object with all the sections we want to save
  const stateToPersist = sections.reduce((accum, section) => {
    accum[section] = store.state[section]
    return accum
  }, {})
  sections.forEach((s) => storage.set(`${settingsSection}`, stateToPersist))
}

// must be run inside a commit because it modifies the state
export const loadConfig = (state) => {
  const persistedState = storage.get(`${settingsSection}`)

  // Make sure we have saved data to load from.
  if (persistedState.status !== false) {
    const data = persistedState.data
    Object.keys(data).forEach((key) => {
      state[key] = data[key]
    })
  }
}
