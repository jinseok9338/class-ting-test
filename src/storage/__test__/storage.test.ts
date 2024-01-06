import { expect, test, describe } from 'vitest'
import { AnswerNoteStorage, ResultStorage } from '..'
import { resultSchema } from '@src/types/context'
import { answerNotesSchema } from '@src/types/answerNote'

describe('AnswerNoteStorage', () => {
    const answerNoteStorage = new AnswerNoteStorage(answerNotesSchema, 'answerNotes')

    test('set and get AnswerNotes', () => {
        const value = [
            { id: 1, question: 'Q1', answer: 'A1', note: 'N1' },
            { id: 2, question: 'Q2', answer: 'A2', note: 'N2' }
        ]
        answerNoteStorage.setAnswerNotes(value)

        const result = answerNoteStorage.getAnswerNotes()
        expect(result).toEqual({ _tag: 'Some', value })
    })

    test('clear AnswerNotes', () => {
        answerNoteStorage.clearAnswerNotes()
        const result = answerNoteStorage.getAnswerNotes()
        expect(result).toEqual({ _tag: 'None' })
    })

    test('get AnswerNotes when storage is empty', () => {
        const result = answerNoteStorage.getAnswerNotes()
        expect(result).toEqual({ _tag: 'None' })
    })
})

describe('ResultStorage', () => {
    const resultStorage = new ResultStorage(resultSchema, 'results')

    test('set and get Results', () => {
        const value = { correctAnswersCount: 2, correctAnswers: [1, 2], time: 100 }
        resultStorage.setResults(value)

        const result = resultStorage.getResults()
        expect(result).toEqual({ _tag: 'Some', value })
    })

    test('clear Results', () => {
        resultStorage.clearResults()
        const result = resultStorage.getResults()
        expect(result).toEqual({ _tag: 'None' })
    })

    test('get Results when storage is empty', () => {
        const result = resultStorage.getResults()
        expect(result).toEqual({ _tag: 'None' })
    })
})
