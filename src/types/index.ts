import type { ReadableAtom } from "nanostores"

export type FocusState = "idle" | "focus" | "success" | "failure"

export type ImageFile = Record<string, string>


export interface FocusData {
  state: FocusState
  cards: number[]
}

export interface Question {
  question: string
  answer: string
  text?: string
  image?: string
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
  difficulty: "easy" | "medium" | "hard"
  type?: "dcq" | "multiple"
}

export interface Data {
  text?: string
  image?: string
  questions: Question[]
}





export interface GameData extends Data {
}

export type Cuiz = GameData & Metadata


export interface CuizMetadataProps extends Metadata {
  date: string
  courseLink: string
  authorImage: string,
  image: string
  questionCount: number
}


export interface CourseCardProps {
  title: string
  description: string
  icon: string
  iconSize: number,
  courseLink: string
}


export interface QuizCardProps extends Omit<Metadata, "author"> {
  questionCount:  number
  courseLink: string
  quizlink: string
}


export interface SeriesCardProps { 
  title: string
  description: string
  quizCount: number
  seriesLink: string
  course: string
  courseLink: string
}


export interface SeriesSectionProps {
  title: string
  seriesLink: string
  previousTitle: string
  previousLink: string
  nextTitle: string
  nextLink: string,
  currentIndex: number
  seriesCount: number
}


export interface GameStatus {
  time: number
  lives: number
  multipleImages: boolean
  type: "dcq" | "multiple"
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
  percentAnswered: number
}
