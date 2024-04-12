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
  image?: string
  questions: Question[]
}


