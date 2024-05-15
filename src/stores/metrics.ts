import type { Metrics, MetricsData, Question } from "@/types"
import { map } from "nanostores"
import { fullQuestionCount } from "./game"
import { DEFAULT_MODAL_STATES, modals } from "./modals"

const DEFAULT_METRICS: MetricsData = {
    questionCount: 0,
    startingTime: 0,
    endingTime: 0,
    correctCount: 0,
    wrong: [],
    attemptsCount: 0
}
export const DEFAULT_USER_METRICS: Metrics = {
    "acuracy": 0,
    "timeTaken": 0,
    "wrongQuestions": [],
    "numberOfAttempts": 0,
    "numberOfQuestions": 0,
    "numberOfWrongQuestions": 0,
    "numberOfCorrectQuestions": 0,
    "numberOfAnsweredQuestions": 0,
    "numberOfUnansweredQuestions": 0,
    "percentAnswered": 0
}

export const metricsData = map({ ...DEFAULT_METRICS })


const onStart = () => {
    metricsData.set({
        ...DEFAULT_METRICS,
        startingTime: Date.now(),
        questionCount: fullQuestionCount.get()
    })
}

const onAttempt = () => {
    const attempts = metricsData.get().attemptsCount
    metricsData.setKey("attemptsCount", attempts + 1);
}

const onCorrect = () => {
    const correctCount = metricsData.get().correctCount
    metricsData.setKey("correctCount", correctCount + 1);
}


const onWrong = (question: Question) => {
    const metricsDataWrong = metricsData.get().wrong
    const wrongQuestionIndex = metricsDataWrong.findIndex(question_ => question_.question === question.question && question_.answer === question.answer)
    if (wrongQuestionIndex > -1) return
    const wrongQuestions = [...metricsData.get().wrong, question]
    metricsData.setKey("wrong", wrongQuestions)
}

const onEnd = () => {
    metricsData.setKey("endingTime", Date.now())
    modals.set({
        ...DEFAULT_MODAL_STATES,
        "metrics": true,
    })
}

const reset = () => {
    metricsData.set({ ...DEFAULT_METRICS })
}

const getUserMetrics = (data: MetricsData): Metrics => {
    return {
        "numberOfQuestions": data.questionCount,
        "timeTaken": Math.floor((data.endingTime - data.startingTime) / 1000),
        "wrongQuestions": data.wrong,
        "acuracy": Math.floor((data.correctCount / data.attemptsCount) * 100),
        "numberOfWrongQuestions": data.wrong.length,
        "numberOfAttempts": data.attemptsCount,
        "numberOfAnsweredQuestions": data.correctCount + data.wrong.length,
        "numberOfUnansweredQuestions": data.questionCount - (data.correctCount + data.wrong.length),
        "numberOfCorrectQuestions": data.correctCount,
        "percentAnswered": Math.floor((data.correctCount / data.questionCount) * 100)
    }


}



export const metrics = {
    onStart,
    onCorrect,
    onWrong,
    onEnd,
    onAttempt,
    reset,
    getUserMetrics
    
}
