import { checkIndex, throwConfetti } from "@/composables/engine";
import type { Mode } from "@/types";
import { atom, computed } from "nanostores";
import { gameData, gameStatus, startClock, stopClock } from "./game";

const DEFAULT_MODE = 0

export const BLITZ_SECONDS = [300, 180, 120, 60]

const DEFAULT_LIVES = 4
const DEFAULT_INTERVAL_MS = 1000

const DEFAULT_CONFETTI_TIME_MS = 5000
export const blitzSecondsIndex = atom(0)

// Using a Function to Wrap the Computed vale
const modeClassicComplete = () => computed(gameStatus, gameStatus => gameStatus.lives > 0)
const modeSurvivalComplete = () => computed(gameStatus, gameStatus => gameStatus.time > 0)
const modePracticeComplete = () => computed(gameData, gameData => gameData.questions.length > 0)


export const modes: Mode[] = [
    {
        name: "pratice",
        description: `Click on a card to select it, then match it with the most appropriate card`,
        gameComplete: modePracticeComplete,
        onComplete: () => {
            throwConfetti(DEFAULT_CONFETTI_TIME_MS)
        },
    },


    {
        name: "challenge",
        description: `Click on a card to select it, then match it with the most appropriate card. Be careful though, if you're wrong, the number of lives decrease. The game is over once all the lives are gone`,
        onSetup: () => { gameStatus.setKey("lives", DEFAULT_LIVES) },
        gameComplete: modeClassicComplete,
        onMatchWrong: () => {
            const lives = gameStatus.get().lives
            gameStatus.setKey("lives", lives - 1)
        },
        onComplete: () => {
            throwConfetti(DEFAULT_CONFETTI_TIME_MS)
        },
    },

    {
        name: "blitz",
        description: `Race against the clock to click and match the most appropriate cards. Don't be too hasty though as wrong answers reduce your time.`,
        onStart: () => { startClock(BLITZ_SECONDS[blitzSecondsIndex.get()], DEFAULT_INTERVAL_MS) },
        gameComplete: modeSurvivalComplete,
        onMatchWrong: () => {
            const time = gameStatus.get().time
            if (time - 5 <= 0) startClock(0, DEFAULT_INTERVAL_MS)
            else startClock(time - 5, DEFAULT_INTERVAL_MS)
        },
        onComplete: () => {
            stopClock()
            throwConfetti(DEFAULT_CONFETTI_TIME_MS)
        },

    }
]

export const selectedMode = atom(DEFAULT_MODE)
export const MODE = computed(selectedMode, (mode) => modes[checkIndex(mode, modes)])

