import { NormalizedQuestion as NormalizedQuestion } from "./quiz"

export type State = {
    questions: NormalizedQuestion[]
    currentQuestionIndex: number
    showResults: boolean
    answers: string[]
    currentAnswer: string
    correctAnswersCount: number
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
}

