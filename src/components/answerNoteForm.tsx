import { AnswerNote, FormDataType } from "@src/types/answerNote";
import { Formik } from "formik";

type AnswerNotesFormData = {
    answerNotes: AnswerNote[]
    handleSubmit: (values: FormDataType) => void
    correctAnswers: number[]
}

const AnswerNoteForm = ({ answerNotes, handleSubmit, correctAnswers }: AnswerNotesFormData) => {
    const defaultValue = answerNotes.reduce((acc, answerNote, index) => {
        return {
            ...acc,
            [index.toString()]: answerNote.note
        }
    }, {})
    return (
        <>
            <Formik
                initialValues={defaultValue}
                onSubmit={(values) => {
                    const newValues = { ...defaultValue, ...values }
                    handleSubmit(newValues)
                }}>
                {({
                    handleSubmit,
                    handleChange
                }) => (
                    <form data-testid="AnswerNoteForm" className="bg-white shadow-md rounded px-8 mb-4" onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold mb-4 mb-2">Answer Note</h1>
                        {answerNotes?.map((answerNote) => (
                            <div data-testid="answerNote" className="mb-4" key={"note-" + answerNote.id.toString()}>
                                {/* if index is in correctAnswers, show green if not show red  */}
                                <label className={`answerNoteblock text-gray-700 text-sm font-bold mb-2 ${correctAnswers.includes(answerNote.id) ? "text-green-500" : "text-red-500"}`}>
                                    Q: {answerNote.question} - A: {answerNote.answer}
                                </label>
                                <textarea name={answerNote.id.toString()} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} defaultValue={answerNote.note} />
                            </div>
                        ))}
                        <div className="flex items-center justify-between">
                            <button data-testid="saveButton" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
                                Save Notes
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default AnswerNoteForm