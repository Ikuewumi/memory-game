import {map} from "nanostores"

export const DEFAULT_MODAL_STATES = {
    settings: false as boolean,
    options: false as boolean,
    game: false as boolean,
    metrics: false as boolean,
} as const

export const modals = map({ ...DEFAULT_MODAL_STATES })
export const resetModals = () => {
    modals.set({ ...DEFAULT_MODAL_STATES })
}


