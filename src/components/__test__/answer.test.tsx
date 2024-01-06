import { test, expect, describe, vi, } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import Answer from '../answer'


describe('Answer', () => {
    const onSelectAnswer = vi.fn()


    test('renders answer text', async () => {
        render(
            <Answer
                answerText="A1"
                onSelectAnswer={onSelectAnswer}
                index={0}
                currentAnswer=""
                correctAnswer="A1"
            />
        )
        const answerElement = screen.getByTestId('answer')
        expect(answerElement).not.equal(null)
    })

    test('calls onSelectAnswer when clicked', async () => {
        render(
            <Answer
                answerText="A1"
                onSelectAnswer={onSelectAnswer}
                index={0}
                currentAnswer=""
                correctAnswer="A1"
            />
        )
        const answerElement = screen.getByTestId('answer')
        fireEvent.click(answerElement)
        expect(onSelectAnswer).toHaveBeenCalledWith('A1')
    })

    test('renders correct border when answer is correct', async () => {
        render(
            <Answer
                answerText="A1"
                onSelectAnswer={onSelectAnswer}
                index={0}
                currentAnswer="A1"
                correctAnswer="A1"
            />
        )
        const answerElement = screen.getByTestId('answer')
        expect(answerElement.className).toMatch('border-2 border-green-500')
    })

    test('renders correct border when answer is wrong', async () => {
        render(
            <Answer
                answerText="A1"
                onSelectAnswer={onSelectAnswer}
                index={0}
                currentAnswer="A1"
                correctAnswer="B1"
            />
        )
        const answerElement = screen.getByTestId('answer')
        expect(answerElement.className).toMatch('border-2 border-red-500')
    })

    test('renders correct border when answer is not selected', async () => {
        render(
            <Answer
                answerText="A1"
                onSelectAnswer={onSelectAnswer}
                index={0}
                currentAnswer=""
                correctAnswer="A1"
            />
        )
        const answerElement = screen.getByTestId('answer')
        expect(answerElement.className).toMatch('border-2 border-blue-500')
    })

})
