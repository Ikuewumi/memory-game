import { map } from "nanostores"

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

const elements = ['header.header', 'button.cuiz-walkthrough-play', 'footer.footer']
const MODAL_OPEN_CLASS = "modal-open"

modals.subscribe(modals => {
    const modalIsOpen = Object.values(modals).includes(true)

    if (modalIsOpen) {
        document.body.classList.add(MODAL_OPEN_CLASS)
        elements.forEach(element => {
            const el = document.querySelector(element)
            if (el) {
                el.setAttribute("inert", "")
                el.setAttribute("aria-hidden", "true")
            }
        })

    } else {
        document.body.classList.remove(MODAL_OPEN_CLASS)
        elements.forEach(element => {
            const el = document.querySelector(element)
            if (el) {
                el.removeAttribute("inert")
                el.setAttribute("aria-hidden", "false")
            }
        })


    }
})

