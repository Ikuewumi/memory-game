import { cardsList, clickCard, gameStatus } from "./game"

export const gameKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C"]


const startKeyMaps = (e: KeyboardEvent) => {
    if (!gameStatus.get().gameStarted) return
    if (!gameKeys.includes(e.key.toUpperCase())) return
    const cardsSize = cardsList.get().length
    const key = parseInt(e.key, 16)
    if (!cardsSize) return
    const keyIsValid = key - 1 <= cardsList.get().length
    if (keyIsValid) {
        clickCard(key - 1)
    }
}


export const stopListening = () => document.body.removeEventListener("keydown", startKeyMaps)
export const startListening = () => document.body.addEventListener("keydown", startKeyMaps)
