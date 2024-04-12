import type { Question, CardData } from "@/types"


export const getCardsData = (questions: Question[]): CardData[] => {
    let array: CardData[] = []
    
    questions.forEach((question, index) => {
        const cards: CardData[] = [
            { "text": question.question, index },
            { "text": question.answer, index }
        ]

        array = [ ...array, ...cards]
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
