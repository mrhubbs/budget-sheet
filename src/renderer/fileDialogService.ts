
import store from './store'

const { dialog } = require('electron').remote

// This defines the file dialogs the system knows about.
// Each entry stores options for the dialog and has a
// mechanism to get the default path.
const fileDialogCache = {
  // A dialog for picking a data package
  openBudgetSheet: {
    title: 'Open Budget Sheet',
    getDefaultPath: () => process.env.HOME,
    filters: [{name: 'Budget Sheet', extensions: ['yaml', 'yml']}],
    properties: ['openFile']
  },
  saveBudgetSheet: {
    title: 'Save Budget Sheet',
    getDefaultPath: () => process.env.HOME,
    filters: [{name: 'Budget Sheet', extensions: ['yaml', 'yml']}],
    properties: ['saveFile']
  }
}

export const openFileDialog = (type, overrideDefaultPath) => {
  const dialogOptions = fileDialogCache[type]

  if (dialogOptions === undefined) {
    throw new Error(`Got request to open unknown file dialog of type ${type}`)
  }

  // for defaultPath we pass in either the override, the last-cached path for
  // this type of dialog, or the default path for this dialog
  let p: any = dialog.showOpenDialog(
    Object.assign(
      dialogOptions,
      {defaultPath: overrideDefaultPath || store.state.fileDialogs[type] || dialogOptions.getDefaultPath()}))

  if (p !== undefined) {
    // if we selected a path, cache it
    if (p.length > 0) {
      store.commit('setFileDialog', {section: type, path: p[0]})
    }

    // If the client code only wants one path, give them the path instead of a list
    if (p !== undefined && !dialogOptions.multiSelections) {
      p = p[0]
    }
  }

  return p
}

export const saveFileDialog = (type, overrideDefaultPath) => {
  const dialogOptions = fileDialogCache[type]

  if (dialogOptions === undefined) {
    throw new Error(`Got request to open unknown file dialog of type ${type}`)
  }

  // for defaultPath we pass in either the override, the last-cached path for
  // this type of dialog, or the default path for this dialog
  let p: any = dialog.showSaveDialog(
    Object.assign(
      dialogOptions,
      {defaultPath: overrideDefaultPath || store.state.fileDialogs[type] || dialogOptions.getDefaultPath()}))

  if (p !== undefined) {
    // if we selected a path, cache it
    if (p.length > 0) {
      store.commit('setFileDialog', {section: type, path: p[0]})
    }
  }

  return p
}
