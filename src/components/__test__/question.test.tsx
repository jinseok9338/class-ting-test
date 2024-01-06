import { vi, test, expect, describe, beforeEach } from "vitest"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { MockQuizProvider, initialValueForMock } from "@src/mock/quizMockContext"
import Question from "../qusestion"

vi.mock("@src/contexts/quizContext", () => {
    return {
        useQuiz: vi.fn().mockImplementation(() => initialValueForMock),
        reducer: vi.fn().mockImplementation(() => initialValueForMock),
    }
})

let mockResult = { correctAnswersCount: 0, correctAnswers: [] }
vi.mock("@src/storage/hook", () => {
    return {
        useResultQuery: vi.fn().mockImplementation(() => { return { data: mockResult } }),
        useSetResultMutation: vi.fn().mockImplementation(() => {
            return {
                mutate: vi.fn().mockImplementation(() => {
                    mockResult.correctAnswersCount = mockResult.correctAnswersCount + 1
                })
            }
        }),
    }
})

describe('Question Component', () => {
    let queryClient

    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        })

        render(
            <QueryClientProvider client={queryClient}>
                <MockQuizProvider>
                    <Question />
                </MockQuizProvider>
            </QueryClientProvider>
        )
    })

    test('renders question element', async () => {
        await waitFor(() => {
            const renderElement = screen.getByTestId('question')
            expect(renderElement).not.equal(null)
        })
    })

    test('renders question text', async () => {
        await waitFor(() => {
            const questionText = screen.getByText(initialValueForMock[0].questions[initialValueForMock[0].currentQuestionIndex].question)
            expect(questionText).not.equal(null)
        })
    })

    test('renders all answer options', async () => {
        await waitFor(() => {
            initialValueForMock[0].answers.forEach(answer => {
                const answerOption = screen.getByText(answer)
                expect(answerOption).not.equal(null)
            })
        })
    })
    test('handleOnSelectAnswer is called when an answer is clicked', async () => {
        await waitFor(() => {
            const initialCount = mockResult.correctAnswersCount
            const answerOption = screen.getByText('Windows XP')
            fireEvent.click(answerOption)
            expect(mockResult.correctAnswersCount).toBe(initialCount + 1)
        })
    })
})
