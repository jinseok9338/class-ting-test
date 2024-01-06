type AnswerProps = {
    answerText: string;
    onSelectAnswer: (answerText: string) => void;
    index: number;
    currentAnswer: string;
    correctAnswer: string;
}

const Answer = ({ answerText, onSelectAnswer, index, currentAnswer, correctAnswer }: AnswerProps) => {
    const letterMapping = ["A", "B", "C", "D"];
    const isCorrectAnswer = currentAnswer && answerText === correctAnswer;
    const isWrongAnswer =
        currentAnswer === answerText && currentAnswer !== correctAnswer;
    const borderClass = isWrongAnswer ? 'border-2 border-red-500' : isCorrectAnswer ? 'border-2 border-green-500' : 'border-2 border-blue-500';
    const disabledClass = currentAnswer ? 'cursor-not-allowed' : 'cursor-pointer';
    const backgroundClass = isWrongAnswer ? 'bg-red-500' : isCorrectAnswer ? 'bg-green-500' : 'bg-blue-500';
    return (
        <div data-testid="answer" className={`w-48 bg-white min-h-[70px] mb-[30px] flex ${borderClass} ${disabledClass}`} onClick={() => onSelectAnswer(answerText)}>
            <div className={`text-[30px] ${backgroundClass} text-white w-[70px] flex items-center justify-center`}>
                {letterMapping[index]}</div>
            <div className="font-semibold flex items-center justify-center ml-[20px]">{answerText}</div>
        </div>
    );
};

export default Answer;