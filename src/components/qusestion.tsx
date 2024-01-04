
import Answer from "./answer";
import { useQuiz } from "@src/contexts/quizContext";
import { ActionType } from "@src/types/context";

const Question = () => {
    const [quizState, dispatch] = useQuiz();
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

    const handleOnSelectAnswer = (answerText: string) => {
        dispatch({ type: ActionType.SELECT_ANSWER, string_payload: answerText })
    }

    return (
        <div>
            <div className="question">{currentQuestion.question}</div>
            <div className="answers">
                {quizState.answers.map((answer, index) => (
                    <Answer answerText={answer}
                        index={index}
                        key={index}
                        correctAnswer={currentQuestion.correctAnswer}
                        currentAnswer={quizState.currentAnswer}
                        onSelectAnswer={handleOnSelectAnswer} />
                ))}
            </div>
        </div>
    );
};

export default Question;