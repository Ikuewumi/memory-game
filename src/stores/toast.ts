import { atom } from 'nanostores'

let TOAST_ID = 0
export const toast = atom('')

export const writeMessage = (message: string): void => { 
  clearTimeout(TOAST_ID)
  toast.set(message) 
}

export const showMessage = (message: string, timeInMs = 5000) => {
  clearTimeout(TOAST_ID)
  writeMessage(message)
  TOAST_ID = setTimeout(() => toast.set(""), timeInMs) as unknown as number
}
