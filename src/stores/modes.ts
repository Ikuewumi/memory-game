import { checkIndex } from "@/composables/engine";
import type { Mode } from "@/types";
import { atom, computed } from "nanostores";
import { gameStatus, startClock } from "./game";

const DEFAULT_MODE = 0


const DEFAULT_LIVES = 3
const DEFAULT_TIME = 60
const DEFAULT_INTERVAL_MS = 1000


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

        }
    },

    {
        name: "survival",
        onStart: () => { startClock(DEFAULT_TIME, DEFAULT_INTERVAL_MS) },
        gameComplete: modeSurvivalComplete,
        onMatchWrong: () => {
            const time = gameStatus.get().time

            startClock(time - 1, DEFAULT_INTERVAL_MS)
        }
    }
]

export const selectedMode = atom(DEFAULT_MODE)
export const MODE = computed(selectedMode, (mode) => modes[checkIndex(mode, modes)])

