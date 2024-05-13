import type { Question, CardData } from "@/types"
import { z } from "astro/zod"

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


export const setupConfetti = (func: (() => any)) => {

    return new Promise((resolve) => {

        if (!("confetti" in window)) {
            // @ts-ignore
            const script = document.createElement('script')
            script.src = '/confetti.browser.min.js';

            document.querySelector('head').appendChild(script)
            script.addEventListener("load", () => {

               return resolve(func())
            })
        } else {
            return resolve(func())
        }


    }).catch(console.error)

}


export const throwConfetti = (timeInMs = 2000) => {
        return setupConfetti(() => {
            // @ts-ignore
            var duration = timeInMs;
            var end = Date.now() + duration;

            // @ts-ignore
            confetti.reset();

            (function frame() {
                // launch a few confetti from the left edge
                // @ts-ignore
                confetti({
                    particleCount: 7,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 }
                });
                // and launch a few from the right edge
                // @ts-ignore
                confetti({
                    particleCount: 7,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 }
                });

                // keep going until we are out of time
                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        })
}

export const zUrlString = z.string().url().transform(url => {
    return url.endsWith('/') ? url : `${url}/`
})




function base64ToBytes(base64: string) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

function bytesToBase64(bytes: Uint8Array) {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
}


/* // Usage
bytesToBase64(new TextEncoder().encode("a Ā 𐀀 文 🦄")); // "YSDEgCDwkICAIOaWhyDwn6aE"
new TextDecoder().decode(base64ToBytes("YSDEgCDwkICAIOaWhyDwn6aE"));
 */


export const encodeString = (string: string) => bytesToBase64(new TextEncoder().encode(string));
export const decodeString = (string: string) => (new TextDecoder().decode(base64ToBytes(string)));
