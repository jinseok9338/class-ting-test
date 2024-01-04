import { Action, ActionType, State } from "@src/types/context";
import { shuffleAnswers } from "@src/utils";
import { createContext, useContext, useReducer } from "react";


const initialState: State = {
    currentQuestionIndex: 0,
    questions: [],
    showResults: false,
    answers: [],
    currentAnswer: "",
    correctAnswersCount: 0,
};

const reducer: React.Reducer<State, Action> = (state, action) => {
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
            };
        }
        case ActionType.NEXT_QUESTION: {
            const showResults =
                state.currentQuestionIndex === state.questions.length - 1;
            const currentQuestionIndex = showResults
                ? state.currentQuestionIndex
                : state.currentQuestionIndex + 1;
            const answers = showResults
                ? []
                : shuffleAnswers(state.questions[currentQuestionIndex]);
            return {
                ...state,
                currentQuestionIndex,
                showResults,
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
            return initialState;
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
    const value = useReducer<React.Reducer<State, Action>>(reducer, initialState);
    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => useContext(QuizContext);