import { useEffect } from "react";
import Question from "@src/components/qusestion";
import { useQuiz } from "@src/contexts/quizContext";
import { ActionType } from "@src/types/context";
import { useQuizQuery } from "@src/api/quiz";
import { normalizeQuestions } from "@src/utils";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
    const [quizState, dispatch] = useQuiz();
    const { data, error } = useQuizQuery();
    const navigate = useNavigate();

    if (error) {
        throw error
    }

    const buttonText = quizState.currentQuestionIndex + 1 === quizState.questions.length ? "Finish the quiz" : "Next";
    useEffect(() => {

        if (data) {
            const normalizedQuestions = normalizeQuestions(data);
            dispatch({ type: ActionType.LOADED_QUESTIONS, string_payload: undefined, questions: normalizedQuestions })
        }
    }, [data])

    const handleNext = () => {
        if (quizState.currentQuestionIndex + 1 === quizState.questions.length) {
            navigate("/result")
        }
        dispatch({ type: ActionType.NEXT_QUESTION })
    }

    return (
        <div className="quiz">
            {/* {quizState.showResults === true && (
                <div className="results">
                    <div className="congratulations">Congratulations</div>
                    <div className="results-info">
                        <div> You've finished quiz! </div>
                        <div> Your score is {quizState.correctAnswersCount} of {quizState.questions.length}!</div>
                        <div className="next-button"
                            onClick={() => dispatch({ type: ActionType.RESTART })}>Restart</div>
                    </div>
                </div>

            )} */}
            {quizState.questions.length > 0 && (
                <div>
                    <div className="score">
                        Question {quizState.currentQuestionIndex + 1}/
                        {quizState.questions.length}
                    </div>
                    <Question />
                    <button
                        className="next-button"
                        disabled={!quizState.currentAnswer}
                        onClick={handleNext}
                    >
                        {buttonText}
                    </button>
                </div>)}

        </div>
    );
};

export default QuizPage;