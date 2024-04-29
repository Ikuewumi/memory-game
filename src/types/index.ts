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
  title: string
  image?: string
  description: string
  author: string
  course: string
  difficulty: "Easy" | "Medium" | "Hard"
  updatedAt: Date
}

export interface Data {
  text?: string
  image?: string
  questions: Question[]
}


export interface GameData extends Data {
}

export type Cuiz = GameData & Metadata

export interface GameStatus {
  time: number
  lives: number
  gameStarted: boolean
}

type ModeCallback<T=void> = () => T

export interface Mode {
  name: string
  description: string
  gameComplete: ModeCallback<ReadableAtom<boolean>>
  onSetup?: ModeCallback
  onEnd?: ModeCallback
  onStart?: ModeCallback
  onComplete?: ModeCallback
  onMatchRight?: ModeCallback
  onMatchWrong?: ModeCallback
}


export interface MetricsData {
  questionCount: number
  wrong: Question[]
  correctCount: number
  startingTime: number
  endingTime: number
  attemptsCount: number

}

export interface Metrics {
  numberOfQuestions: number
  numberOfAnsweredQuestions: number
  numberOfUnansweredQuestions: number
  numberOfWrongQuestions: number
  numberOfCorrectQuestions: number
  acuracy: number
  wrongQuestions: Question[]
  timeTaken: number
  numberOfAttempts: number
}
