import { atom } from 'nanostores'

let TOAST_ID = 0
export const toast = atom('')

export const writeMessage = (message: string): void => { toast.set(message) }

export const showMessage = async (message: string, timeInMs = 7000): Promise<void> => {
  clearTimeout(TOAST_ID)
  writeMessage(message)
  TOAST_ID = setTimeout(() => writeMessage(""), timeInMs) as unknown as number
}
