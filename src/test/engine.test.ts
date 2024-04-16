import { describe, test, expect } from "vitest";
import type { CardData, Question } from "@/types";
import { getCardsData, matchCards } from "@composables/engine";

describe("Memory Game Logic", _ => {

    let tData: Question[] = [
        { question: "A", answer: "hyoid bone" },
        { question: "B", answer: "inra" }
    ]
    // Expected Card Data 
    let $10 = { text: "A", index: 0 },
        $11 = { text: "hyoid bone", index: 0 },
        $20 = { text: "B", index: 1 },
        $21 = {  text: "inra", index: 1}

    test("Get a bunch of cards from some questions", _ => {
        expect(getCardsData(tData)).toStrictEqual([ $10, $11, $20, $21 ])
    })


    test("Match Some Cards", _ => {
        let tCards: CardData[] = getCardsData(tData) 
        expect(matchCards(tCards, $10, $20)).toBe(false)
        expect(matchCards(tCards, $10, $11)).toBe(true)
        expect(matchCards(tCards, $11, $20)).toBe(false)
        expect(matchCards(tCards, $11, $21)).toBe(false)
        expect(matchCards(tCards, $11, $10)).toBe(true)
        expect(matchCards(tCards, $21, $20)).toBe(true)
    })

    

})
