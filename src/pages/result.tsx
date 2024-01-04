import { useQuiz } from "@src/contexts/quizContext";
import { ActionType } from "@src/types/context";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
    const [quizState, dispatch] = useQuiz();
    const navigate = useNavigate();

    const handleRestart = () => {
        dispatch({ type: ActionType.RESTART })
        navigate("/")
    }

    return (
        <div className="quiz">
            {quizState.showResults && (
                <div className="results">
                    <div className="congratulations">Congratulations</div>
                    <div className="results-info">
                        <div> You've finished quiz! </div>
                        <div> Your score is {quizState.correctAnswersCount} of {quizState.questions.length}!</div>
                        <div className="next-button"
                            onClick={handleRestart}>Restart</div>
                    </div>
                </div>

            )}


        </div>
    )
}

export default ResultPage