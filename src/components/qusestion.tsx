
import Answer from "./answer";
import { useQuiz } from "@src/contexts/quizContext";
import { useResultQuery, useSetResultMutation } from "@src/storage/hook";
import { ActionType } from "@src/types/context";

const Question = () => {
    const [quizState, dispatch] = useQuiz();
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const { mutate } = useSetResultMutation();
    const { data, error } = useResultQuery()

    if (error) {
        throw error
    }

    const handleOnSelectAnswer = (answerText: string) => {
        if (answerText === currentQuestion.correctAnswer) {
            const correctAnswers = [...data?.correctAnswers ?? [], quizState.currentQuestionIndex]
            const correctAnswersCount = data?.correctAnswersCount ?? 0;
            mutate({ correctAnswersCount: correctAnswersCount + 1, correctAnswers })
        }

        dispatch({ type: ActionType.SELECT_ANSWER, string_payload: answerText })
    }
    return (
        <div data-testid="question">
            <div className="bg-[#19719b] text-white p-2.5 min-h-[60px] flex items-center justify-center text-xl">
                {currentQuestion.question}</div>
            <div className="flex flex-wrap justify-between mt-[50px]">
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