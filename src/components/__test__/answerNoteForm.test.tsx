import { vi, test, expect, describe } from "vitest"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import AnswerNoteForm from "../answerNoteForm"


const mockAnswerNotes = [
    {
        id: 1,
        question: 'question1',
        answer: 'answer1',
        note: 'note1'
    },
    {
        id: 2,
        question: 'question2',
        answer: 'answer2',
        note: 'note2'
    }
]

vi.mock("@src/types/answerNote", () => {
    return {
        AnswerNote: vi.fn(),
        FormDataType: vi.fn(),
    }
})

vi.mock("formik", () => {
    return {
        Formik: vi.fn().mockImplementation(({ children }) => children({
            handleSubmit: vi.fn().mockImplementation((e) => {
                e.preventDefault()
                mockAnswerNotes[0].note = 'newNote'
            }), handleChange: vi.fn()
        })),

    }
})

describe('AnswerNoteForm Component', () => {

    test('renders AnswerNoteForm component', async () => {
        const mockProps = {
            answerNotes: [{ id: 1, question: 'question1', answer: 'answer1', note: 'note1' }],
            handleSubmit: vi.fn().mockImplementation(() => {

            }),
            correctAnswers: [1]
        }

        render(<AnswerNoteForm {...mockProps} />)

        const renderElement = screen.getByTestId('AnswerNoteForm')
        expect(renderElement).not.equal(null)
    })

    test('should have the equal length of answerNotes', async () => {
        const mockProps = {
            answerNotes: [{ id: 0, question: 'question1', answer: 'answer1', note: 'note1' },
            { id: 1, question: 'question2', answer: 'answer2', note: 'note2' },
            { id: 2, question: 'question3', answer: 'answer3', note: 'note3' }
            ],
            handleSubmit: vi.fn(),
            correctAnswers: [1]
        }

        render(<AnswerNoteForm {...mockProps} />)
        const renderElements = screen.getAllByTestId('answerNote')
        expect(renderElements.length).equal(mockProps.answerNotes.length)
    })

    test('should update the note when the form is submitted', async () => {
        const mockProps = {
            answerNotes: [{ id: 1, question: 'question1', answer: 'answer1', note: 'note1' }],
            handleSubmit: vi.fn().mockImplementation((event) => {
                event.preventDefault();
                mockAnswerNotes[0].note = 'newNote'
            }),
            correctAnswers: [1]

        }
        render(<AnswerNoteForm {...mockProps} />)
        const formElement = screen.getByTestId('saveButton')
        fireEvent.click(formElement)
        await waitFor(() => {
            expect(mockAnswerNotes[0].note).toBe('newNote')
        })


    })
})
