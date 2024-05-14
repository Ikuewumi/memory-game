import { getCardsData, getFormattedTimeNumber, matchCards, shuffle } from "@/composables/engine";
import type { CardData, FocusData, FocusState, GameData, GameStatus, Question } from "@/types";
import { computed, map, atom } from "nanostores";
import { MODE } from "./modes";
import { writeMessage } from "./toast";
import { metrics } from "./metrics";
import { addNewImage } from "./image";


let TIME_ID = 0

const DEFAULT_GAME_DATA: GameData = {
    image: "",
    text: "",
    questions: [],
}

const DEFAULT_GAME_STATUS: GameStatus = {
    multipleImages: false,
    gameStarted: false,
    lives: 0,
    time: 0
}

const DEFAULT_FOCUS_DATA: FocusData = {
    state: "idle",
    cards: []
}

const DEFAULT_FULL_QUESTION_COUNT = 0
const DEFAULT_CURRENT_STATUS: FocusState = "idle"



export const gameData = map({ ...DEFAULT_GAME_DATA })
export const gameStatus = map({ ...DEFAULT_GAME_STATUS })
export const focusData = map({ ...DEFAULT_FOCUS_DATA })
export const fullQuestionCount = atom(DEFAULT_FULL_QUESTION_COUNT)
export const currentStatus = atom(DEFAULT_CURRENT_STATUS as FocusState)



export const stringTime = computed(gameStatus, (gameStatus) => {
    const timeArray = getFormattedTimeNumber(gameStatus.time)

    return `${timeArray[0]}:${timeArray[1]}`
})

export const cardsList = computed(gameData, (gameData): CardData[] => {
    //if (!(gameStatus.get().gameStarted)) return [] // @TODO enable line for optimization

    const DEFAULT_QUESTION_NUMBER = 6
    const cards = shuffle(getCardsData(gameData.questions.slice(0, DEFAULT_QUESTION_NUMBER)))

    return cards
})

export const percent = computed(gameData, (gameData): number => {
    if (!(gameStatus.get().gameStarted)) return 0
    const count = fullQuestionCount.get()
    return Math.floor(( (count - gameData.questions.length)  / count) * 100)
})



export const enterData = (questions: Question[] = [], image = "", text = ""): void => {
    focusData.set({ ...DEFAULT_FOCUS_DATA })
    gameStatus.set({ ...DEFAULT_GAME_STATUS })
    gameData.set({ questions: shuffle(questions), image, text })
    addNewImage(image, text)
    fullQuestionCount.set(questions.length)
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


    if (gameStatus.get().multipleImages) chooseNewQuestion(gameData.get().questions)
    MODE.get().onSetup?.()
    gameStatus.setKey("gameStarted", true)
    MODE.get()?.onStart?.()
    metrics.onStart()

    const gameContinues = MODE.get()?.gameComplete()
    gameContinues.subscribe(continues => {
        if (continues) return
        if (!gameStatus.get().gameStarted) return
        stopGame()
    })
}

export const stopGame = () => {

    gameStatus.setKey("gameStarted", false)
    focusData.set( { ...DEFAULT_FOCUS_DATA })
    MODE.get()?.gameComplete().off()
    MODE.get()?.onEnd?.()
    metrics.onEnd()
    gameStatus.set({ ...DEFAULT_GAME_STATUS })
    stopClock()

}

export const resetGame = () => {



    stopClock()
    focusData.set({ ...DEFAULT_FOCUS_DATA })
    gameStatus.set({ ...DEFAULT_GAME_STATUS })
    gameData.set({ ...DEFAULT_GAME_DATA })
    currentStatus.set(DEFAULT_CURRENT_STATUS)
    metrics.reset()

    MODE.get()?.gameComplete().off()
    focusData.off()
    gameStatus.off()
    gameData.off()


    writeMessage("")  
}







const chooseNewQuestion = (questions: Question[]) => {
    const max = questions.length > 6 ? 6 : questions.length
    const min = 0
    const randomIndex = Math.floor(Math.random() * (max - min) + min);

    const question = questions[randomIndex]
    if ("image" in question) return addNewImage(question.image) 
    else if ("text" in question) return addNewImage("", question.text) 
    return addNewImage(gameData.get()?.image ??  "", "")

}


// a, and b represent the indexes of the cards in the code
const matchGameCards = (a: number, b: number) => {
    focusData.set({ state: "focus", cards: [a, b] })

    metrics.onAttempt()
    const cards = cardsList.get()
    const cardIndex = cards[a].index
    const cardsMatch = matchCards(cards, cards[a], cards[b])
    const questions = gameData.get().questions

    if (cardsMatch) {
        currentStatus.set("success")
        focusData.setKey("state", "success")
        const newQuestions = shuffle(questions.filter((_, index) => index !== cardIndex))
        gameData.setKey("questions", newQuestions)
        
        metrics.onCorrect()

        if (newQuestions.length <= 0) { 
            MODE.get()?.onComplete?.() 
            metrics.onEnd()
        }
        else { 
            if (gameStatus.get().multipleImages) chooseNewQuestion(gameData.get().questions)
            MODE.get().onMatchRight?.() 
        }

    } else {
        currentStatus.set("failure")
        focusData.setKey("state", "failure")
        MODE.get().onMatchWrong?.()
        metrics.onWrong(questions[cards[a].index])
    }



    return focusData.set({ ...DEFAULT_FOCUS_DATA })
}

export const clickCard = (index: number): void => {
    if (!(gameStatus.get().gameStarted)) return

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
