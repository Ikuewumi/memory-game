import { map } from "nanostores"

export const DEFAULT_MODAL_STATES = {
    settings: false as boolean,
    options: false as boolean,
    game: false as boolean,
    metrics: false as boolean,
} as const

const modalElements = {
   "settings": "#modals-settings", 
   "options": "#modals-options", 
   "game": "#modals-game", 
   "metrics": "#modals-metrics", 
} as Record<keyof typeof DEFAULT_MODAL_STATES, string>

export const modals = map({ ...DEFAULT_MODAL_STATES })
export const resetModals = () => {
    modals.set({ ...DEFAULT_MODAL_STATES })
}

const elements = ['header.header', 'button.cuiz-walkthrough-play', 'footer.footer', 'div.series-section', 'a.cuiz-metadata-course-link']
const MODAL_OPEN_CLASS = "modal-open"

modals.subscribe(modals => {
    let modalKey: keyof typeof DEFAULT_MODAL_STATES;
    Object.keys(modals).forEach(key => {
        if (modals[key] !== true) return
        modalKey = modalElements[key] as typeof modalKey
    })

    if (modalKey > "") {
        document.body.classList.add(MODAL_OPEN_CLASS)
        elements.forEach(element => {
            const el = document.querySelector(element)
            if (el) {
                el.setAttribute("inert", "")
                el.setAttribute("aria-hidden", "true")
            }
        })

        const currentModalElement = document.querySelector(modalKey) as HTMLDivElement
        if (!currentModalElement) return


        currentModalElement.focus()

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

