import { useQuizQuery } from "@src/api/quiz";
import { Action, ActionType, State } from "@src/types/context";
import { normalizeQuestions, shuffleAnswers } from "@src/utils";
import { createContext, useContext, useReducer } from "react";


const initialState: State = {
    currentQuestionIndex: 0,
    questions: [],
    answers: [],
    currentAnswer: "",
    correctAnswersCount: 0,
    time: 0
};

export const reducer: React.Reducer<State, Action> = (state, action) => {

    switch (action.type) {
        case ActionType.SELECT_ANSWER: {
            const correctAnswersCount =
                action.string_payload ===
                    state.questions[state.currentQuestionIndex].correctAnswer
                    ? state.correctAnswersCount + 1
                    : state.correctAnswersCount;


            return {
                ...state,
                currentAnswer: action.string_payload ?? "",
                correctAnswersCount,
            }

        }
        case ActionType.NEXT_QUESTION: {
            const currentQuestionIndex =
                state.currentQuestionIndex + 1;
            const answers = shuffleAnswers(state.questions[currentQuestionIndex]);
            return {
                ...state,
                currentQuestionIndex,
                answers,
                currentAnswer: "",
            };
        }

        case ActionType.LOADED_QUESTIONS: {
            const questions = action.questions ? action.questions : []
            return {
                ...state,
                answers: shuffleAnswers(questions[0]),
                questions
            }
        }
        case ActionType.RESTART: {
            return {
                ...state,
                currentQuestionIndex: 0,
                currentAnswer: "",
                correctAnswersCount: 0,
                answers: shuffleAnswers(state.questions[0])
            };
        }
        case ActionType.START_TIMER: {
            return {
                ...state,
                time: 0,
            };
        }

        case ActionType.UPDATE_TIMER: {
            return {
                ...state,
                time: state.time + 1,
            };
        }

        default: {
            return state;
        }
    }
};
const initialValue: [State, React.Dispatch<Action>] = [
    initialState,
    () => { },
]
export const QuizContext = createContext(initialValue);

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
    const { data, error } = useQuizQuery();
    const normalizedQuestions = normalizeQuestions(data ?? [])
    const initialStateWithQuestion = { ...initialState, questions: normalizedQuestions ?? [], answers: shuffleAnswers(normalizedQuestions[0]), }
    const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialStateWithQuestion);
    if (error) {
        throw error
    }

    return <QuizContext.Provider value={[state, dispatch]}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => useContext(QuizContext);