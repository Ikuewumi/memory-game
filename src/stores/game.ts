import { checkIndex, getCardsData, matchCards, shuffle, sleep } from "@/composables/engine";
import type { CardData, FocusData, GameData, GameStatus, Question } from "@/types";
import { computed, map } from "nanostores";
import { MODE } from "./modes";


let TIME_ID = 0

const DEFAULT_GAME_DATA: GameData = {
    image: "",
    text: "",
    questions: [],
}

const DEFAULT_GAME_STATUS: GameStatus = {
    gameStarted: false,
    lives: 0,
    time: 0
}

const DEFAULT_FOCUS_DATA: FocusData = {
    state: "idle",
    cards: []
}




export const gameData = map({ ...DEFAULT_GAME_DATA })
export const gameStatus = map({ ...DEFAULT_GAME_STATUS })
export const focusData = map({ ...DEFAULT_FOCUS_DATA })



export const cardsList = computed(gameData, (gameData): CardData[] => {
    //if (!(gameStatus.get().gameStarted)) return []

    const DEFAULT_QUESTION_NUMBER = 6
    const cards = shuffle(getCardsData(gameData.questions.slice(0, DEFAULT_QUESTION_NUMBER)))

    return cards
})


export const enterData = (questions: Question[] = [], image = "", text = ""): void => {
    focusData.set({ ...DEFAULT_FOCUS_DATA })
    gameStatus.set({ ...DEFAULT_GAME_STATUS })
    gameData.set({ questions: shuffle(questions), image, text })
}


export const stopClock = () => clearInterval(TIME_ID)
export const startClock = (time: number, intervalMs = 1000) => {
    stopClock()
    gameStatus.setKey("time", time)

    TIME_ID = setInterval(() => {

        if (time < 1) stopClock(); else time--
        gameStatus.setKey('time', time)

    }, intervalMs) as unknown as number
}

export const startGame = (): void => {
    if (gameData.get().questions.length === 0) {
        return console.error("cannot start a game with no questions")
    }


    MODE.get().onSetup?.()
    gameStatus.setKey("gameStarted", true)
    MODE.get()?.onStart?.()

    const gameContinues = MODE.get()?.gameComplete()
    gameContinues.subscribe(continues => {
        if (continues) return
        stopGame()
    })
}

export const stopGame = () => {
    console.log("done")
    gameStatus.setKey("gameStarted", false)
    MODE.get()?.onEnd?.()
    MODE.get()?.gameComplete().off()
}



export const clickCard = (index: number): void => {
    if (!(gameStatus.get().gameStarted)) return

    /*     console.log({
            gameStatus: gameStatus.get(),
            gameData: gameData.get()
        })
       */
    const focus = focusData.get()

    switch (focus.cards.length) {
        case 0:
            focusData.set({ state: "focus", cards: [index] })
            break
        case 1:
            if (focus.cards[0] === index) return focusData.set({ ...DEFAULT_FOCUS_DATA })
            matchGameCards(index, focus.cards[0])
            break
    }




}


// a, and b represent the indexes of the cards in the code
const matchGameCards = (a: number, b: number) => {
    focusData.set({ state: "focus", cards: [a, b] })

    const cards = cardsList.get()
    const cardIndex = cards[a].index
    const cardsMatch = matchCards(cards, cards[a], cards[b])
    const questions = gameData.get().questions

    if (cardsMatch) {
        focusData.setKey("state", "success")
        const newQuestions = shuffle(questions.filter((_, index) => index !== cardIndex)) 
        gameData.setKey("questions", newQuestions)

        if (newQuestions.length <= 0) { MODE.get()?.onComplete?.() } 
        else { MODE.get().onMatchRight?.() }
    
    } else {
        focusData.setKey("state", "failure")
        MODE.get().onMatchWrong?.()
    }



    return focusData.set({ ...DEFAULT_FOCUS_DATA })
}

