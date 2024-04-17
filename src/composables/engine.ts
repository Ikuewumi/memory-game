import type { Question, CardData } from "@/types"
import confetti from "canvas-confetti"


export const getCardsData = (questions: Question[]): CardData[] => {
    let array: CardData[] = []

    questions.forEach((question, index) => {
        const cards: CardData[] = [
            { "text": question.question, index },
            { "text": question.answer, index }
        ]

        array = [...array, ...cards]
    })

    return array
}


export const matchCards = (cardList: CardData[], cardA: CardData, cardB: CardData): boolean => {
    const checkCardIndex = (index: number) => index < cardList.length && index >= 0

    const cardIndexesAreValid = checkCardIndex(cardA.index) && checkCardIndex(cardB.index)
    if (!cardIndexesAreValid) return false

    const cardIndexesAreEqual = cardA.index === cardB.index
    return cardIndexesAreEqual

}

export const sleep = (timeinMilliseconds = 3000) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeinMilliseconds)
    })
}

export const shuffle = <T>(array: T[]) => {
    let currentIndex = array.length - 1

    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex)
        let temp = array[randomIndex]
        array[randomIndex] = array[currentIndex]
        array[currentIndex] = temp
        temp = null
        currentIndex--
    }


    return array

}

export const checkIndex = <T>(index: number, array: T[] | (() => T[])) => {
    let array_ = typeof array === "function" ? array() : array
    const indexValid = index >= 0 && index < array_.length
    return indexValid ? index : 0
}


export const getFormattedTimeString = (seconds: number): string => {
    const secondsCount = seconds % 60
    const minuitesCount = Math.floor(seconds / 60)

    let string = `${secondsCount} secs`
    if (minuitesCount > 0) {
        string = `${minuitesCount} ${minuitesCount > 1 ? 'mins' : 'min'} ${secondsCount > 0 ? ` ${secondsCount} seconds` : ''}`
    }

    return string
}

export const getFormattedTimeNumber = (seconds: number): [string, string] => {
    const secondsCount = seconds % 60
    const minuitesCount = Math.floor(seconds / 60)

    const prettifyNumber = (num: number): string => {
        return num > 9 ? `${num}` : `0${num}`
    }

    return [prettifyNumber(minuitesCount), prettifyNumber(secondsCount)]
}



export const throwConfetti = async (timeInMs = 2000) => {
    confetti()
    await sleep(timeInMs)
    return confetti.reset()
}
