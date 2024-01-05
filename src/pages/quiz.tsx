import Question from "@src/components/qusestion";
import { useQuiz } from "@src/contexts/quizContext";
import { useSetResultMutation } from "@src/storage/hook";
import { ActionType } from "@src/types/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
    const [quizState, dispatch] = useQuiz();
    const navigate = useNavigate();
    const buttonText = quizState.currentQuestionIndex + 1 === quizState.questions.length ? "Finish the quiz" : "Next";
    const { mutate } = useSetResultMutation()

    const handleNext = () => {
        if (quizState.currentQuestionIndex + 1 === quizState.questions.length) {
            mutate({ time: quizState.time })
            navigate("/result")
            return
        }
        dispatch({ type: ActionType.NEXT_QUESTION })
    }

    useEffect(() => {
        mutate({ correctAnswersCount: 0, correctAnswers: [] })
    }, [])

    useEffect(() => {
        const timerInterval = setInterval(() => {
            dispatch({ type: ActionType.UPDATE_TIMER });
        }, 1000); // Update timer every second

        return () => clearInterval(timerInterval); // Cleanup on component unmount

    }, [dispatch]);

    return (
        <div className="w-[975px] mx-auto mt-[100px]">
            {quizState.questions.length > 0 && (
                <div>
                    <div className="timer bg-white text-black text-[18px] w-[200px] mx-auto font-semibold h-[40px] mb-[30px] flex items-center justify-center">
                        Time: {quizState.time} seconds
                    </div>
                    <div className="score bg-white text-black text-[18px] w-[200px] mx-auto font-semibold h-[40px] mb-[30px] flex items-center justify-center">
                        Question {quizState.currentQuestionIndex + 1}/
                        {quizState.questions.length}
                    </div>
                    <Question />
                    <button
                        className="px-5 py-3 w-[300px] mt-0 m-auto text-white bg-gray-900 text-lg font-semibold uppercase cursor-pointer text-center disabled:bg-gray-400 hover:bg-green-600 disabled:cursor-not-allowed"
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