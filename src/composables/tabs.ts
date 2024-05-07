export const setupTabs = (tabsWrapperId:string) => {
    const tabsId = `#${tabsWrapperId}`
    const tabsWrapper = document.querySelector(tabsId) as HTMLDivElement
    if (!tabsWrapper) return

    const tabsList = tabsWrapper.querySelector('.tab-list') as HTMLDivElement
    const tabsPanelsWrapper = tabsWrapper.querySelector('.tab-panels')
    const tabPanels = tabsPanelsWrapper.querySelectorAll('&>div')
    const tabLinks = tabsList.querySelectorAll('a');

    if (!(tabsList && tabsPanelsWrapper)) return

    tabsList.setAttribute('role', 'tablist')
    tabLinks.forEach(link => { link.setAttribute('role', 'tab') })
    tabPanels.forEach(panel => { panel.setAttribute('role', 'tabpanel') })

    tabsList.addEventListener('click', (e) => {
        e.preventDefault()  
        
        const tabIsLink = Array.from(tabLinks).findIndex(tab => e.target === tab)
        if (tabIsLink !== -1) {
            showTab(tabIsLink)
        }

    })

    const KEYS = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'] as const
    tabsList.addEventListener('keydown', (e) => {
        const eventKey = e.key as unknown as typeof KEYS[number]

        const isValid = KEYS.includes(eventKey)
        if (!isValid) return

        const tabIndex = Array.from(tabLinks).findIndex(tab => tab.getAttribute('aria-selected') === 'true')

        if (tabIndex <= -1) return
        switch(eventKey) {
                case "ArrowRight":
                case "ArrowDown":
                    const nextIndex = (tabIndex >= (tabLinks.length - 1)) ? 0 : tabIndex + 1; 
                    showTab(nextIndex)
                    break;

                case "ArrowLeft":
                case "ArrowUp":
                    const prevIndex = (tabIndex <= 0) ? tabLinks.length - 1 : tabIndex - 1
                    showTab(prevIndex)
                    break;
            }

    })

    const showTab = (index: number, starting = false) => {
        if (index < 0 || index > tabLinks.length) return

        tabLinks.forEach((tab, index_) => {
            if (index_ === index) {
                tab.setAttribute('aria-selected', 'true')
                tab.removeAttribute('tabindex')
                tabPanels[index_].removeAttribute('hidden')

                if (starting) return 
                location.hash = tab.hash
                tab.focus()
            }
            else {
                tab.setAttribute('aria-selected', 'false')
                tab.setAttribute('tabindex', '-1')
                tabPanels[index_].setAttribute('hidden', '')
            }
        })
             
    }


    const hash = window.location.hash
    if (!hash) return showTab(0, true)

    const hashIndex =  Array.from(tabLinks).findIndex(link => link.hash.toLowerCase().trim() === hash.toLowerCase().trim())
    if (hashIndex === -1) showTab(0, true)
    else showTab(hashIndex,  true)
 
}


export const destroyTabs = (tabsWrapperId: string) => { 
    const tabsWrapper = document.querySelector(`#${tabsWrapperId}`) as HTMLDivElement
    if (!tabsWrapper) return

    tabsWrapper.remove()
}
