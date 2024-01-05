import { z } from "zod"
import { NormalizedQuestion as NormalizedQuestion } from "./quiz"

export type State = {
    questions: NormalizedQuestion[]
    currentQuestionIndex: number
    answers: string[]
    currentAnswer: string
    correctAnswersCount: number
    time: number
}

export type Action = {
    type: ActionType
    string_payload?: string
    questions?: NormalizedQuestion[]
}

export enum ActionType {
    LOADED_QUESTIONS = "LOADED_QUESTIONS",
    SELECT_ANSWER = "SELECT_ANSWER",
    NEXT_QUESTION = "NEXT_QUESTION",
    RESTART = "RESTART",
    CLEAR_RESULT = "CLEAR_RESULT",
    START_TIMER = "START_TIMER",
    UPDATE_TIMER = "UPDATE_TIMER",
}


export type Result = {
    correctAnswersCount: number,
    correctAnswers: number[],
    time: number
}

export const resultSchema = z.object({
    correctAnswersCount: z.number(),
    correctAnswers: z.array(z.number()),
    time: z.number()
})

export type ResultInputType = {
    correctAnswersCount?: number,
    correctAnswers?: number[],
    time?: number
}