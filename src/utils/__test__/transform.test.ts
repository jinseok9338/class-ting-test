import { test, describe, assert, expect } from 'vitest';
import { transformAnswerNotesWithQuestion } from '../transform';
import { AnswerNote } from '@src/types/answerNote';
import { Category, Difficulty, NormalizedQuestion, Question, Type } from '@src/types/quiz';
import { normalizeQuestions } from '..';

describe('transformAnswerNotesWithQuestion', () => {
    test('Happy Path', () => {
        const answerNotes = [
            { id: 0, question: 'Q1', answer: 'A1', note: 'N1' },
            { id: 1, question: 'Q2', answer: 'A2', note: 'N2' }
        ];

        const questions = [
            { correctAnswer: 'A1', question: 'Q1', incorrectAnswers: ['IA1', 'IA2'] },
            { correctAnswer: 'A2', question: 'Q2', incorrectAnswers: ['IA3', 'IA4'] },
            { correctAnswer: 'A3', question: 'Q3', incorrectAnswers: ['IA5', 'IA6'] }
        ];

        const expected = [
            { id: 0, question: 'Q1', answer: 'A1', note: 'N1' },
            { id: 1, question: 'Q2', answer: 'A2', note: 'N2' },
            { id: 2, question: 'Q3', answer: 'A3', note: '' }
        ];

        const result = transformAnswerNotesWithQuestion(answerNotes, questions);
        assert.deepEqual(result, expected);
    });

    test('Empty Answer Notes', () => {
        const answerNotes: AnswerNote[] = [];
        const questions = [
            { correctAnswer: 'A1', question: 'Q1', incorrectAnswers: ['IA1', 'IA2'] },
            { correctAnswer: 'A2', question: 'Q2', incorrectAnswers: ['IA3', 'IA4'] }
        ];

        const expected = [
            { id: 0, question: 'Q1', answer: 'A1', note: '' },
            { id: 1, question: 'Q2', answer: 'A2', note: '' }
        ];

        const result = transformAnswerNotesWithQuestion(answerNotes, questions);
        assert.deepEqual(result, expected);
    });

    test('Empty Questions', () => {
        const answerNotes = [
            { id: 0, question: 'Q1', answer: 'A1', note: 'N1' },
            { id: 1, question: 'Q2', answer: 'A2', note: 'N2' }
        ];
        const questions: any = [];
        const result = transformAnswerNotesWithQuestion(answerNotes, questions);
        assert.equal(result.length, 0);
    });

    test('Mismatched Length', () => {
        const answerNotes = [
            { id: 0, question: 'Q1', answer: 'A1', note: 'N1' },
            { id: 1, question: 'Q2', answer: 'A2', note: 'N2' }
        ];

        const questions = [
            { correctAnswer: 'A1', question: 'Q1', incorrectAnswers: ['IA1', 'IA2'] }
        ];

        const result = transformAnswerNotesWithQuestion(answerNotes, questions);
        assert.equal(result.length, 1);
    });
});


describe('transformFormDataToAnswerNotes', () => {
    test('should correctly normalize a single question with all fields present', () => {
        const backendQuestions: Question[] = [
            {
                type: Type.Multiple,
                difficulty: Difficulty.Medium,
                category: Category.Science3A20Computers,
                question: 'What is the capital of France?',
                correct_answer: 'Paris',
                incorrect_answers: ['London', 'Berlin', 'Madrid'],
            },
        ];

        const expectedNormalizedQuestions: NormalizedQuestion[] = [
            {
                correctAnswer: 'Paris',
                question: 'What is the capital of France?',
                incorrectAnswers: ['London', 'Berlin', 'Madrid'],
            },
        ];

        const normalizedQuestions = normalizeQuestions(backendQuestions);
        assert.deepEqual(normalizedQuestions, expectedNormalizedQuestions);
    });
    test('should throw error with missing incorrect answers', () => {
        const backendQuestions: Question[] = [
            {
                type: Type.Multiple,
                difficulty: Difficulty.Medium,
                category: Category.Science3A20Computers,
                question: 'What is the capital of France?',
                correct_answer: 'Paris',
                incorrect_answers: [],
            },
        ];



        expect(() => {
            normalizeQuestions(backendQuestions);
        }).toThrow(Error);

    });

    test('should correctly normalize multiple questions', () => {
        const backendQuestions: Question[] = [
            {
                type: Type.Multiple,
                difficulty: Difficulty.Medium,
                category: Category.Science3A20Computers,
                question: 'What is the capital of France?',
                correct_answer: 'Paris',
                incorrect_answers: ['London', 'Berlin', 'Madrid'],
            },
            {
                type: Type.Multiple,
                difficulty: Difficulty.Medium,
                category: Category.Science3A20Computers,
                question: 'What is the capital of Germany?',
                correct_answer: 'Berlin',
                incorrect_answers: ['London', 'Paris', 'Madrid'],
            },
        ];

        const expectedNormalizedQuestions: NormalizedQuestion[] = [
            {
                correctAnswer: 'Paris',
                question: 'What is the capital of France?',
                incorrectAnswers: ['London', 'Berlin', 'Madrid'],
            },
            {
                correctAnswer: 'Berlin',
                question: 'What is the capital of Germany?',
                incorrectAnswers: ['London', 'Paris', 'Madrid'],
            },
        ];

        const normalizedQuestions = normalizeQuestions(backendQuestions);
        assert.deepEqual(normalizedQuestions, expectedNormalizedQuestions);
    });
})