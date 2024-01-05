import { useQuiz } from "@src/contexts/quizContext";
import { useAnswerNotesQuery, useResultQuery, useSetAnswerNotesMutation, useSetResultMutation } from "@src/storage/hook";
import { ActionType } from "@src/types/context";
import { useNavigate } from "react-router-dom";
import AnswerNoteForm from "@src/components/answerNoteForm";
import { transformAnswerNotesWithQuestion, transformFormDataToAnswerNotes } from "@src/utils/transform";
import { FormDataSchema, FormDataType } from "@src/types/answerNote";
import Chart from "@src/components/chart";



const ResultPage = () => {
    const [quizState, dispatch] = useQuiz();
    const navigate = useNavigate();
    const { data, error } = useAnswerNotesQuery()
    const { data: resultData, error: resultError } = useResultQuery()
    const { questions } = quizState
    const { mutate } = useSetAnswerNotesMutation();
    const { mutate: resultMutate } = useSetResultMutation()




    if (error || resultError) {
        throw error || resultError
    }

    const answerNotes = transformAnswerNotesWithQuestion(data ?? [], questions);
    const handleRestart = () => {
        dispatch({ type: ActionType.RESTART })
        resultMutate({ correctAnswersCount: 0, correctAnswers: [] })
        navigate("/")
    }

    const handleSubmit = (value: FormDataType) => {
        try {
            let validatedValue = FormDataSchema.safeParse(value)
            if (!validatedValue.success) {
                throw new Error("Form data is not valid")
            }
            const newAnswerNotes = transformFormDataToAnswerNotes(validatedValue.data, answerNotes)
            mutate(newAnswerNotes)
            alert("AnswerForm has been Updated")
        } catch (e) {
            console.error(e)
        }

    }


    return (
        <div className="w-[975px] mx-auto mt-[120px] flex flex-col justify-center items-center">
            <div className="bg-white h-[400px] text-center mb-[30px] w-full">
                <div className="bg-blue-500 p-20 text-3xl text-white">Congratulations</div>
                <div className="text-[18px]">
                    <div> You've finished quiz! </div>
                    <div className="mb-2"> Right Answers {resultData?.correctAnswersCount ?? 0} of {quizState.questions.length}!</div>
                    <div className="mb-2"> Wrong Answers {quizState.questions.length - (resultData?.correctAnswersCount ?? 0)} of {quizState.questions.length}!</div>
                    <div className="mb-2"> Your time is {resultData?.time} seconds!</div>
                    <button className="mx-auto text-white bg-blue-900 w-[300px] text-[18px] font-semibold  uppercase cursor-pointer text-center hover:bg-green-600"
                        onClick={handleRestart}>Restart</button>
                </div>
            </div>
            <Chart correctAnswersCount={resultData?.correctAnswersCount ?? 0} questionsCount={quizState.questions.length} />
            <AnswerNoteForm answerNotes={answerNotes} handleSubmit={handleSubmit} correctAnswers={resultData?.correctAnswers ?? []} />
        </div>
    )
}

export default ResultPage