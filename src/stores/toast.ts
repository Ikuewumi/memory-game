import { sleep } from '@/composables/engine'
import { atom } from 'nanostores'

export const toast = atom('')

export const writeMessage = (message: string): void => { toast.set(message) }

export const showMessage = async (message: string, timeInMs = 2000): Promise<void> => {
  writeMessage(message)
  await sleep(timeInMs)
  writeMessage('')
}
