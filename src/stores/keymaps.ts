import { clickDcqCard, gameStatus, randomQuestionIndex } from "./game"

export const gameKeys = ["T", "F"]


const startKeyMaps = (e: KeyboardEvent) => {
    if (!gameStatus.get().gameStarted) return
    if (gameStatus.get().type !== "dcq") return
    if (!gameKeys.includes(e.key.toUpperCase())) return
    if (e.ctrlKey) return

    const questionIndex = randomQuestionIndex.get()


    switch(e.key.toUpperCase()) {
        case "T": {
            clickDcqCard(questionIndex, true)
            break;
        }
        
    
        case "F": {
            clickDcqCard(questionIndex, false)
            break;
        }

        default:
            break

    }


     
}


export const stopListening = () => document.body.removeEventListener("keydown", startKeyMaps)
export const startListening = () => document.body.addEventListener("keydown", startKeyMaps)
