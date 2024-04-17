import { checkIndex, throwConfetti } from "@/composables/engine";
import type { Mode } from "@/types";
import { atom, computed } from "nanostores";
import { fullQuestionCount, gameStatus, percent, startClock, stopClock } from "./game";
import { showMessage } from "./toast";

const DEFAULT_MODE = 0

const DEFAULT_LIVES = 3
const DEFAULT_TIME = 60
const DEFAULT_INTERVAL_MS = 1000

const DEFAULT_CONFETTI_TIME_MS = 5000

// Using a Function to Wrap the Computed vale
const modeClassicComplete = () => computed(gameStatus, gameStatus => gameStatus.lives > 0)
const modeSurvivalComplete = () => computed(gameStatus, gameStatus => gameStatus.time > 0)


export const modes: Mode[] = [
    {
        name: "classic",
        onSetup: () => { gameStatus.setKey("lives", DEFAULT_LIVES) },
        gameComplete: modeClassicComplete,
        onMatchWrong: () => {
            const lives = gameStatus.get().lives
            gameStatus.setKey("lives", lives - 1)
        },
        onComplete: () => {
            const questionCount = fullQuestionCount.get()
            throwConfetti(DEFAULT_CONFETTI_TIME_MS)
            showMessage(`✅ Finished all ${questionCount} questions. Yay!`)
        },
        onEnd: () => {
            showMessage(`❌ ${percent.get()}% done. Could not finish all questions`)
        }
    },

    {
        name: "survival",
        onStart: () => { startClock(DEFAULT_TIME, DEFAULT_INTERVAL_MS) },
        gameComplete: modeSurvivalComplete,
        onMatchWrong: () => {
            const time = gameStatus.get().time
            if (time - 5 <= 0) startClock(0, DEFAULT_INTERVAL_MS)
            else startClock(time - 5, DEFAULT_INTERVAL_MS)
        },
        onComplete: () => {
            const time = gameStatus.get().time
            const questionCount = fullQuestionCount.get()
            stopClock()
            throwConfetti(DEFAULT_CONFETTI_TIME_MS)
            showMessage(`✅ Finished all ${questionCount} questions in ${time} seconds. Yay!`)
        },
        onEnd: () => {
            showMessage(`❌ ${percent.get()}% done. Could not finish all questions`)
        }

    }
]

export const selectedMode = atom(DEFAULT_MODE)
export const MODE = computed(selectedMode, (mode) => modes[checkIndex(mode, modes)])

