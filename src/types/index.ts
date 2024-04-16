import type { ReadableAtom } from "nanostores"

export type FocusState = "idle" | "focus" | "success" | "failure"

export interface FocusData {
  state: FocusState
  cards: number[]
}

export interface Question {
  question: string
  answer: string
}

export interface CardData {
  text: string
  index: number
}

export interface Metadata {
  author: string
  title: string
  date: Date
}

export interface Data {
  text?: string
  image?: string
  questions: Question[]
}


export interface GameData extends Data {
}

export interface GameStatus {
  time: number
  lives: number
  gameStarted: boolean // @TODO - boolean returning computed here
}

type ModeCallback<T=void> = () => T

export interface Mode {
  name: string
  gameComplete: ModeCallback<ReadableAtom<boolean>>
  onSetup?: ModeCallback
  onEnd?: ModeCallback
  onStart?: ModeCallback
  onComplete?: ModeCallback
  onMatchRight?: ModeCallback
  onMatchWrong?: ModeCallback
}
