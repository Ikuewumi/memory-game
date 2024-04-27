import { checkIndex, throwConfetti } from "@/composables/engine";
import type { Mode } from "@/types";
import { atom, computed } from "nanostores";
import { fullQuestionCount, gameStatus, percent, startClock, stopClock } from "./game";
import { showMessage } from "./toast";

const DEFAULT_MODE = 0

export const BLITZ_SECONDS = [60, 120, 180]

const DEFAULT_LIVES = 4
const DEFAULT_INTERVAL_MS = 1000

const DEFAULT_CONFETTI_TIME_MS = 5000
export const blitzSecondsIndex = atom(0)

// Using a Function to Wrap the Computed vale
const modeClassicComplete = () => computed(gameStatus, gameStatus => gameStatus.lives > 0)
const modeSurvivalComplete = () => computed(gameStatus, gameStatus => gameStatus.time > 0)
const modePracticeComplete = () => computed(gameStatus, _ => true)


export const modes: Mode[] = [
    {
        name: "pratice",
        description: "Take your time to answer each question at your own pace, perfecting your understanding of the material without any time pressure. Ideal for learning new concepts.",
        gameComplete: modePracticeComplete,
        onComplete: () => {
            const questionCount = fullQuestionCount.get()
            throwConfetti(DEFAULT_CONFETTI_TIME_MS)
            showMessage(`✅ Finished all ${questionCount} questions. Yay!`)
        },
    },


    {
        name: "challenge",
        description: "With a limited supply of lives, each decision carries weight. Navigate through the trials and tribulations, knowing that every life lost brings you one step closer to defeat.",
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
        name: "blitz",
        description: "Race against the clock to answer as many questions as possible within a limited time frame, providing an exhilarating challenge for those who thrive under pressure.",
        onStart: () => { startClock(BLITZ_SECONDS[blitzSecondsIndex.get()], DEFAULT_INTERVAL_MS) },
        gameComplete: modeSurvivalComplete,
        onMatchWrong: () => {
            const time = gameStatus.get().time
            if (time - 5 <= 0) startClock(0, DEFAULT_INTERVAL_MS)
            else startClock(time - 5, DEFAULT_INTERVAL_MS)
        },
        onComplete: () => {
            const time = gameStatus.get().time
            const quizDuration = BLITZ_SECONDS[blitzSecondsIndex.get()] - time
            const questionCount = fullQuestionCount.get()
            stopClock()
            throwConfetti(DEFAULT_CONFETTI_TIME_MS)
            showMessage(`✅ Finished all ${questionCount} questions in ${quizDuration} seconds. Yay!`)
        },
        onEnd: () => {

            showMessage(`❌ ${percent.get()}% done. Could not finish all questions`)
        }

    }
]

export const selectedMode = atom(DEFAULT_MODE)
export const MODE = computed(selectedMode, (mode) => modes[checkIndex(mode, modes)])

